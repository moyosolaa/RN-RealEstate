import { View, TextInput, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function SearchBar() {
  return (
    <View className="px-4">
      <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 h-14">
        <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" />
        <TextInput
          placeholder="Search address, or near you"
          className="flex-1 ml-2 text-base"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color="#111827"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
