import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller"; // ← your package
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_MESSAGES = [
  {
    id: "1",
    text: "Hi, is the house still available to rent? I want to know the house detail.",
    time: "13:00 PM",
    sentByMe: true,
    seen: true,
  },
  {
    id: "2",
    text: "Yes, the house is still available to rent,",
    time: "13:10 PM",
    sentByMe: false,
  },
];

export default function ChatDetailScreen() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sentByMe: true,
      seen: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            className="w-10 h-10 rounded-full mr-3"
          />

          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-body font-semibold text-text dark:text-textDark mr-1">
                Steven Adams
              </Text>
              <MaterialIcons name="verified" size={14} color="#3B82F6" />
            </View>
          </View>

          <View className="flex-row gap-4">
            <TouchableOpacity>
              <Ionicons name="call-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Listing Preview → scrolls naturally */}
        <View className="flex-row m-5 rounded-lg items-center py-3 px-4 border border-b border-gray-200 dark:border-gray-800 bg-background dark:bg-backgroundDark">
          <View className="size-36 bg-gray-300 rounded-lg mr-3" />
          <View className="flex-1">
            <Text className="text-body font-semibold text-text dark:text-textDark">
              The Minimalist
            </Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">
              Brooklyn, New York
            </Text>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          ListHeaderComponent={
            <View className="flex-row items-center my-2">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="text-caption text-secondary mx-2">Today</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>
          }
          renderItem={({ item }) => (
            <View className={`mb-4 ${item.sentByMe ? "items-end" : "items-start"}`}>
              <View
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  item.sentByMe
                    ? "bg-text dark:bg-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <Text
                  className={`text-small leading-5 ${
                    item.sentByMe
                      ? "text-white dark:text-backgroundDark"
                      : "text-text dark:text-textDark"
                  }`}
                >
                  {item.text}
                </Text>
              </View>

              <View className="flex-row items-center mt-1">
                <Text className="text-caption text-secondary mr-1">{item.time}</Text>
                {item.sentByMe && item.seen && (
                  <Ionicons name="checkmark-done" size={16} color="#4ADE80" />
                )}
              </View>
            </View>
          )}
        />

        {/* Input Box */}
        <View className="flex-row items-center px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <Ionicons name="happy-outline" size={24} color="#9CA3AF" />

          <TextInput
            className="flex-1 mx-3 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-text dark:text-textDark"
            placeholder="Write a message ..."
            placeholderTextColor="#9CA3AF"
            value={input}
            onChangeText={setInput}
          />

          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
