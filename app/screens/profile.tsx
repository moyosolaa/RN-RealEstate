import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList, RootStackParamList } from "../types/navigation";

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, "Profile">,
    NativeStackScreenProps<RootStackParamList>
>;

const MENU_ITEMS = [
    {
        icon: "calendar-blank-outline",
        label: "My Booking",
    },
    {
        icon: "credit-card-outline",
        label: "Payments",
    },
    {
        icon: "account-outline",
        label: "Profile",
    },
    {
        icon: "bell-outline",
        label: "Notification",
    },
    {
        icon: "shield-outline",
        label: "Security",
    },
    {
        icon: "translate",
        label: "Language",
    },
    {
        icon: "help-circle-outline",
        label: "Help Center",
    },
    {
        icon: "account-multiple-outline",
        label: "Invite Friends",
    },
];

export default function ProfileScreen({ navigation }: Props) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                {/* Header */}
                <View className="flex-row justify-between items-center px-4 py-2">
                    <Text className="text-2xl font-bold">Profile</Text>
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

                {/* Profile Info */}
                <View className="items-center mt-6">
                    <View className="relative">
                        <Image
                            source={require("../../assets/images/pp.png")}
                            className="w-24 h-24 rounded-full"
                        />
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-[#8B5DFF] w-8 h-8 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="pencil" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl font-bold mt-4">Adrian Hajdin</Text>
                </View>

                {/* Menu Items */}
                <View className="px-4 mt-8">
                    {MENU_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={item.label}
                            className={`flex-row items-center py-4 ${index !== MENU_ITEMS.length - 1
                                    ? "border-b border-gray-100"
                                    : ""
                                }`}
                        >
                            <MaterialCommunityIcons
                                name={item.icon as any}
                                size={24}
                                color="black"
                            />
                            <Text className="flex-1 text-base ml-4">{item.label}</Text>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={24}
                                color="#9CA3AF"
                            />
                        </TouchableOpacity>
                    ))}

                    {/* Logout Button */}
                    <TouchableOpacity className="flex-row items-center py-4 mt-4">
                        <MaterialCommunityIcons name="logout" size={24} color="#FF4747" />
                        <Text className="flex-1 text-base ml-4 text-[#FF4747]">Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
