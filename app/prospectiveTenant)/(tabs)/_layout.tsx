import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 70,
                    borderTopWidth: 0,
                    backgroundColor: "#ffffff",
                    marginBottom: 40
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className="items-center">
                            <Ionicons
                                name="compass-outline"
                                size={26}
                                color={focused ? "black" : "#9ca3af"}
                            />
                            {focused && <View className="w-1 h-1 rounded-full bg-black mt-1" />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="bookmark-outline"
                            size={26}
                            color={focused ? "black" : "#9ca3af"}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="chats"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={26}
                            color={focused ? "black" : "#9ca3af"}
                        />
                    ),
                }}
            />



            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="person-circle-outline"
                            size={28}
                            color={focused ? "black" : "#9ca3af"}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
