import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { PropertyCard } from "./PropertyCard";

interface PropertyListProps {
  showSeeAll?: boolean;
  loading: boolean;
  properties: any[];
  onSeeAllPress?: () => void;
}

export function PropertyList({
  showSeeAll = true,
  loading,
  properties,
  onSeeAllPress,
}: PropertyListProps) {
  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-between">
        {loading ? (
          <View className="w-full items-center justify-center py-8">
            <ActivityIndicator size="large" color="#8B5DFF" />
          </View>
        ) : properties && properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.$id} {...property} />
          ))
        ) : (
          <View className="w-full items-center justify-center py-8">
            <Text className="text-gray-500">No properties available</Text>
          </View>
        )}
      </View>
    </View>
  );
}
