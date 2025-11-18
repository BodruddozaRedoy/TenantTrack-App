import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 21,
                    borderTopWidth: 0,
                    backgroundColor: "#99999950",
                    marginBottom: insets.bottom + 10, // ⬅ Dynamic space
                    borderRadius: 100,
                    paddingHorizontal: 10,
                    marginHorizontal: 5,
                    shadowColor: "#1a1a1a",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5,
                    position: "absolute",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"
                                } rounded-full justify-center`}
                        >
                            <FontAwesome5 name="building" size={26} color={focused ? "white" : "#CCCCCC"} />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="dashboard"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"
                                } rounded-full justify-center`}
                        >
                            <Ionicons name="grid" size={24} color={focused ? "white" : "#CCCCCC"} />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"
                                } rounded-full justify-center`}
                        >
                            <Ionicons name="chatbox-ellipses" size={26} color={focused ? "white" : "#CCCCCC"} />
                            {focused && <Text className="text-white font-semibold">Chat</Text>}
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"
                                } rounded-full justify-center`}
                        >
                            <FontAwesome name="user-circle" size={26} color={focused ? "white" : "#CCCCCC"} />
                            {focused && <Text className="text-white font-semibold">Profile</Text>}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
