import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ServiceRequestsScreen() {
    const { colorScheme } = useColorScheme();
    const insets = useSafeAreaInsets()
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <StatusBar barStyle={"dark-content"} />

            {/* Header */}
            <PageTitle text="Service Requests" />
            <View className="mb-4 border-b border-gray-200 dark:border-gray-700" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mx-5"
                contentContainerStyle={{ paddingBottom: insets.bottom || 16 }}
            >
                {/* New Request Button */}
                <PrimaryButton title="New Request" className="mb-6" onPress={() => router.push("/(tenant)/new-service-request")}/>

                {/* List of Requests */}
                {serviceRequests.map((req, index) => (
                    <View
                        key={index}
                        className="bg-card dark:bg-cardDark p-4 rounded-2xl mb-6"
                    >
                        {/* Title + Price */}
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                {req.title}
                            </Text>
                            <Text className="text-body font-semibold text-text dark:text-textDark">
                                SAR {req.price}
                            </Text>
                        </View>

                        {/* Submitted date */}
                        <Text className="text-small text-secondary dark:text-secondaryDark mb-4">
                            Submitted on {req.date}
                        </Text>

                        {/* Contact Person */}
                        <Text className="text-body font-semibold text-text dark:text-textDark mb-2">
                            Contact Person
                        </Text>

                        <View className="flex-row items-center mb-4">
                            <Image
                                source={{ uri: req.personAvatar }}
                                className="w-10 h-10 rounded-full mr-3"
                            />

                            <View className="flex-1">
                                <View className="flex-row items-center">
                                    <Text className="text-small font-semibold text-text dark:text-textDark mr-1">
                                        {req.personName}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="check-decagram"
                                        size={14}
                                        color="#3B82F6"
                                    />
                                </View>
                                <Text className="text-caption text-secondary dark:text-secondaryDark">
                                    {req.personRole}
                                </Text>
                            </View>

                            <TouchableOpacity className="mr-3">
                                <Ionicons
                                    name="chatbubble-ellipses-outline"
                                    size={20}
                                    color={isDark ? "#fff" : "#000"}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Description */}
                        <Text className="text-body font-semibold text-text dark:text-textDark mb-1">
                            Description
                        </Text>

                        <Text className="text-small text-secondary dark:text-secondaryDark leading-5 mb-4">
                            {req.description}
                        </Text>

                        {/* Urgency */}
                        <Text className="text-small mb-1">
                            <Text className="font-semibold text-text dark:text-textDark">
                                Urgency{" "}
                            </Text>
                            <Text className="text-secondary dark:text-secondaryDark">
                                {req.urgency}
                            </Text>
                        </Text>

                        {/* Technician */}
                        <Text className="text-small mb-1">
                            <Text className="font-semibold text-text dark:text-textDark">
                                Technician{" "}
                            </Text>
                            <Text className="text-secondary dark:text-secondaryDark">
                                {req.technician}
                            </Text>
                        </Text>

                        {/* Estimated completion */}
                        <Text className="text-small mb-4">
                            <Text className="font-semibold text-text dark:text-textDark">
                                Est. Completion{" "}
                            </Text>
                            <Text className="text-secondary dark:text-secondaryDark">
                                {req.completion}
                            </Text>
                        </Text>

                        {/* Status Button (Disabled Button Style) */}
                        <View
                            className={`
                                mt-2 py-3 rounded-full items-center border
                                ${req.status === "Completed"
                                    ? "border-green-600"
                                    : "border-gray-400 dark:border-gray-600"
                                }
                            `}
                        >
                            <Text
                                className={`
                                    text-small font-semibold
                                    ${req.status === "Completed"
                                        ? "text-green-600"
                                        : "text-secondary dark:text-secondaryDark"
                                    }
                                `}
                            >
                                {req.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const serviceRequests = [
    {
        title: "AC Service Requests",
        price: 500,
        date: "10/17/2025",

        personName: "Steven Adams",
        personRole: "Property Owner",
        personAvatar: "https://i.pravatar.cc/150?img=12",

        description:
            "Air conditioning not cooling properly in the living room. Temperature stays at 28°C even when set to 20°C.",
        urgency: "High",
        technician: "Mohammed Ahmed",
        completion: "10/22/2025",

        status: "In Progress",
    },
    {
        title: "AC Service Requests",
        price: 500,
        date: "10/17/2025",

        personName: "Steven Adams",
        personRole: "Property Owner",
        personAvatar: "https://i.pravatar.cc/150?img=12",

        description:
            "Air conditioning not cooling properly in the living room. Temperature stays at 28°C even when set to 20°C.",
        urgency: "High",
        technician: "Mohammed Ahmed",
        completion: "10/22/2025",

        status: "Completed",
    },
];
