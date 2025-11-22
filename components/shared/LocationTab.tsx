import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Location from "expo-location";
import {
  AppleMaps,
  GoogleMaps,
  type CameraPosition,
  type Coordinates,
} from "expo-maps";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Modal,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

// ---------- Types ----------
interface PlacePrediction {
  description: string;
  place_id: string;
}

interface PlaceDetailsResponse {
  result?: {
    formatted_address?: string;
    geometry?: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
  status: string;
  error_message?: string;
}

interface ProfileLocationPickerProps {
  /** initial address shown in input */
  initialAddress?: string;
  /** initial coordinates for marker/map */
  initialCoords?: Coordinates | null;
  /** called whenever address/coords change */
  onChange?: (payload: { address: string; coordinates: Coordinates | null }) => void;
}

// ---------- CONFIG ----------
const GOOGLE_KEY = Constants.expoConfig!.extra!.googleMapsApiKey;

// Dhaka fallback as in your code
const DEFAULT_CAMERA: CameraPosition = {
  coordinates: {
    latitude: 23.8103,
    longitude: 90.4125,
  },
  zoom: 12,
};

const LocationTab: React.FC<ProfileLocationPickerProps> = ({
  initialAddress = "",
  initialCoords = null,
  onChange,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { t } = useTranslation();

  const [cameraPosition, setCameraPosition] =
    useState<CameraPosition>(DEFAULT_CAMERA);
  const [marker, setMarker] = useState<Coordinates | null>(initialCoords);
  const [address, setAddress] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);

  const mountedRef = useRef(true);

  const showToast = (msg: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(t('location'), msg);
    }
  };

  // Keep parent in sync
  useEffect(() => {
    if (onChange) {
      onChange({
        address,
        coordinates: marker,
      });
    }
  }, [address, marker, onChange]);

  // Initialize map from initialCoords if provided
  useEffect(() => {
    if (initialCoords) {
      setMarker(initialCoords);
      setCameraPosition({
        coordinates: initialCoords,
        zoom: 15,
      });
    }
  }, [initialCoords]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ---------- Reverse Geocode ----------
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "OK" && data.results?.length > 0) {
        return data.results[0].formatted_address as string;
      }

