import { View, Text, ActivityIndicator } from "react-native";

export function LoadingOverlay() {
  return (
    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
      <Text className="text-black">Loading...</Text>
      <ActivityIndicator size="large" color="#8B5DFF" />
    </View>
  );
}
