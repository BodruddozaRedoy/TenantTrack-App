import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RentScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <StatusBar barStyle={"dark-content"} />
            {/* Header */}
            <PageTitle text="Pay Rent" />
            <View className="mb-5 border-b border-gray-200 dark:border-gray-700" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mx-5"
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Next Payment Card */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl mb-6">

                    {/* Property Title */}
                    <Text className="text-subtitle font-bold text-text dark:text-textDark">
                        Next Payment Due
                    </Text>

                    <View className="mt-5 flex-row justify-between items-center">
                        <View>
                            <Text className="text-body font-semibold text-text dark:text-textDark">
                                The Minimalist
                            </Text>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                Brooklyn, New York
                            </Text>
                        </View>

                        <Text className="mt-1 text-body font-semibold text-text dark:text-textDark">
                            SAR 45,000 <Text className="text-small text-gray-400">/month</Text>
                        </Text>
                    </View>

                    {/* Badges */}
                    <View className="flex-row flex-wrap gap-2 mb-3 mt-3">
                        <Badge icon="people-outline" label="6 Guest" />
                        <Badge icon="bed-outline" label="3 Bedrooms" />
                        <Badge icon="car-outline" label="2 Baths" />
                    </View>

                    {/* Rating */}
                    <View className="flex-row items-center mt-3">
                        <Ionicons
                            name="star"
                            size={16}
                            color={isDark ? "#FFD700" : "#FFD700"}
                        />
                        <Text className="ml-1 text-small text-secondary dark:text-secondaryDark">
                            4.9 (426 Reviews)
                        </Text>
                    </View>

                    {/* Contact Person */}
                    <Text className="text-body font-semibold text-text dark:text-textDark mb-2">
                        Contact Person
                    </Text>

                    <View className="flex-row items-center mb-4">
                        <Image source={{ uri: "https://i.pravatar.cc/150?img=12" }} className="w-10 h-10 rounded-full mr-3" />
                        <View className="flex-1">
                            <View className="flex-row items-center">
                                <Text className="text-small font-semibold text-text dark:text-textDark mr-1">Steven Adams</Text>
                                <MaterialCommunityIcons name="check-decagram" size={14} color="#3B82F6" />
                            </View>
                            <Text className="text-caption text-secondary dark:text-secondaryDark">Property Owner</Text>
                        </View>

                        <TouchableOpacity className="mr-3">
                            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Information */}
                    <View className="mt-6">
                        <Text className="text-body font-semibold text-text dark:text-textDark mb-2">Information</Text>
                        <Text className="mb-1 flex-row gap-2 items-center">
                            <Text className="font-semibold">Next Payment:</Text> 10/14/2025
                        </Text>
                        <Text className="mb-1 flex-row gap-2 items-center">
                            <Text className="font-semibold">Payment Term:</Text> Monthly
                        </Text>
                        <Text className="mb-1 flex-row gap-2 items-center">
                            <Text className="font-semibold">Lease Duration:</Text> 12 months
                        </Text>
                        <Text className="mb-1 flex-row gap-2 items-center">
                            <Text className="font-semibold">Size:</Text> 120 m²
                        </Text>
                    </View>

                    {/* Buttons */}
                    <View className="mt-4 gap-3">
                        <PrimaryButton title="Pay Rent" />
                        <SecondaryButton title="Upload Payment Receipt" />
                    </View>
                </View>

                {/* Payment History */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl">
                    <Text className="text-subtitle font-bold text-text dark:text-textDark mb-3">
                        Payment History
                    </Text>

                    {/** Example Items — you will map dynamically later */}
                    {historyList.map((item, index) => (
                        <View
                            key={index}
                            className="flex-row justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700"
                        >
                            <View>
                                <Text className="text-body font-semibold text-text dark:text-textDark">
                                    {item.month}
                                </Text>
                                <Text className="text-small text-secondary dark:text-secondaryDark">
                                    Paid on {item.paid}
                                </Text>
                            </View>

                            <TouchableOpacity className="bg-primary dark:bg-primaryDark px-3 py-1 rounded-full">
                                <Text className="text-small text-background dark:text-backgroundDark">
                                    Download
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Badge = ({ label, icon }: any) => (
    <View className="flex-row items-center border bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
        <Ionicons name={icon} size={14} color="#6B7280" />
        <Text className="ml-1 text-caption text-secondary dark:text-secondaryDark">{label}</Text>
    </View>
);

const historyList = [
    { month: "October 2025", paid: "10/10/2025" },
    { month: "September 2025", paid: "09/10/2025" },
    { month: "August 2025", paid: "08/10/2025" },
    { month: "August 2025", paid: "08/10/2025" },
    { month: "August 2025", paid: "08/10/2025" },
];
