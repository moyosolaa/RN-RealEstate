import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FACILITY_ICONS: Record<string, string> = {
  SwimmingPool: "pool",
  Gym: "weight-lifter",
  Cutlery: "spoon-sugar",
  Restaurant: "silverware-fork-knife",
  Wifi: "wifi",
  PetCenter: "paw",
  Parking: "car",
  SportsCenter: "basketball",
  Laundry: "washing-machine",
};

interface FacilitiesProps {
  facilities: string[];
}

export function Facilities({ facilities }: FacilitiesProps) {
  return (
    <View className="mt-6">
      <Text className="text-xl font-bold mb-4">Facilities</Text>
      <View className="flex-row flex-wrap">
        {facilities.map((facility) => (
          <View key={facility} className="w-1/4 items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-[#8B5DFF]/10 items-center justify-center">
              <MaterialCommunityIcons
                name={FACILITY_ICONS[facility] as any}
                size={24}
                color="#8B5DFF"
              />
            </View>
            <Text className="text-sm text-gray-600 mt-2 text-center">
              {facility}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