      console.log("Geocode error:", data.status, data.error_message);
      return "";
    } catch (error) {
      console.log("Geocode fetch error:", error);
      return "";
    }
  }, []);

  // ---------- Map Tap → Pin + Address ----------
  const handleMapClick = async (coords: Coordinates) => {
    if (!coords.latitude || !coords.longitude) return;

    const safeCoords: Coordinates = {
      latitude: Number(coords.latitude),
      longitude: Number(coords.longitude),
    };

    setMarker(safeCoords);
    setCameraPosition({
      coordinates: safeCoords,
      zoom: 15,
      // heading: 0,
      // pitch: 0,
    });

    const addr = await reverseGeocode(
      safeCoords.latitude ?? 0,
      safeCoords.longitude ?? 0
    );
    if (addr) setAddress(addr);
  };

  // ---------- Manual Search (Autocomplete) ----------
  const handleAddressSearch = async (text: string) => {
    setAddress(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const url =
        `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
        `?input=${encodeURIComponent(text)}` +
        `&key=${GOOGLE_KEY}`;
      // + `&components=country:bd`  // if you ever want to restrict

      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "OK" && Array.isArray(data.predictions)) {
        setSuggestions(data.predictions);
      } else {
        console.log(
          "Places autocomplete error:",
          data.status,
          data.error_message
        );
        setSuggestions([]);
      }
    } catch (error) {
      console.log("Places autocomplete fetch error:", error);
      setSuggestions([]);
    }
  };

  // ---------- Selecting Suggestion ----------
  const handleSuggestionPress = async (item: PlacePrediction) => {
    try {
      const url =
        `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${item.place_id}` +
        `&key=${GOOGLE_KEY}`;

      const res = await fetch(url);
      const data = (await res.json()) as PlaceDetailsResponse;

      const loc = data.result?.geometry?.location;
      const formatted = data.result?.formatted_address;

      if (!loc) {
        console.log("No geometry for place details");
        return;
      }

      const coords: Coordinates = {
        latitude: Number(loc.lat),
        longitude: Number(loc.lng),
      };

      setMarker(coords);
      setCameraPosition({
        coordinates: coords,
        zoom: 15,
        // heading: 0,
        // pitch: 0,
      });
      setAddress(formatted ?? item.description);
      setSuggestions([]);

      setIsSearching(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log("Place details fetch error:", error);
    }
  };

  // ---------- Auto Locate ("Set New Location") ----------
  const handleAutoLocate = async () => {
    try {
      setAutoLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showToast(t('location_permission_denied'));
        setAutoLoading(false);
        return;
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        showToast(t('enable_location_services'));
        setAutoLoading(false);
        return;
      }

      let pos = await Location.getLastKnownPositionAsync();
      if (!pos) {
        pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      }

      if (!pos) {
        showToast(t('unable_get_location'));
        setAutoLoading(false);
        return;
      }

      const coords: Coordinates = {
        latitude: Number(pos.coords.latitude),
        longitude: Number(pos.coords.longitude),
      };

      setMarker(coords);
      setCameraPosition({
        coordinates: coords,
        zoom: 15,
        // heading: 0,
        // pitch: 0,
      });

      const addr = await reverseGeocode(coords.latitude ?? 0, coords.longitude ?? 0);
      if (addr) setAddress(addr);
    } catch (error) {
      console.log("Auto location error:", error);
    } finally {
      if (mountedRef.current) setAutoLoading(false);
    }
  };

  const markers = marker
    ? [{ id: "selected-location", coordinates: marker }]
    : [];

  // ---------- RENDER ----------
  return (
    <View className="">
      {/* Address input (fake search box) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsSearching(true)}
        className="w-full border rounded-xl px-3 py-3 flex-row items-center 
          border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark mb-4"
      >
        <Ionicons
          name="search-outline"
          size={18}
          color="#9CA3AF"
          style={{ marginRight: 8 }}
        />
        <Text
          className={`flex-1 text-small ${address
              ? "text-text dark:text-textDark"
              : "text-secondary dark:text-secondaryDark"
            }`}
          numberOfLines={1}
        >
          {address || t('search_enter_address')}
        </Text>
      </TouchableOpacity>

      {/* Map preview */}
      <View className="w-full h-72 rounded-2xl overflow-hidden mb-4 bg-gray-200">
        {Platform.OS === "ios" ? (
          <AppleMaps.View
            style={{ width: "100%", height: "100%" }}
            cameraPosition={cameraPosition}
            markers={markers}
            properties={{
              isMyLocationEnabled: true,
              selectionEnabled: true,
            }}
            onMapClick={(event: any) => {
              if (!event?.coordinate) return;

              handleMapClick({
                latitude: Number(event.coordinate.latitude),
                longitude: Number(event.coordinate.longitude)
              });
            }}

          />
        ) : (
          <GoogleMaps.View
            style={{ width: "100%", height: "100%" }}
            cameraPosition={cameraPosition}
            markers={markers}
            properties={{
              isMyLocationEnabled: true,
              selectionEnabled: true,
            }}
            onMapClick={(event: { coordinates: Coordinates }) =>
              handleMapClick(event.coordinates)
            }
          />
        )}
      </View>

      {/* Set New Location button (auto locate) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleAutoLocate}
        className="mt-2 h-12 rounded-full border border-gray-300 dark:border-gray-700 
          items-center justify-center bg-background dark:bg-backgroundDark"
      >
        {autoLoading ? (
          <ActivityIndicator size="small" color={isDark ? "#fff" : "#000"} />
        ) : (
          <Text className="text-body text-text dark:text-textDark">
              {t('set_new_location')}
          </Text>
        )}
      </TouchableOpacity>

      {/* ---------- FULLSCREEN SEARCH MODAL ---------- */}
      <Modal visible={isSearching} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            style={{ flex: 1 }}
          >
            <View className="flex-1 bg-background dark:bg-backgroundDark px-6 pt-6 mt-10">
              {/* Top row: Back + Input */}
              <View className="flex-row items-center mb-4">
                <TouchableOpacity
                  onPress={() => {
                    setIsSearching(false);
                    Keyboard.dismiss();
                  }}
                  className="mr-3"
                >
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color={isDark ? "#fff" : "#000"}
                  />
                </TouchableOpacity>

                <View className="flex-1">
                  <TextInput
                    value={address}
                    onChangeText={handleAddressSearch}
                    autoFocus
                    placeholder={t('search_enter_address')}
                    placeholderTextColor="#9CA3AF"
                    className="w-full border rounded-xl px-3 py-3 text-text dark:text-textDark 
                      border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark"
                  />
                </View>
              </View>

              {/* Suggestions list */}
              <View className="flex-1">
                {suggestions.length > 0 ? (
                  <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.place_id}
                    keyboardShouldPersistTaps="handled"
                    className="rounded-xl bg-card dark:bg-cardDark border border-gray-300 dark:border-gray-700"
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="p-3 border-b border-gray-200 dark:border-gray-700"
                        onPress={() => handleSuggestionPress(item)}
                      >
                        <Text className="text-text dark:text-textDark">
                          {item.description}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-small text-secondary dark:text-secondaryDark">
                        {t('start_typing_search')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default LocationTab;
