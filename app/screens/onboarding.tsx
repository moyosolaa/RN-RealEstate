import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types/navigation";
import React, { useEffect } from "react";
import { login } from "../lib/appwrite";
import { useGlobalContext } from "../lib/globalProvider";
import { LoadingOverlay } from "../components/LoadingOverlay";

const GRID_IMAGES = [
  require("../../assets/houses/house1.jpg"),
  require("../../assets/houses/house2.jpg"),
  require("../../assets/houses/house3.jpg"),
  require("../../assets/houses/house4.jpg"),
  require("../../assets/houses/house5.jpg"),
  require("../../assets/houses/house6.jpg"),
  require("../../assets/houses/house7.jpg"),
  require("../../assets/houses/house8.jpg"),
  require("../../assets/houses/house9.jpg"),
];

export default function OnboardingScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { refetch, loading, isLogged } = useGlobalContext();

  useEffect(() => {
    if (!loading && isLogged) {
      navigation.replace("Main", { screen: "Home" });
    }
  }, [loading, isLogged, navigation]);

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      navigation.navigate("Main", { screen: "Home" });
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1" edges={["right", "left", "top"]}>
        <View className="h-full justify-center">
          <View className="flex-row flex-wrap mx-3">
            {GRID_IMAGES.map((image, index) => (
              <View key={index} className={`w-1/3 p-2 h-40`}>
                <Image
                  source={image}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>

          <LinearGradient
            colors={["transparent", "#ffffff", "#ffffff"]}
            style={[
              StyleSheet.absoluteFill,
              {
                height: "60%",
                top: "40%",
              },
            ]}
            locations={[0, 0.3, 1]}
          />

          <View className="px-6 pt-8 pb-12 space-y-4">
            <Text className="text-gray-600 text-center text-lg">
              WELCOME TO REAL SCOUT
            </Text>

            <Text className="text-3xl font-bold text-center">
              Let's Get You Closer{"\n"}
              To <Text className="text-purple-500">Your Ideal Home</Text>
            </Text>

            <Text className="text-gray-600 text-center text-lg mt-2">
              Login to Real Scout with Google
            </Text>

            <Button
              label="Sign Up with Google"
              variant="outline"
              size="lg"
              className="mt-6 border-gray-200"
              onPress={handleLogin}
              icon={
                <Image
                  source={require("../../assets/icons/google.png")}
                  className="w-5 h-5 mr-2"
                />
              }
            />
          </View>
        </View>
      </SafeAreaView>

      {loading && <LoadingOverlay />}
    </View>
  );
}
