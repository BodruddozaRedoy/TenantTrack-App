import PageTitle from "@/components/common/PageTitle";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentLocations = [
  "Brooklyn, New York",
  "Canarsie, New York",
  "Bushwick, New York",
];

export default function SearchScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark  pt-2">

      {/* Top Navigation */}
      <PageTitle text="Search" leftIcon={true} leftOnPress={() => router.back()}/>

      {/* Search Input */}
      <View className="flex-row items-center bg-gray-100 rounded-full pl-5 py-3 pr-3 mx-5">
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Search anything"
          placeholderTextColor="#9CA3AF"
          className="flex-1 ml-2 text-text dark:text-textDark"
        />
        <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/filter")} className="bg-background p-3 rounded-full"><Ionicons name="options-outline" size={20} color="#999" /></TouchableOpacity>
      </View>

      <View className="border-b border-gray-200 my-5" />

      {/* Recent Search Section */}
      <Text className="text-small text-secondary dark:text-secondaryDark mb-3 px-5">
        Recent Search
      </Text>

      <FlatList
        data={recentLocations}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-3">
            <Ionicons
              name="location"
              size={18}
              className="text-secondary dark:text-secondaryDark mr-2"
            />
            <Text className="text-body text-text dark:text-textDark">{item}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
