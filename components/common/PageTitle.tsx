import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function PageTitle({
  text,
  leftIcon,
  rightIcon,
  leftOnPress
}: {
  text: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
    leftOnPress?: () => void
}) {
  const color = useColorScheme()
  const isDark = color === "dark"
  return (
    <View className="flex-row items-center w-full px-4 py-5">

      {/* Left icon slot */}
      <TouchableOpacity onPress={leftOnPress} className="w-6">
        {leftIcon && <Feather name="arrow-left" size={24} color={isDark ? "white" : "black"} />}
      </TouchableOpacity>

      {/* Title centered with flex-1 */}
      <Text className="flex-1 text-center text-title text-text dark:text-textDark">
        {text}
      </Text>

      {/* Right slot placeholder */}
      <View className="w-6">
        {rightIcon && <Feather name="bell" size={24} color="black" />}
      </View>

    </View>
  );
}
