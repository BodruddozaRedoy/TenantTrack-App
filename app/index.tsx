import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const isAuthenticated = false;

  return (
    <View >
      {
        !isAuthenticated && <Redirect href={"/(auth)"} />
      }
    </View>
  );
}

