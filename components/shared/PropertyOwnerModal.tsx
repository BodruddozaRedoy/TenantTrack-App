import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Modal,
  PanResponder,
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

interface PropertyOwnerModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PropertyOwnerModal({ visible, onClose }: PropertyOwnerModalProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  // Reset position when opened
  useEffect(() => {
    if (visible) translateY.setValue(0);
  }, [visible]);

  // Swipe down gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120) {
          onClose();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent>
      {/* Backdrop */}
      <Pressable onPress={onClose} className="flex-1 bg-black/40" />

      {/* Bottom Sheet */}
      <Animated.View
        style={{ transform: [{ translateY }] }}
        {...panResponder.panHandlers}
        className="bg-background dark:bg-backgroundDark rounded-t-3xl px-5 pt-4 pb-6 max-h-[85%]"
      >
        {/* Close Button (NEW) */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute right-4 top-3 w-9 h-9 rounded-full bg-gray-200/80 dark:bg-gray-700/60 items-center justify-center z-10"
        >
          <Ionicons name="close" size={18} color="#000" />
        </TouchableOpacity>

        {/* Drag handle */}
        <Pressable onPress={onClose} className="items-center mb-3 mt-2">
          <View className="w-10 h-1.5 rounded-full bg-gray-300" />
        </Pressable>

        {/* Owner Info */}
        <View className="flex-row items-center mb-5 mt-5">
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
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#000" />
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
          Brooklyn's Park Slope neighborhood...
        </Text>

        {/* Listed Property */}
        <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
          Listed Property
        </Text>

        <View style={{ height: 200 }}>
          <FlatList
            data={LISTED_PROPERTIES}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="w-3" />}
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
      </Animated.View>
    </Modal>
  );
}
