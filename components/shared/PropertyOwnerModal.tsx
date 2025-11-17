import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

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

const PHOTOS = [
  "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
];

interface PropertyOwnerModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PropertyOwnerModal({
  visible,
  onClose,
}: PropertyOwnerModalProps) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={120}
      animationOutTiming={120}
      useNativeDriver
      propagateSwipe
      style={{ justifyContent: "flex-end", margin: 0 }}
    >

      <View className="bg-background dark:bg-backgroundDark rounded-t-3xl px-5 pt-4 pb-6 max-h-[85%]">
        {/* Drag handle */}
        <View className="items-center mb-2">
          <View className="w-10 h-1.5 rounded-full bg-gray-300" />
        </View>



        {/* Scroll content */}
        <FlatList
          data={LISTED_PROPERTIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingRight: 24 }}
          ListHeaderComponent={
            <View style={{ width: 280, paddingRight: 16 }}>
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
            </View>
          }
          renderItem={({ item }) => (
            <View className="mr-4 w-[250px]">
              <Image
                source={{ uri: item.image }}
                className="w-full h-40 rounded-xl mb-3"
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
    </Modal>
  );
}
