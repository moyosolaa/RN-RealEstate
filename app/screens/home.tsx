import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
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
import { useLocalSearchParams } from "expo-router";
import { getLatestProperties, getProperties } from "../lib/appwrite";
import { useAppwrite } from "../lib/useAppwrite";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../constants/properties";
import seed from "../lib/seed";
import { PropertyList } from "../components/PropertyList";
import { CategoryFilter } from "../components/CategoryFilter";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES[0].category
  );

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: selectedCategory,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: selectedCategory,
      query: params.query!,
      limit: 6,
    });
  }, [selectedCategory, params.query]);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}

        {/* <TouchableOpacity
          onPress={() => seed()}
          className="items-center justify-center mt-15 py-5 bg-red-400"
        >
          <Text>Seed </Text>
        </TouchableOpacity> */}
        <View className="flex-row items-center justify-between px-4 py-2 mb-2">
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/images/pp.png")}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-gray-500">Good Morning</Text>
              <Text className="text-lg font-semibold">Yosola Adekanmbi</Text>
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
            {loading ? (
              <ActivityIndicator
                className="justify-center items-center"
                size="small"
                color="#8B5DFF"
              />
            ) : latestProperties && latestProperties.length > 0 ? (
              latestProperties.map((property) => (
                <PropertyCard key={property.id} {...property} featured />
              ))
            ) : (
              <Text>No properties available</Text>
            )}
          </ScrollView>
        </View>

        {/* Recommended Section */}
        <View className="mt-6 px-4 bg-gray-100 py-5 rounded-t-3xl">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold">Our Recommendation</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
              <Text className="text-purple-500 font-bold">See All</Text>
            </TouchableOpacity>
          </View>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryPress={handleCategoryPress}
          />

          <PropertyList
            loading={loading}
            properties={properties || []}
            onSeeAllPress={() => navigation.navigate("Explore")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
