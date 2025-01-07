import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { PropertyList } from "../components/PropertyList";
import { useAppwrite } from "../lib/useAppwrite";
import { getProperties } from "../lib/appwrite";
import { useState } from "react";
import { CATEGORIES } from "../constants/properties";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList, RootStackParamList } from "../types/navigation";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Explore">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ExploreScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES[0].category
  );
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: selectedCategory,
      query: searchQuery,
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    refetch({
      filter: selectedCategory,
      query,
    });
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    refetch({
      filter: category,
      query: searchQuery,
    });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView>
        <View className="px-4 py-2">
          <Text className="text-2xl font-bold mb-2">Explore Properties</Text>
          <SearchBar />
        </View>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryPress={handleCategoryPress}
        />

        <View className="px-4">
          <Text className="text-xl mb-4 font-bold text-2xl">
            Found {properties?.length || 0} Properties
          </Text>

          <PropertyList
            loading={loading}
            properties={properties || []}
            showSeeAll={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
