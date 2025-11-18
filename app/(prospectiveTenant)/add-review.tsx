import BottomButtonsFixed from "@/components/common/BottomButtonsFixed";
import PageTitle from "@/components/common/PageTitle";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddReviewScreen() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const handlePickImage = async () => {
        // ⚠ Optional: integrate expo-image-picker
        // const result = await ImagePicker.launchImageLibraryAsync();
        // if (!result.canceled) setImage(result.assets[0].uri);
    };

    const handleSubmit = () => {
        if (!rating) return alert("Please select your rating");
        if (!review.trim()) return alert("Please write your feedback");

        console.log({
            rating,
            review,
            image,
        });

        router.back(); // go back after submit
    };

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* Header */}
            <PageTitle text="Add Review" leftIcon={true} leftOnPress={() => router.back()} />
            <View className="border-b border-gray-200 dark:border-gray-700" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
            >
                {/* Stars */}
                <View className="flex-row justify-center mt-3 mb-6">
                    {Array.from({ length: 5 }).map((_, index) => {
                        const filled = index < rating;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setRating(index + 1)}
                                className="mx-1"
                            >
                                <Ionicons
                                    name={filled ? "star" : "star-outline"}
                                    size={32}
                                    color={filled ? "#FACC15" : "#D4D4D4"}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Review Text */}
                <TextInput
                    value={review}
                    onChangeText={setReview}
                    multiline
                    textAlignVertical="top"
                    placeholder="Tell us more..."
                    placeholderTextColor="#A3A3A3"
                    className="min-h-[130px] p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-text dark:text-textDark mb-6"
                />

                {/* Add Image Box */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePickImage}
                    className="border border-gray-300 dark:border-gray-700 rounded-xl min-h-[130px] items-center justify-center"
                >
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            className="w-full h-full rounded-xl"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="items-center">
                            <Ionicons name="add" size={28} color="#A3A3A3" />
                            <Text className="text-secondary mt-1 dark:text-secondaryDark">
                                Add Image
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </ScrollView>

            {/* Submit Button */}
            <BottomButtonsFixed secondButtonOnPress={handleSubmit} secondButtonText="Submit" />
        </SafeAreaView>
    );
}
