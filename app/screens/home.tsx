import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
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
import seed from "../lib/seed";

import {
  CATEGORIES,
  FEATURED_PROPERTIES,
  RECOMMENDED_PROPERTIES,
} from "../constants/properties";
import { getLatestProperties, getProperties } from "../lib/appwrite";
import { useAppwrite } from "../lib/useAppwrite";
import { useEffect } from "react";
import { LoadingOverlay } from "../components/LoadingOverlay";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

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
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {/* <StatusBar barStyle="dark-content" /> */}
      <ScrollView className="flex-1">
        {/* Header */}

        {/* <TouchableOpacity
          onPress={seed}
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
        <View className="mt-6 px-4 bg-gray-100 py-5 rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Our Recommendation</Text>
            <TouchableOpacity>
              <Text className="text-purple-500 font-bold">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {loading ? (
              <ActivityIndicator
                className="justify-center items-center"
                size="small"
                color="#8B5DFF"
              />
            ) : properties && properties.length > 0 ? (
              properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))
            ) : (
              <Text>No properties available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
