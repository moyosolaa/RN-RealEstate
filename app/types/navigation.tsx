import { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
    Onboarding: undefined;
    Main: { screen: keyof TabParamList };
    PropertyDetails: { propertyId: string };
}; 