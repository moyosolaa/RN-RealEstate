import OnboardingScreen from "./app/screens/onboarding";
import HomeScreen from "./app/screens/home";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, TabParamList } from "./app/types/navigation";
import { TabNavigator } from "./app/navigation/TabNavigator";
import PropertyDetails from "./app/screens/PropertyDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
