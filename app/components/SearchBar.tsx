import { View, TextInput, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export function SearchBar() {
    return (
        <View className="flex-row items-center px-4 py-2">
            <View className="flex-1 flex-row items-center bg-gray-50 rounded-full px-4 py-2">
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M21 21l-4.35-4.35M11 6a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
                <TextInput
                    placeholder="Search something"
                    className="flex-1 ml-2 text-gray-900"
                />
            </View>
            <TouchableOpacity className="ml-2">
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M4 18h16M4 12h16M4 6h16"
                        stroke="#111827"
                        strokeWidth={2}
                        strokeLinecap="round"
                    />
                </Svg>
            </TouchableOpacity>
        </View>
    );
} 