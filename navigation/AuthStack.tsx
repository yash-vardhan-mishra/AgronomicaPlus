import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from './HomeTab';

const AuthStack = createNativeStackNavigator();

export type AuthStackParamList = {
  HomeTab: undefined;
};

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="HomeTab" component={HomeTab} />
    </AuthStack.Navigator>
  );
}
