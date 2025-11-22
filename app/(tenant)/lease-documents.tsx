import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeaseDocumentsScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* <StatusBar barStyle={"dark-content"} /> */}

            {/* Header */}
            <PageTitle text="Lease Documents" />
            <View className="mb-4 border-b border-gray-200 dark:border-gray-700" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mx-5"
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {documentsList.map((doc, index) => (
                    <View
                        key={index}
                        className="bg-card dark:bg-cardDark p-4 rounded-2xl mb-6"
                    >
                        {/* Title + file size */}
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                {doc.title}
                            </Text>

                            <Text className="text-small text-text dark:text-textDark">
                                {doc.size}
                            </Text>
                        </View>

                        {/* Date */}
                        <Text className="text-small text-secondary dark:text-secondaryDark mb-4">
                            {doc.date}
                        </Text>

                        {/* Contact Person */}
                        <Text className="text-body font-semibold text-text dark:text-textDark mb-2">
                            Contact Person
                        </Text>

                        <View className="flex-row items-center mb-4">
                            <Image
                                source={{ uri: doc.personAvatar }}
                                className="w-10 h-10 rounded-full mr-3"
                            />

                            <View className="flex-1">
                                <View className="flex-row items-center">
                                    <Text className="text-small font-semibold text-text dark:text-textDark mr-1">
                                        {doc.personName}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="check-decagram"
                                        size={14}
                                        color="#3B82F6"
                                    />
                                </View>
                                <Text className="text-caption text-secondary dark:text-secondaryDark">
                                    {doc.personRole}
                                </Text>
                            </View>

                            <TouchableOpacity>
                                <Ionicons
                                    name="chatbubble-ellipses-outline"
                                    size={20}
                                    color={isDark ? "#fff" : "#000"}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* View / Download Buttons */}
                        <View className="flex-row justify-between items-center gap-3 mt-2">
                            <TouchableOpacity className="flex-1 bg-primary dark:bg-primaryDark py-3 rounded-full items-center">
                                <Text className="text-body text-background dark:text-backgroundDark font-semibold">
                                    View
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-1 border border-gray-400 dark:border-gray-600 py-3 rounded-full items-center">
                                <Text className="text-body text-secondary dark:text-secondaryDark font-semibold">
                                    Download
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const documentsList = [
    {
        title: "Lease Agreement",
        date: "11/1/2024",
        size: "2.4 MB",

        personName: "Steven Adams",
        personRole: "Property Owner",
        personAvatar: "https://i.pravatar.cc/150?img=12",
    },
    {
        title: "Lease Agreement",
        date: "11/1/2024",
        size: "2.4 MB",

        personName: "Steven Adams",
        personRole: "Property Owner",
        personAvatar: "https://i.pravatar.cc/150?img=12",
    },
];
