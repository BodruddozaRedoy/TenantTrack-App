import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { clsx } from "clsx";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function PrimaryButton({
  title,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={clsx(
        "w-full py-4 rounded-full bg-primary dark:bg-primaryDark",
        className
      )}
    >
      <Text className="text-center text-textDark dark:text-text font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
