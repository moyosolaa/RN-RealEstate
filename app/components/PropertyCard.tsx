import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Property } from "../types/property";

interface PropertyCardProps extends Omit<Property, "id"> {
  featured?: boolean;
}

export function PropertyCard({
  title,
  location,
  price,
  image,
  rating,
  featured = false,
}: PropertyCardProps) {
  if (featured) {
    return (
      <TouchableOpacity className="mr-4">
        <View className="relative w-[200px] h-[280px] rounded-3xl overflow-hidden">
          <Image source={image} className="w-full h-full" resizeMode="cover" />

          {/* Rating badge */}
          {rating && (
            <View className="absolute top-3 right-3 flex-row items-center bg-white px-2 py-1 rounded-full">
              <AntDesign
                name="star"
                size={15}
                color="orange"
                className="mr-1"
              />
              <Text className="text-[#246BFD] font-bold text-sm">{rating}</Text>
            </View>
          )}

          {/* Gradient overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={StyleSheet.absoluteFill}
            locations={[0.4, 1]}
          />

          {/* Content overlay */}
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-white text-2xl font-bold">{title}</Text>
            <Text className="text-white/80 text-lg">{location}</Text>
            <View className="mt-2">
              <Text className="text-white text-xl font-bold">${price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity>
      <View className="relative rounded-3xl overflow-hidden">
        <Image source={image} className="w-full h-[140px]" resizeMode="cover" />

        {/* Rating badge */}
        {rating && (
          <View className="absolute top-3 right-3 flex-row items-center bg-white px-2 py-1 rounded-full">
            <AntDesign name="star" size={15} color="orange" className="mr-1" />
            <Text className="text-[#246BFD] font-bold text-sm">{rating}</Text>
          </View>
        )}

        <View className="p-3 bg-white">
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-gray-500">{location}</Text>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-[#246BFD] text-lg font-bold">${price}</Text>
            <TouchableOpacity>
              <View className="w-8 h-8 items-center justify-center">
                <AntDesign name="hearto" size={16} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
