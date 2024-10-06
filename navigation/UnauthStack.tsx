import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Auth from "../containers/Auth/Auth";
import OtpVerification from "../containers/Auth/OtpVerification";
import ChangePassword from "../containers/Auth/ChangePassword";

const UnauthStack = createNativeStackNavigator();

export type UnauthStackParamList = {
  Auth: undefined; // No params for this route
  OtpVerification: { email: string; newPassword?: string; }; // Accept email as a param
  ChangePassword: { email: string }; // Accept email as a param
};

export type AuthScreenNavigationProp = NativeStackNavigationProp<UnauthStackParamList, 'OtpVerification'>;

export default () => {
  return (
    <UnauthStack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <UnauthStack.Screen name="Auth" component={Auth} />
      <UnauthStack.Screen name="OtpVerification" component={OtpVerification} />
      <UnauthStack.Screen name="ChangePassword" component={ChangePassword} />
    </UnauthStack.Navigator>
  );
};
