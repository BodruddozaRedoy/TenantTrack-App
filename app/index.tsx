import PageTitle from "@/components/common/PageTitle";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageTitle text="Home" leftIcon={true} />
      <Text className="text-title text-blue-500">
        Welcome to Nativewind!
      </Text>
    </SafeAreaView>
  );
}
