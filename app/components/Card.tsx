import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Heart } from './Icons';

interface CardProps {
    title: string;
    price: string;
    image: string;
    location: string;
    isFavorite?: boolean;
    onFavorite?: () => void;
    onPress?: () => void;
}

export function Card({
    title,
    price,
    image,
    location,
    isFavorite,
    onFavorite,
    onPress
}: CardProps) {
    return (
        <TouchableOpacity
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
            onPress={onPress}
        >
            <Image
                source={{ uri: image }}
                className="w-full h-48 rounded-t-2xl"
            />
            <TouchableOpacity
                className="absolute top-2 right-2 p-2"
                onPress={onFavorite}
            >
                <Heart filled={isFavorite} />
            </TouchableOpacity>

            <View className="p-4">
                <Text className="text-lg font-semibold">{title}</Text>
                <Text className="text-gray-500 text-sm">{location}</Text>
                <Text className="text-purple-500 font-bold mt-2">${price}</Text>
            </View>
        </TouchableOpacity>
    );
} 