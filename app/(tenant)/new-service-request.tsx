import { Entypo, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewServiceRequest() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <StatusBar barStyle={"dark-content"} />

            {/* Header */}
            <View className="flex-row justify-between items-center px-5 py-5">
                <TouchableOpacity>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={isDark ? "#fff" : "#000"}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={24} color={isDark ? "#fff" : "#000"} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="px-5"
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Property Name */}
                <Text className="text-title font-bold text-text dark:text-textDark">
                    The Minimalist
                </Text>
                <Text className="text-small mb-3 text-secondary dark:text-secondaryDark">
                    Brooklyn, New York
                </Text>

                {/* Tags row */}
                <View className="flex-row flex-wrap gap-2 mb-6">
                    <Tag label="8 guest" icon="people-outline" />
                    <Tag label="3 Bedrooms" icon="bed-outline" />
                    <Tag label="2 Baths" icon="car-outline" />
                </View>

                {/* Upload Photo Section */}
                <TouchableOpacity
                    className="
                        bg-gray-200 dark:bg-gray-700 
                        rounded-xl h-40 
                        justify-center items-center mb-6
                    "
                >
                    <Ionicons
                        name="camera-outline"
                        size={32}
                        color={isDark ? "#d1d5db" : "#6b7280"}
                    />
                    <Text className="text-body mt-2 text-secondary dark:text-secondaryDark">
                        Upload Photo
                    </Text>
                </TouchableOpacity>

                {/* Dropdowns + input */}
                <Dropdown label="Problem" />
                <Dropdown label="Urgency" />
                <InputBox label="Description" />

                {/* Submit */}
                <TouchableOpacity className="bg-primary dark:bg-primaryDark py-4 rounded-full mt-8 mb-3">
                    <Text className="text-body font-semibold text-background dark:text-backgroundDark text-center">
                        Submit
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const Tag = ({ label, icon }:any) => (
    <View className="flex-row items-center border bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
        <Ionicons name={icon} size={14} color="#6B7280" />
        <Text className="ml-1 text-caption text-secondary dark:text-secondaryDark">
            {label}
        </Text>
    </View>
);

const Dropdown = ({ label }:any) => (
    <View className="mb-4">
        <TouchableOpacity
            className="
                border border-gray-300 dark:border-gray-700 
                bg-background dark:bg-backgroundDark 
                rounded-xl px-4 py-4 flex-row justify-between items-center
            "
        >
            <Text className="text-body text-text dark:text-textDark">
                {label}
            </Text>
            <Ionicons
                name="chevron-down"
                size={20}
                color="#6B7280"
            />
        </TouchableOpacity>
    </View>
);

const InputBox = ({ label }:any) => (
    <View className="mb-4">
        <Text className="mb-2 text-body text-text dark:text-textDark">
            {label}
        </Text>
        <View
            className="
                border border-gray-300 dark:border-gray-700 
                bg-background dark:bg-backgroundDark 
                rounded-xl px-4 py-4
            "
        >
            <Text className="text-small text-secondary dark:text-secondaryDark">
                Write here...
            </Text>
        </View>
    </View>
);
