import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { PropertyStats } from "../components/PropertyStats";
import { PropertyAgent } from "../components/PropertyAgent";
import { Facilities } from "../components/Facilities";
import { useAppwrite } from "../lib/useAppwrite";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { getPropertyById } from "../lib/appwrite";
import MapView, { Marker } from "react-native-maps";

type Props = NativeStackScreenProps<RootStackParamList, "PropertyDetails">;

export default function PropertyDetails({ route, navigation }: Props) {
  const { propertyId } = route.params;

  console.log("Property ID:", propertyId);

  const { data: property, loading } = useAppwrite({
    fn: getPropertyById,
    params: { propertyId },
  });

  if (loading || !property) {
    return <LoadingOverlay />;
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        {/* Header */}
        <View className="relative">
          <Image
            source={{ uri: property.image }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />
          <View className="absolute top-14 left-4 right-4 flex-row justify-between">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center"
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <View className="flex-row">
              <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center mr-2">
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center">
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          <Text className="text-3xl font-bold">{property.name}</Text>

          <View className="flex-row items-center mt-2">
            <View className="px-3 py-0.5 mr-3 rounded-lg bg-[#8B5DFF]/10 items-center justify-center">
              <Text className="text-[#8B5DFF] text-lg font-bold">
                {property.type}
              </Text>
            </View>
            <MaterialCommunityIcons name="star" size={20} color="orange" />
            <Text className="ml-1 text-[#666876] text-lg font-bold">
              {/* {property.rating} */}
              {property.rating} ({property.reviews.length} reviews)
            </Text>
          </View>

          <PropertyStats
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            area={property.area}
          />
          <View className="bg-gray-100 h-0.5 w-full mt-8 mb-2" />

          <PropertyAgent {...property.agent} />

          <View className="mt-6">
            <Text className="text-xl font-bold mb-2">Overview</Text>
            <Text className="text-gray-600 leading-6">
              {property.description}
            </Text>
          </View>

          <Facilities facilities={property.facilities} />

          {/* Gallery Section */}
          <View className="mt-6">
            <Text className="text-xl font-bold mb-4">Gallery</Text>
            {property.gallery && property.gallery.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                {property.gallery.map((image: any, index: number) => (
                  <View
                    key={index}
                    className="w-[150px] aspect-square mr-3"
                  >
                    <Image
                      source={getImageSource(image.image)}
                      className="w-full h-full rounded-xl"
                      resizeMode="cover"
                    />
                  </View>
                ))}
                {property.gallery.length > 3 && (
                  <TouchableOpacity
                    className="w-[150px] aspect-square bg-black/50 rounded-xl items-center justify-center"
                    onPress={() => {
                      /* Handle view all photos */
                    }}
                  >
                    <Text className="text-white text-xl font-bold">
                      {property.gallery.length - 3}+
                    </Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            ) : (
              <View className="h-[150px] bg-gray-100 rounded-xl items-center justify-center">
                <MaterialCommunityIcons
                  name="image-off"
                  size={32}
                  color="#666876"
                />
                <Text className="text-gray-500 mt-2">No images available</Text>
              </View>
            )}
          </View>

          {/* Location Section */}
          <View className="mt-6">
            <Text className="text-xl font-bold mb-4">Location</Text>
            <View className="flex-row items-center  mb-3">
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="#8B5DFF"
              />
              <Text className="ml-2 text-gray-600 flex-1">
                {property.address}
              </Text>
            </View>
            <View className="rounded-xl overflow-hidden">
              <MapView
                style={{ width: "100%", height: 200 }}
                initialRegion={{
                  latitude: parseFloat(property.geolocation.split(",")[0]),
                  longitude: parseFloat(property.geolocation.split(",")[1]),
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(property.geolocation.split(",")[0]),
                    longitude: parseFloat(property.geolocation.split(",")[1]),
                  }}
                />
              </MapView>
            </View>
          </View>

          {/* Reviews Section */}
          <View className="mt-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">
                {property.reviews.length} Reviews
              </Text>
              <TouchableOpacity>
                <Text className="text-purple-500 font-bold">See All</Text>
              </TouchableOpacity>
            </View>

            {property.reviews.slice(0, 1).map((review: any, index: number) => (
              <View key={index} className="bg-gray-50 p-4 rounded-xl">
                <View className="flex-row items-center mb-2">
                  <Image
                    source={require("../../assets/images/pp.png")}
                    className="w-10 h-10 rounded-full"
                  />
                  <View className="ml-3 flex-1">
                    <Text className="font-semibold">{review.name}</Text>
                    <Text className="text-gray-500 text-sm">Jan 1st, 2021</Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="star"
                      size={16}
                      color="orange"
                    />
                    <Text className="ml-1 font-bold">{review.rating}</Text>
                  </View>
                </View>
                <Text className="text-gray-600">{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Price and Booking */}
          <View className="mt-6 flex-row items-center justify-between py-4 border-t border-gray-200">
            <View>
              <Text className="text-gray-500">Price</Text>
              <Text className="text-2xl font-bold text-[#8B5DFF]">
                ${property.price}
              </Text>
            </View>
            <TouchableOpacity className="bg-[#8B5DFF] px-8 py-4 rounded-xl">
              <Text className="text-white font-bold">Booking Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Helper function for image sources
const getImageSource = (imageUrl: string | undefined) => {
  if (!imageUrl) {
    return require("../../assets/icon.png");
  }
  if (typeof imageUrl === "string" && imageUrl.startsWith("http")) {
    return { uri: imageUrl };
  }
  return imageUrl;
};
