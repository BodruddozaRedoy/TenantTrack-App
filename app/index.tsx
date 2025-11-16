import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { toast } from "sonner-native";

export default function Index() {
  const [role, setRole] = useState<string | null>(null)
  const [realEstateType, setRealEstateType] = useState<string | null>(null)
  const isAuthenticated = true;
  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const role: string | null = await AsyncStorage.getItem("role")
        const realEstateType = await AsyncStorage.getItem("real-estate-type")
        setRole(role)
        setRealEstateType(realEstateType)
        console.log(role, realEstateType)
      } catch (error) {
        console.log(error)
        toast.error("Cant fetch storage!")
      }
    }
    fetchStorage()
  }, [])


  return (
    <View className="bg-background dark:bg-backgroundDark flex-1">
      {
        !isAuthenticated && <Redirect href={"/(auth)"} />
      }
      {
        isAuthenticated && role == "prospective" && <Redirect href={"/(prospectiveTenant)/(tabs)"} />
      }
    </View>
  );
}

