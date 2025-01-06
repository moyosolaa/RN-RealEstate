import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export function PropertyStats({
  bedrooms,
  bathrooms,
  area,
}: PropertyStatsProps) {
  return (
    <View className="flex-row justify-between items-center mt-4 mx-5">
      <View className="flex-row items-center">
        <View className="flex-row p-3 rounded-full bg-[#8B5DFF]/10 items-center justify-center">
          <MaterialCommunityIcons name="bed" size={24} color="#8B5DFF" />
        </View>
        <Text className="ml-2 text-gray-700 font-bold text-lg">
          {bedrooms} Beds
        </Text>
      </View>
      <View className="flex-row items-center">
        <View className="flex-row p-3 rounded-full bg-[#8B5DFF]/10 items-center justify-center">
          <MaterialCommunityIcons name="shower" size={24} color="#8B5DFF" />
        </View>
        <Text className="ml-2 text-gray-700 font-bold text-lg">
          {bathrooms} bath
        </Text>
      </View>
      <View className="flex-row items-center">
        <View className="flex-row p-3 rounded-full bg-[#8B5DFF]/10 items-center justify-center">
          <MaterialCommunityIcons
            name="ruler-square"
            size={24}
            color="#8B5DFF"
          />
        </View>
        <Text className="ml-2 text-gray-70 font-bold text-lg">{area} sqft</Text>
      </View>
    </View>
  );
}
