import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, View } from 'react-native';

export default function PageTitle({
  text,
  leftIcon,
  rightIcon
}: {
  text: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
}) {
  return (
      <View className="flex-row items-center w-full px-5 py-5">
      
      {/* Left icon slot */}
      <View className="w-6">
        {leftIcon && <Feather name="arrow-left" size={24} color="black" />}
      </View>

      {/* Title centered with flex-1 */}
          <Text className="flex-1 text-center text-title">
        {text}
      </Text>

      {/* Right slot placeholder */}
      <View className="w-6">
        {rightIcon && <Feather name="bell" size={24} color="black" />}
      </View>

    </View>
  );
}
