import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "../components/SearchBar";
import { PropertyCard } from "../components/PropertyCard";
import { Chip } from "../components/Chip";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList, RootStackParamList } from "../types/navigation";

import {
  CATEGORIES,
  FEATURED_PROPERTIES,
  RECOMMENDED_PROPERTIES,
} from "../constants/properties";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {/* <StatusBar barStyle="dark-content" /> */}
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-2 mb-2">
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/images/pp.png")}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-gray-500">Good Morning</Text>
              <Text className="text-lg font-semibold">Adrian Hajdin</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <MaterialCommunityIcons
                name="bell-badge-outline"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <SearchBar />

        {/* Featured Section */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold">Featured</Text>
            <TouchableOpacity>
              <Text className="text-purple-500 font-bold">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {FEATURED_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} {...property} featured />
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 mt-6"
        >
          {CATEGORIES.map((category, index) => (
            <Chip
              key={category}
              label={category}
              isSelected={index === 0}
              className="mr-2"
            />
          ))}
        </ScrollView>

        {/* Recommended Section */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Our Recommendation</Text>
            <TouchableOpacity>
              <Text className="text-purple-500 font-bold">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap -mx-2">
            {RECOMMENDED_PROPERTIES.map((property) => (
              <View key={property.id} className="w-1/2 px-2 mb-4">
                <PropertyCard {...property} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
