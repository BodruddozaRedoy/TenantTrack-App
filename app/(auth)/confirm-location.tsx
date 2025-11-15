import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import {
  AppleMaps,
  GoogleMaps,
  type CameraPosition,
  type Coordinates,
} from "expo-maps";

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
}

const GOOGLE_KEY = "AIzaSyBDawoyAMGUy0JLSxN6NwTreIvU6kpmOOs";

// Fallback camera (e.g. Dhaka) so map always has something to render
const DEFAULT_CAMERA: CameraPosition = {
  coordinates: {
    latitude: 23.8103,
    longitude: 90.4125,
  },
  zoom: 12,
};

export default function ConfirmLocationScreen() {
  const { from } = useLocalSearchParams<{ from?: FromParam }>();

  const [cameraPosition, setCameraPosition] = useState<CameraPosition | null>(
    DEFAULT_CAMERA
  );
  const [marker, setMarker] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);

  // ---------- Helpers ----------

  const reverseGeocode = async (
    latitude: number,
    longitude: number
  ): Promise<string> => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`;
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

  const handleMapClick = async (coords: Coordinates) => {
    if (!coords.latitude || !coords.longitude) return;

    setMarker(coords);
    setCameraPosition((prev) => ({
      ...(prev ?? DEFAULT_CAMERA),
      coordinates: {
        latitude: coords.latitude!,
        longitude: coords.longitude!,
      },
    }));

    const addr = await reverseGeocode(coords.latitude!, coords.longitude!);
    if (addr) setAddress(addr);
  };

  // ---------- Auto mode: get device location ----------

  useEffect(() => {
    const initAutoLocation = async () => {
      if (from !== "auto") return;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("Location permission not granted");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const coords: Coordinates = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };

        setMarker(coords);
        setCameraPosition({
          coordinates: coords,
          zoom: 15,
        });

        const addr = await reverseGeocode(coords.latitude!, coords.longitude!);
        if (addr) setAddress(addr);
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    };

    initAutoLocation();
  }, [from]);

  // ---------- Address search (manual typing) ----------

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
        error_message?: string;
      };

      if (data.status === "OK" && data.predictions) {
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

  // ---------- When user taps a suggestion ----------

  const handleSuggestionPress = async (item: PlacePrediction) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${GOOGLE_KEY}`;
      const res = await fetch(url);
      const data = (await res.json()) as PlaceDetailsResponse;

      const location = data.result?.geometry?.location;
      const formatted = data.result?.formatted_address;

      if (!location) {
        console.log("No geometry for place details");
        return;
      }

      const coords: Coordinates = {
        latitude: location.lat,
        longitude: location.lng,
      };

      setAddress(formatted ?? item.description);
      setSuggestions([]);

      setMarker(coords);
      setCameraPosition({
        coordinates: coords,
        zoom: 15,
      });
    } catch (error) {
      console.log("Place details fetch error:", error);
    }
  };

  // ---------- Render ----------

  // Markers prop for expo-maps (same shape for Apple & Google)
  const markers = marker
    ? [
        {
          id: "selected-location",
          coordinates: marker,
        },
      ]
    : [];

  const isAuto = from === "auto";

  return (
    <View className="flex-1 bg-background dark:bg-backgroundDark px-6 pt-14">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="black" />
      </TouchableOpacity>

      {/* Icon */}
      <View className="mt-6 mb-4">
        <Ionicons name="sparkles-outline" size={26} color="black" />
      </View>

      {/* Title */}
      <Text className="text-title font-bold text-text dark:text-textDark">
        Set your location
      </Text>

      {/* Subtitle */}
      <Text className="text-small text-secondary dark:text-secondaryDark mb-4">
        {isAuto
          ? "We’ve used your device location. Adjust the pin if needed."
          : "Search or tap on the map to set your location."}
      </Text>

      {/* Map */}
      <View className="w-full h-64 rounded-2xl overflow-hidden mb-4 bg-gray-200">
        {cameraPosition &&
          (Platform.OS === "ios" ? (
            <AppleMaps.View
              style={{ width: "100%", height: "100%" }}
              cameraPosition={cameraPosition}
              markers={markers}
              properties={{
                // Only show system location dot when coming from "auto"
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
          ))}
      </View>

      {/* Address Input */}
      <TextInput
        value={address}
        onChangeText={handleAddressSearch}
        className="w-full border rounded-xl p-3 text-text dark:text-textDark 
                   border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark"
        placeholder="Search or enter address"
        placeholderTextColor="#9CA3AF"
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <FlatList
          className="mt-2 bg-card dark:bg-cardDark rounded-xl 
                     border border-gray-300 dark:border-gray-700"
          data={suggestions}
          keyboardShouldPersistTaps="handled"
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
