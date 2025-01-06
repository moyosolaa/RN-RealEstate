import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PropertyAgentProps {
  name: string;
  email: string;
  avatar: string;
  onMessage?: () => void;
  onCall?: () => void;
}

export function PropertyAgent({
  name,
  email,
  avatar,
  onMessage,
  onCall,
}: PropertyAgentProps) {
  const getImageSource = (imageUrl: string | undefined) => {
    if (!imageUrl) {
      return require("../../assets/icon.png");
    }
    if (typeof imageUrl === "string" && imageUrl.startsWith("http")) {
      return { uri: imageUrl };
    }
    return imageUrl;
  };
  return (
    <View className="mt-6">
      <Text className="text-xl font-bold mb-4">Agent</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={getImageSource(avatar)}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-3">
            <Text className="text-lg font-semibold">{name}</Text>
            <Text className="text-gray-500">{email}</Text>
          </View>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            onPress={onMessage}
            className="w-10 h-10 rounded-full items-center justify-center mr-2"
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#8B5DFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCall}
            className="w-10 h-10 rounded-full items-center justify-center"
          >
            <Ionicons name="call-outline" size={24} color="#8B5DFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
