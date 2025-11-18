import PageTitle from "@/components/common/PageTitle";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Notification Data (no icon field anymore)
const notifications = [
    {
        id: "1",
        title: "Receipt Released",
        message: "Your receipt has been released",
        date: "20/07/2024",
        color: "#000000",
        textColor: "#FFFFFF",
    },
    {
        id: "2",
        title: "Payment Success",
        message: "Your payment has been successfully",
        date: "20/07/2024",
        color: "#4ADE80", // green
        textColor: "#1A1A1A",
    },
    {
        id: "3",
        title: "Rent Canceled",
        message: "Your cancel request has been received",
        date: "20/07/2024",
        color: "#F87171", // red
        textColor: "#1A1A1A",
    },
    {
        id: "4",
        title: "Pending Rent",
        message: "Your rent has been delayed",
        date: "20/07/2024",
        color: "#FACC15", // yellow
        textColor: "#1A1A1A",
    },
];

// 🔧 Icon Resolver based on title
const getIconByTitle = (title: string) => {
    const t = title.toLowerCase();

    if (t.includes("receipt")) {
        return { lib: "io", name: "receipt" };
    }
    if (t.includes("payment") || t.includes("success")) {
        return { lib: "mi", name: "verified" };
    }
    if (t.includes("canceled") || t.includes("cancelled")) {
        return { lib: "io", name: "close-circle-sharp" };
    }
    if (t.includes("pending") || t.includes("rent")) {
        return { lib: "mc", name: "clock-alert-outline" };
    }

    return { lib: "io", name: "notifications-outline" }; // fallback
};

// 🔧 Renderer
const RenderIcon = ({ title, size, color }: any) => {
    const { lib, name } = getIconByTitle(title);

    if (lib === "mc") {
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
    }
    if (lib === "mi")
        return <MaterialIcons name={name} size={size} color={color} />
    if (lib === "io")
        return <Ionicons name={name} size={size} color={color} />;
};

export default function NotificationScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark  pt-2">

            {/* Header */}
            <PageTitle text="Notification" leftIcon leftOnPress={() => router.back()} />

            <View className="border-b border-gray-200 my-5" />

            {/* Notification List */}
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View className="flex-row items-center bg-[#F4F4F4] rounded-full dark:bg-cardDark p-4 mb-3 mx-5">

                        {/* Icon Bubble */}
                        <View
                            className="size-20 rounded-full items-center justify-center mr-4"
                            style={{ backgroundColor: item.color }}
                        >
                            <RenderIcon title={item.title} size={24} color={item.textColor} />
                        </View>

                        {/* Text Info */}
                        <View className="flex-1">
                            <Text className="text-body font-semibold text-text dark:text-textDark">
                                {item.title}
                            </Text>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {item.message}
                            </Text>
                            <Text className="text-caption text-secondary dark:text-secondaryDark mt-1">
                                {item.date}
                            </Text>
                        </View>

                    </View>
                )}
            />
        </SafeAreaView>
    );
}
