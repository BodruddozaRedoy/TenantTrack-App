import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import { onboarding } from "@/constants/data.constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";

interface OnboardingContent {
    id: number;
    title: string;
    subtitle: string;
    image: number;
    description: string;
}

export default function OnboardingScreen() {
    const { role } = useLocalSearchParams<{ role: string }>();
    const [selectedId, setSelectedId] = useState(1);
    const [onboardingContent, setOnboardingContent] =
        useState<OnboardingContent>();
    const { t } = useTranslation();

    const dataMap: Record<string, OnboardingContent[]> = {
        prospective: onboarding.prospectiveTenant,
        tenant: onboarding.tenant,
        landlord: onboarding.landlord,
        agent: onboarding.agent,
    };

    const list = dataMap[role ?? "prospective"];
    const maxId = list.length;

    // Load slide content
    useEffect(() => {
        const current = list.find((item) => item.id === selectedId);
        setOnboardingContent(current);
    }, [selectedId, list]);

    // 🔹 NEXT button logic (prevent going past last)
    const handleNext = () => {
        setSelectedId((prev) => {
            if (prev < maxId) return prev + 1;
            return prev; // stay at last slide
        });
    };

    // 🔹 BACK button logic (prevent going below 1)
    const handleBack = () => {
        setSelectedId((prev) => {
            if (prev > 1) return prev - 1;
            return prev; // stay at first slide
        });
    };

    return (
        <ScrollView className="flex-1 bg-background dark:bg-backgroundDark">
            <View className="flex-1 min-h-screen px-6 py-10">

                {/* Back Button */}
                <PageTitle text="" leftIcon leftOnPress={() => router.back()} />

                {/* Center Card */}
                <View className="flex-1 justify-center">
                    <View className="bg-card dark:bg-cardDark rounded-2xl py-16 px-6 shadow-md 
                           border border-gray-200 dark:border-gray-700">

                        {/* Illustration */}
                        <View className="items-center mb-6">
                            {onboardingContent?.image && (
                                <Image
                                    source={onboardingContent.image}
                                    resizeMode="contain"
                                    className="size-[200px]"
                                />
                            )}
                        </View>

                        {/* Title */}
                        <Text className="text-title text-center text-text dark:text-textDark mb-2">
                            {onboardingContent?.title ? t(onboardingContent.title) : ""}
                        </Text>

                        {/* Subtitle */}
                        {onboardingContent?.subtitle?.length ? (
                            <Text className="text-subtitle text-center text-secondary dark:text-secondaryDark font-semibold mb-3">
                                {t(onboardingContent?.subtitle)}
                            </Text>
                        ) : null}

                        {/* Description */}
                        <Text className="text-small text-center text-secondary dark:text-secondaryDark mb-6">
                            {onboardingContent?.description ? t(onboardingContent.description) : ""}
                        </Text>

                        {/* Pagination */}
                        <View className="flex-row justify-center items-center mb-6">
                            {[...Array(maxId)].map((_, i) => {
                                const page = i + 1;
                                const isActive = selectedId === page;

                                return (
                                    <View
                                        key={page}
                                        className={
                                            isActive
                                                ? "w-8 h-2 rounded-full bg-primary dark:bg-primaryDark mx-1"
                                                : "size-2 rounded-full bg-gray-300 dark:bg-gray-600 mx-1"
                                        }
                                    />
                                );
                            })}
                        </View>

                        {/* Buttons */}
                        <View className="flex-row justify-between items-center gap-4">

                            {/* BACK */}
                            {
                                selectedId !== maxId && <View className="flex-1">
                                    <SecondaryButton
                                        title={t("back")}
                                        disabled={selectedId === 1}
                                        onPress={handleBack}
                                    />
                                </View>
                            }

                            {/* NEXT */}
                            <View className="flex-1">

                                {
                                    selectedId === maxId ? <PrimaryButton
                                        title={t("get_started")}
                                        onPress={() => router.push("/(auth)/register")}
                                    /> : <PrimaryButton
                                            title={t("next")}
                                        onPress={handleNext}
                                    />
                                }
                            </View>

                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}
