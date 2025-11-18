import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TenantHomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark pt-12">
            <StatusBar barStyle={"dark-content"} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >

                {/* Header */}
                <View className="px-5 mb-4 flex-row items-center justify-between">
                    <Text className="text-title font-bold text-text dark:text-textDark">Home</Text>
                    <TouchableOpacity onPress={() => router.push("/(tenant)/notification")}>
                        <Octicons name="bell-fill" size={24} color="#A1A1A1" />
                    </TouchableOpacity>
                </View>

                {/* Property Card */}
                <View className="bg-card dark:bg-cardDark rounded-2xl mx-5 mb-5 overflow-hidden border border-gray-200 dark:border-gray-800">
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80" }}
                        className="w-full h-56"
                    />

                    <View className="p-4">
                        <View className="flex-row justify-between items-start mb-2">
                            <View className="flex-1 pr-4">
                                <Text className="text-body font-semibold text-text dark:text-textDark">
                                    The Minimalist
                                </Text>
                                <Text className="text-caption text-secondary dark:text-secondaryDark">
                                    Brooklyn, New York
                                </Text>
                            </View>

                            <Text className="text-body font-semibold text-text dark:text-textDark">
                                SAR 45,000<Text className="text-caption">/month</Text>
                            </Text>
                        </View>

                        {/* Badges */}
                        <View className="flex-row flex-wrap gap-2 mb-3">
                            <Badge icon="people-outline" label="6 Guest" />
                            <Badge icon="bed-outline" label="3 Bedrooms" />
                            <Badge icon="car-outline" label="2 Baths" />
                        </View>

                        {/* Rating */}
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="star" size={16} color="#FACC15" />
                            <Text className="ml-1 text-small text-text dark:text-textDark">4.9</Text>
                            <Text className="text-caption text-secondary ml-1">(465 Reviews)</Text>
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
                            <TouchableOpacity>
                                <Ionicons name="call-outline" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Information */}
                        <Text className="text-body font-semibold text-text dark:text-textDark mb-2">Information</Text>

                        <InfoRow label="Next Payment" value="10/14/2025" />
                        <InfoRow label="Payment Term" value="Monthly" />
                        <InfoRow label="Lease Duration" value="12 months" />
                        <InfoRow label="Size" value="150m^2" />

                    </View>
                </View>

                {/* Services */}
                <View className="bg-card dark:bg-cardDark mx-5 rounded-2xl p-3 border border-gray-200 dark:border-gray-800">
                    <Text className="text-body font-semibold text-text dark:text-textDark mb-3">Services</Text>
                    <View className=" flex-row justify-between mb-6">
                        <ServiceCard icon="receipt-outline" label="Pay Rent" />
                        <ServiceCard icon="settings-outline" label="Service" onPress={() => router.push("/(tenant)/service-request")} />
                        <ServiceCard icon="document-text-outline" label="Lease" onPress={() => router.push("/(tenant)/lease-documents")} />
                    </View>
                </View>

                {/* Pending Tasks */}
                <View className="bg-card dark:bg-cardDark mx-5 rounded-2xl p-3 border border-gray-200 dark:border-gray-800 mt-5">
                    <Text className="text-body font-semibold text-text dark:text-textDark px-5 mb-3">
                        Pending Tasks
                    </Text>

                    <PendingTask title="AC" progress="In Progress" />
                    <PendingTask title="General" progress="Pending"/>
                    <PendingTask title="General" progress="Complete"/>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

/* Components */

function Badge({ icon, label }: any) {
    return (
        <View className="flex-row items-center border bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            <Ionicons name={icon} size={14} color="#6B7280" />
            <Text className="ml-1 text-caption text-secondary dark:text-secondaryDark">{label}</Text>
        </View>
    );
}

function InfoRow({ label, value }: any) {
    return (
        <View className="mb-1 flex-row gap-2 items-center">
            <Text className="text-caption font-semibold text-gray-400 dark:text-gray-700">{label}</Text>
            <Text className="text-small font-medium text-text dark:text-textDark">{value}</Text>
        </View>
    );
}

function ServiceCard({ icon, label, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress} className="w-[30%] bg-[#E5E5E5]  rounded-xl items-center overflow-hidden pt-5 border border-gray-200 dark:border-gray-800">
            <Ionicons name={icon} size={36} color="#000" />
            <View className="w-full mt-3 py-1 bg-black items-center justify-center">
                <Text className=" text-small font-medium text-textDark dark:text-text">{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

function PendingTask({ title, progress }: any) {
    return (
        <View className="px-5 mb-3 flex-row items-center justify-between">
            <View>
                <Text className="text-body font-bold text-text dark:text-textDark">{title}</Text>
            <Text className="text-small text-gray-400 font-semibold">{progress}</Text>
            </View>
            <TouchableOpacity className="px-4 py-1 rounded-full border border-gray-300 dark:border-gray-700">
                <Text className="text-small text-text dark:text-textDark">View</Text>
            </TouchableOpacity>
        </View>
    );
}
