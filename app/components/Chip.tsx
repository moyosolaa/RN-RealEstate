import { Text, TouchableOpacity } from "react-native";

interface ChipProps {
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
  className?: string;
}

export function Chip({
  label,
  isSelected,
  onPress,
  className = "",
}: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-5 py-2.5 rounded-full ${
        isSelected ? "bg-[#8B5DFF]" : "bg-white border border-gray-100"
      } ${className}`}
    >
      <Text
        className={`text-base font-medium ${
          isSelected ? "text-white" : "text-gray-900"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
