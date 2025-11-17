import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LISTED_PROPERTIES = [
  {
    id: "p1",
    title: "The Minimalist",
    location: "Brooklyn, New York",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80",
  },
  {
    id: "p2",
    title: "Retro House",
    location: "Canarsie, New York",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
];

export default function PropertyOwnerModal({ visible, onClose }: any) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
      />

      {/* Bottom Sheet */}
      <View className="bg-background dark:bg-backgroundDark rounded-t-3xl px-5 pt-4 pb-6 max-h-[85%]">

        {/* Drag handle */}
        <View className="items-center mb-3">
          <View className="w-10 h-1.5 rounded-full bg-gray-300" />
        </View>

        {/* Owner info */}
        <View className="flex-row items-center mb-5">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-body font-semibold text-text dark:text-textDark mr-1">
                Steven Adams
              </Text>
              <MaterialIcons name="verified" size={14} color="#3B82F6" />
              <Text className="ml-1 text-caption text-blue-500">VERIFIED</Text>
            </View>
            <Text className="text-caption text-secondary dark:text-secondaryDark">
              Property Owner
            </Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity className="w-9 h-9 rounded-full border border-gray-300 items-center justify-center">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={18}
                color="#000"
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-9 h-9 rounded-full border border-gray-300 items-center justify-center">
              <Ionicons name="call-outline" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <Text className="text-body font-semibold text-text dark:text-textDark mb-1">
          About
        </Text>
        <Text className="text-small leading-5 text-secondary dark:text-secondaryDark mb-5">
          Meet Steven Adams, the owner of this charming townhouse located in
          Brooklyn's Park Slope neighborhood. With a deep-rooted passion
          for real estate, Steven has carefully curated and maintained this
          property to provide a comfortable and stylish living experience.
        </Text>

        {/* Listed Property title */}
        <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
          Listed Property
        </Text>

        {/* Horizontal List */}
        <View style={{ height: 200 }}>
          <FlatList
            data={LISTED_PROPERTIES}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="w-3" />}
            contentContainerStyle={{ paddingRight: 24 }}
            renderItem={({ item }) => (
              <View className="w-[220px]">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-36 rounded-xl mb-3"
                />
                <Text className="text-body font-semibold text-text dark:text-textDark">
                  {item.title}
                </Text>
                <Text className="text-caption text-secondary dark:text-secondaryDark">
                  {item.location}
                </Text>

                <TouchableOpacity className="absolute top-2 right-2 bg-black/40 p-1.5 rounded-full">
                  <Ionicons name="bookmark-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

      </View>
    </Modal>
  );
}
