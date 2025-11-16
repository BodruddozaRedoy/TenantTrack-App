import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import {
    AppleMaps,
    GoogleMaps,
    type CameraPosition,
    type Coordinates,
} from "expo-maps";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type FromParam = string | undefined;

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
}

const GOOGLE_KEY = "AIzaSyBDawoyAMGUy0JLSxN6NwTreIvU6kpmOOs";

const DEFAULT_CAMERA: CameraPosition = {
  coordinates: {
    latitude: 23.8103,
    longitude: 90.4125,
  },
  zoom: 12,
};

export default function ConfirmLocationScreen() {
  const { from } = useLocalSearchParams<{ from?: FromParam }>();

    const isManual = from === "manual";
    const isAuto = !isManual;

    const [loading, setLoading] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition | null>(
    DEFAULT_CAMERA
  );
  const [marker, setMarker] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);

    // Reverse Geocode
    const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
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
  };

    // Map Tap
  const handleMapClick = async (coords: Coordinates) => {
    if (!coords.latitude || !coords.longitude) return;

      const safeCoords: Coordinates = {
          latitude: Number(coords.latitude),
          longitude: Number(coords.longitude),
      };

      setMarker(safeCoords);

    setCameraPosition((prev) => ({
      ...(prev ?? DEFAULT_CAMERA),
        coordinates: safeCoords,
    }));

      const addr = await reverseGeocode(safeCoords.latitude, safeCoords.longitude);
    if (addr) setAddress(addr);
  };

    // Auto-location flow
  useEffect(() => {
      const fetchLocation = async () => {
          if (isManual) {
              setLoading(false);
              return;
          }

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            console.log("Permission denied");
            setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const coords: Coordinates = {
            latitude: Number(loc.coords.latitude),
            longitude: Number(loc.coords.longitude),
        };

        setMarker(coords);
          setCameraPosition({ coordinates: coords, zoom: 15 });

          const addr = await reverseGeocode(coords.latitude, coords.longitude);
        if (addr) setAddress(addr);

      } catch (error) {
          console.log("Auto location error:", error);
      }

          setLoading(false);
    };

      fetchLocation();
  }, [isManual]);

    // Search
  const handleAddressSearch = async (text: string) => {
    setAddress(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        text
      )}&key=${GOOGLE_KEY}`;

      const res = await fetch(url);
      const data = (await res.json()) as {
        predictions?: PlacePrediction[];
          status: string;
      };

      if (data.status === "OK" && data.predictions) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
        console.log("Autocomplete error:", error);
      setSuggestions([]);
    }
  };

    // Suggestion → Place Details
  const handleSuggestionPress = async (item: PlacePrediction) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${GOOGLE_KEY}`;
      const res = await fetch(url);
      const data = (await res.json()) as PlaceDetailsResponse;

        const loc = data.result?.geometry?.location;
      const formatted = data.result?.formatted_address;

        if (!loc) return;

      const coords: Coordinates = {
          latitude: Number(loc.lat),
          longitude: Number(loc.lng),
      };

        setMarker(coords);
      setAddress(formatted ?? item.description);
      setSuggestions([]);

        setCameraPosition({ coordinates: coords, zoom: 15 });
    } catch (error) {
        console.log("Place details error:", error);
    }
  };

    // 🌀 Loading UI while fetching auto location
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-background dark:bg-backgroundDark">
                <Ionicons name="locate" size={40} color="black" />
                <Text className="mt-3 text-text dark:text-textDark text-small">
                    Fetching your location...
                </Text>
            </View>
        );
    }

    // Render markers
  const markers = marker
      ? [{ id: "selected", coordinates: marker }]
    : [];

  return (
    <View className="flex-1 bg-background dark:bg-backgroundDark px-6 pt-14">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="black" />
      </TouchableOpacity>

      {/* Title */}
          <Text className="mt-6 text-title font-bold text-text dark:text-textDark">
        Set your location
      </Text>

      <Text className="text-small text-secondary dark:text-secondaryDark mb-4">
        {isAuto
          ? "We’ve used your device location. Adjust the pin if needed."
          : "Search or tap on the map to set your location."}
      </Text>

      {/* Map */}
          <View className="w-full h-[450px] rounded-2xl overflow-hidden mb-4 bg-gray-200">
        {cameraPosition &&
          (Platform.OS === "ios" ? (
            <AppleMaps.View
              style={{ width: "100%", height: "100%" }}
              cameraPosition={cameraPosition}
              markers={markers}
                      properties={{
                isMyLocationEnabled: isAuto,
                selectionEnabled: true,
              }}
                      onMapClick={(event) =>
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
                          onMapClick={(event) =>
                handleMapClick(event.coordinates)
              }
            />
          ))}
      </View>

          {/* Address Field */}
      <TextInput
        value={address}
        onChangeText={handleAddressSearch}
        className="w-full border rounded-xl p-3 text-text dark:text-textDark 
                   border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark"
              placeholder="Search or enter address"
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <FlatList
                  className="mt-2 bg-card dark:bg-cardDark rounded-xl border border-gray-300 dark:border-gray-700"
                  data={suggestions}
          keyExtractor={(item) => item.place_id}
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
      )}

      {/* Confirm Button */}
      <View className="mt-8">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/real-estate-type")}
          className="bg-primary dark:bg-primaryDark py-4 rounded-full"
        >
          <Text className="text-center text-background dark:text-textDark font-semibold">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
