import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 21,
                    borderTopWidth: 0,
                    backgroundColor: "#99999940",
                    marginBottom: 60,
                    borderRadius: 100,
                    paddingHorizontal: 10,
                    marginHorizontal: 5
                },
                tabBarItemStyle: {
                    marginHorizontal: 10
                },

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"} rounded-full justify-center `}>
                            <Ionicons
                                name="compass-outline"
                                size={26}
                                color={focused ? "white" : "#CCCCCC"}
                            />
                            {focused && <Text className="text-white font-semibold">Explore</Text>}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"} rounded-full justify-center `}>
                            <MaterialCommunityIcons name="bookmark-minus" size={26} color={focused ? "white" : "#CCCCCC"} />
                            {focused && <Text className="text-white font-semibold">Favorite</Text>}
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"} rounded-full justify-center `}>
                            <Ionicons
                                name="chatbox-ellipses"
                                size={26}
                                color={focused ? "white" : "#CCCCCC"}
                            />
                            {focused && <Text className="text-white font-semibold">Chat</Text>}
                        </View>
                    ),
                }}
            />



            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className={`items-center flex-row gap-2 ${focused ? "bg-backgroundDark h-20 w-28 rounded-full" : "bg-background size-20"} rounded-full justify-center `}>
                            <FontAwesome
                                name="user-circle"
                                size={26}
                                color={focused ? "white" : "#CCCCCC"}
                            />
                            {focused && <Text className="text-white font-semibold">Profile</Text>}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
