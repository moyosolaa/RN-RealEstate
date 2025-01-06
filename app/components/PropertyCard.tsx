import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Models } from "react-native-appwrite";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

interface PropertyCardProps extends Omit<Models.Document, "id"> {
  featured?: boolean;
  $id: string;
}

export function PropertyCard({
  $id,
  name,
  address,
  price,
  image,
  rating,
  featured = false,
}: PropertyCardProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    console.log("Navigating to property:", $id);
    navigation.navigate("PropertyDetails", { propertyId: $id });
  };

  // Function to handle image requirement
  const getImageSource = (imageUrl: string | undefined) => {
    if (!imageUrl) {
      return require("../../assets/icon.png");
    }
    if (typeof imageUrl === "string" && imageUrl.startsWith("http")) {
      return { uri: imageUrl };
    }
    return imageUrl;
  };

  if (featured) {
    return (
      <TouchableOpacity className="mr-4" onPress={handlePress}>
        <View className="relative w-[200px] h-[280px] rounded-3xl overflow-hidden">
          <Image
            source={getImageSource(image)}
            className="w-full h-full"
            resizeMode="cover"
          />

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
            <Text className="text-white text-2xl font-bold">{name}</Text>
            <Text className="text-white/80 text-lg">{address}</Text>
            <View className="mt-2">
              <Text className="text-white text-xl font-bold">${price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity className="mb-3" onPress={handlePress}>
      <View className="p-2 bg-white rounded-2xl shadow-md">
        <View className="relative rounded-xl overflow-hidden">
          <Image
            source={getImageSource(image)}
            className="w-full h-[140px]"
            resizeMode="cover"
          />

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

          <View className="p-3 bg-white">
            <Text className="text-lg font-bold">{name}</Text>
            <Text className="text-gray-500">{address}</Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-[#8B5DFF] text-lg font-bold">${price}</Text>
              <TouchableOpacity>
                <View className="w-8 h-8 items-center justify-center">
                  <AntDesign name="hearto" size={16} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
