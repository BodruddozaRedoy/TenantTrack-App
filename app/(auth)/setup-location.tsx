import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import * as Location from "expo-location";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Text,
  View
} from "react-native";

export default function SetLocationScreen() {
  const handleAllowLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please enable location permission for the best experience."
        );
        return;
      }

      // You can also fetch the user's location here if needed
      // const userLocation = await Location.getCurrentPositionAsync({});

        router.push("/(auth)/confirm-location?from=auto");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to access location.");
    }
  };

  const handleManual = () => {
      router.push("/(auth)/confirm-location?from=manual");
  };

  return (
    <View className="flex-1 bg-background dark:bg-backgroundDark px-6 pt-14">
      {/* Back Button */}
      <PageTitle text="" leftIcon={true}/>

      {/* Illustration */}
      <View className="items-center mt-20 mb-8">
        <Image
          source={require('../../assets/images/map-image.png')} // Replace with your asset
          resizeMode="contain"
          className="w-56 h-56"
        />
      </View>

      {/* Title */}
      <Text className="text-title text-center text-text dark:text-textDark font-bold mb-2">
        Set your location
      </Text>

      {/* Subtitle */}
      <Text className="text-small text-center text-secondary dark:text-secondaryDark mb-12">
        Let us know your location for best experience
      </Text>

      {/* Allow Google Maps */}
      <PrimaryButton
        title="Allow Google Maps"
        onPress={handleAllowLocation}
      />

      {/* Manual Button */}
      <SecondaryButton className="mt-5" onPress={handleManual} title="Set Manually" />
    </View>
  );
}
