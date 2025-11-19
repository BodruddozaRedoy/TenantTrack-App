import { clsx } from "clsx";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface SecondaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function SecondaryButton({
  title,
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={clsx(
        "py-4 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-cardDark w-full",
        className
      )}
    >
      <Text className="text-center text-text dark:text-textDark font-medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
