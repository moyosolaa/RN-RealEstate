import { ScrollView } from "react-native";
import { Chip } from "./Chip";
import { CATEGORIES } from "../constants/properties";

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryPress: (category: string) => void;
}

export function CategoryFilter({
    selectedCategory,
    onCategoryPress,
}: CategoryFilterProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 my-6"
        >
            {CATEGORIES?.map((category) => (
                <Chip
                    key={category.category}
                    label={category.title}
                    isSelected={category.category === selectedCategory}
                    className="mr-2"
                    onPress={() => onCategoryPress(category.category)}
                />
            ))}
        </ScrollView>
    );
} 