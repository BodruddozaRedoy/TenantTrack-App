import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function BottomButtonsFixed({ firstButtonText, secondButtonText, firstButtonOnPress, secondButtonOnPress }: { firstButtonText?: string, secondButtonText?: string, firstButtonOnPress?: () => void, secondButtonOnPress?: () => void }) {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ paddingBottom: insets.bottom || 16 }} className="absolute left-0 right-0 bottom-0 bg-background dark:bg-backgroundDark px-5 pb-10 pt-3">
            <View>
                <View className="flex-row gap-3">
                    {
                        firstButtonText && <TouchableOpacity onPress={firstButtonOnPress} className="flex-1 py-4 border border-gray-300 dark:border-gray-600 rounded-full mr-4 bg-white dark:bg-cardDark">
                            <Text className="text-center text-text dark:text-textDark font-medium">
                                {firstButtonText}
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        secondButtonText && <TouchableOpacity onPress={secondButtonOnPress} className="flex-1 py-4 rounded-full bg-primary dark:bg-primaryDark">
                            <Text className="text-center text-textDark dark:text-text font-semibold">
                                {secondButtonText}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}