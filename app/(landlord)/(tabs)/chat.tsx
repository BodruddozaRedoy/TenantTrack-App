import PageTitle from "@/components/common/PageTitle";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chatData = [
  {
    id: "1",
    name: "Steven Adams",
    role: "Property Owner",
    verified: true,
    date: "23/07/2024",
    avatar:
      "https://ui-avatars.com/api/?name=Steven+Adams&background=random&rounded=true",
    unread: true,
  },
  {
    id: "2",
    name: "Arthur Wraight",
    role: "Property Owner",
    verified: true,
    date: "16/07/2024",
    avatar:
      "https://ui-avatars.com/api/?name=Arthur+Wraight&background=random&rounded=true",
    unread: false,
  },
];

export default function ChatScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark  pt-2">
      {/* <StatusBar barStyle={"dark-content"} /> */}
      {/* Page Title */}
      <PageTitle text={t('chat')} />

      <View className="border-b border-gray-200 mb-4 dark:border-gray-700" />

      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 20, position: "relative", paddingTop: 10 }}
        renderItem={({ item }) => {
          const active = item.unread;

          return (
            <TouchableOpacity
              onPress={() => router.push("/(prospectiveTenant)/chat-detail")}
              className={`flex-row items-center mb-4 rounded-full px-3 py-3
              ${active
                  ? "bg-primary dark:bg-primaryDark"
                : "bg-[#99999940]"
                }
              `}
            >
              {/* Avatar */}
              <Image
                source={{ uri: item.avatar }}
                className="w-14 h-14 rounded-full mr-3"
              />

              {/* Name + Role */}
              <View className="flex-1">
                <View className="flex-row items-center gap-1">
                  <Text
                    className={`text-body font-semibold
                    ${active ? "text-white dark:text-text" : "text-text dark:text-textDark"}`}
                  >
                    {item.name}
                  </Text>

                  {item.verified && (
                    <MaterialIcons name="verified" size={14} color={active ? "#4DA3FF" : "#4DA3FF"} />
                  )}

                  {item.verified && (
                    <Text
                      className={`text-caption font-medium
                      ${active ? "text-[#4DA3FF]" : "text-[#4DA3FF]"}`}
                    >
                      {t('verified')}
                    </Text>
                  )}
                </View>

                <Text
                  className={`text-caption
                  ${active ? "text-white dark:text-secondary" : "text-secondary dark:text-secondaryDark"}`}
                >
                  {item.role}
                </Text>
              </View>

              {/* Date + Dot */}
              <View className="items-end">
                <Text
                  className={`text-caption
                  ${active ? "text-white dark:text-secondary" : "text-secondary dark:text-secondaryDark"}`}
                >
                  {item.date}
                </Text>

                {active && (
                  <View className="size-5 rounded-full bg-white dark:bg-backgroundDark items-center justify-center mt-1 absolute -top-9">
                    <View className="size-4 rounded-full bg-red-500 " />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
