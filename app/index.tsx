import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { toast } from "sonner-native";

export default function Index() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const isAuthenticated = true;
  useEffect(() => {
    const fetchStorage = async () => {
      setLoading(true)
      try {
        const role: string | null = await AsyncStorage.getItem("role")
        const realEstateType = await AsyncStorage.getItem("real-estate-type")
        setRole(role)
        setLoading(false)
        console.log(role, realEstateType)
      } catch (error) {
        console.log(error)
        toast.error("Cant fetch storage!")
      } finally {
        setLoading(false)
      }
    }
    fetchStorage()
  }, [])

  if (loading) return <Text>Loading...</Text>


  return (
    <View className="bg-background dark:bg-backgroundDark flex-1">
      {
        !isAuthenticated && <Redirect href={"/(auth)"} />
      }
      {
        isAuthenticated && role === null && <Redirect href={"/(auth)"} />
      }
      {
        isAuthenticated && role === "prospective" && <Redirect href={"/(prospectiveTenant)/(tabs)"} />
      }
      {
        isAuthenticated && role === "tenant" && <Redirect href={"/(tenant)/(tabs)"} />
      }
      {
        isAuthenticated && role === "landlord" && <Redirect href={"/(prospectiveTenant)/(tabs)"} />
      }
      {
        isAuthenticated && role === "agent" && <Redirect href={"/(prospectiveTenant)/(tabs)"} />
      }
    </View>
  );
}

