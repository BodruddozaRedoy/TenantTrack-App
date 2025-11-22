import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import {
    AppleMaps,
    GoogleMaps,
    type CameraPosition,
    type Coordinates,
} from "expo-maps";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Keyboard,
    Platform,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

type FromParam = "auto" | "manual" | undefined;

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

const GOOGLE_KEY = "AIzaSyBDawoyAMGUy0JLSxN6NwTreIvU6kpmOOs";

// Dhaka fallback
const DEFAULT_CAMERA: CameraPosition = {
  coordinates: {
    latitude: 23.8103,
    longitude: 90.4125,
  },
  zoom: 12,
};

export default function ConfirmLocationScreen() {
  const { from } = useLocalSearchParams<{ from?: FromParam }>();
    const { t } = useTranslation();

    const isAuto = from === "auto";

    const [loading, setLoading] = useState(true);
    const [cameraPosition, setCameraPosition] =
        useState<CameraPosition>(DEFAULT_CAMERA);
  const [marker, setMarker] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
    const [isSearching, setIsSearching] = useState(false); // 🔥 search mode

    const showToast = (msg: string) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Alert.alert(t('location'), msg);
        }
    };

    // ---------------- Reverse Geocode ----------------
    const reverseGeocode = useCallback(
        async (lat: number, lng: number): Promise<string> => {
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
      },
      []
  );

    // ---------------- Auto Location (Allow Maps) ----------------
    const fetchAutoLocation = useCallback(async () => {
        setLoading(true);

      try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
              showToast(t('location_permission_denied'));
              setLoading(false);
              return;
          }

        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
            showToast(t('enable_location_services'));
            setLoading(false);
            return;
        }

        let pos = await Location.getLastKnownPositionAsync();
        if (!pos) {
            pos = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                // timeout: 7000,
            });
        }

        if (!pos) {
            showToast(t('unable_get_location'));
            setLoading(false);
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
        });

        const addr = await reverseGeocode(coords.latitude, coords.longitude);
        if (addr) setAddress(addr);
    } catch (error) {
        console.log("Auto location error:", error);
    }

      setLoading(false);
  }, [reverseGeocode]);

    useEffect(() => {
        if (isAuto) {
            fetchAutoLocation();
        } else {
            setLoading(false); // manual mode → show immediately
        }
    }, [isAuto, fetchAutoLocation]);

    // ---------------- Map Tap → Pin + Address ----------------
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
      });

      const addr = await reverseGeocode(safeCoords.latitude, safeCoords.longitude);
      if (addr) setAddress(addr);
  };

    // ---------------- Manual Search (Autocomplete) ----------------
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
        // (optional: &components=country:bd)

      const res = await fetch(url);
        const data = await res.json();

        if (data.status === "OK" && Array.isArray(data.predictions)) {
        setSuggestions(data.predictions);
      } else {
          console.log("Places autocomplete error:", data.status, data.error_message);
        setSuggestions([]);
      }
    } catch (error) {
        console.log("Places autocomplete fetch error:", error);
      setSuggestions([]);
    }
  };

    // ---------------- Selecting a Suggestion ----------------
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
        });
      setAddress(formatted ?? item.description);
        setSuggestions([]);

        // ✅ Exit search mode and hide keyboard
        setIsSearching(false);
        Keyboard.dismiss();
    } catch (error) {
        console.log("Place details fetch error:", error);
    }
  };

    const markers = marker
        ? [{ id: "selected-location", coordinates: marker }]
        : [];

    // ---------------- Loading (Auto Mode) ----------------
    if (isAuto && loading) {
        return (
            <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
                <View className="flex-1 items-center justify-center px-6">
                    <ActivityIndicator size="large" />
                    <Text className="mt-4 text-small text-secondary dark:text-secondaryDark">
                        {t('fetching_location')}
                    </Text>

                <View className="w-full mt-6">
                        <PrimaryButton title={t('try_again')} onPress={fetchAutoLocation} />
                </View>

                  <View className="w-full mt-3">
                      <PrimaryButton
                            title={t('select_manually')}
                          onPress={() =>
                              router.replace("/(auth)/confirm-location?from=manual")
                          }
                      />
                  </View>
              </View>
          </SafeAreaView>
      );
  }

    // ---------------- SEARCH MODE UI (FULLSCREEN) ----------------
    if (isSearching) {
        return (
      <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                    style={{ flex: 1 }}
                >
                        <View className="flex-1 px-6 pt-6">
                            {/* Top row: Back + Input + Cancel */}
                            <View className="flex-row items-center mb-4">
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsSearching(false);
                                        Keyboard.dismiss();
                                    }}
                                    className="mr-3"
                                >
                                    <Ionicons name="arrow-back" size={24} color="black" />
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

                            {/* Suggestions only */}
                            <View className="h-auto">
                                {suggestions.length > 0 ? (
                                    <FlatList
                                        data={suggestions}
                                        keyExtractor={(item) => item.place_id}
                                        keyboardShouldPersistTaps="handled"
                                        className="rounded-xl bg-card dark:bg-cardDark border border-gray-200 dark:border-gray-700"
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
            </SafeAreaView>
        );
    }

    // ---------------- MAIN UI (MAP + STATIC SEARCH BOX) ----------------
    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
          <View className="flex-1 px-6 pt-14">

              {/* Back Button */}
              <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={26} color="black" />
              </TouchableOpacity>

              {/* Title */}
              <Text className="mt-6 text-title font-bold text-text dark:text-textDark">
                    {t('set_location')}
              </Text>

              <Text className="text-small text-secondary dark:text-secondaryDark mb-4">
                  {isAuto
                        ? t('device_location_used')
                        : t('search_map_location')}
              </Text>

              {/* Map */}
              <View className="w-full h-[430px] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                  {Platform.OS === "ios" ? (
                      <AppleMaps.View
                          style={{ width: "100%", height: "100%" }}
                          cameraPosition={cameraPosition}
                          markers={markers}
                          properties={{
                              isMyLocationEnabled: isAuto,
                              selectionEnabled: true,
                          }}
                          onMapClick={(event: { coordinates: Coordinates }) =>
                              handleMapClick(event.coordinates)
                          }
                      />
                  ) : (
                      <GoogleMaps.View
                          style={{ width: "100%", height: "100%" }}
                          cameraPosition={cameraPosition}
                          markers={markers}
                          properties={{
                              isMyLocationEnabled: isAuto,
                              selectionEnabled: true,
                          }}
                          onMapClick={(event: { coordinates: Coordinates }) =>
                              handleMapClick(event.coordinates)
                          }
                      />
                  )}
              </View>

              {/* Fake search box → triggers search mode */}
              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setIsSearching(true)}
                  className="w-full border rounded-xl px-3 py-3 flex-row items-center 
                     border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark"
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

              {/* Confirm Button */}
              <View className="mt-8 mb-4">
                  <PrimaryButton
                        title={t('confirm')}
                      onPress={() => router.push("/(auth)/real-estate-type")}
                  />
              </View>

          </View>
      </SafeAreaView>
  );
}
