import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import Timesheets from '../containers/Timesheets/Timesheets';

const AuthStack = createNativeStackNavigator();

export type AuthStackParamList = {
  HomeTab: undefined;
  Timesheets: undefined;
};

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="HomeTab" component={HomeTab} />
      <AuthStack.Screen name="Timesheets" component={Timesheets} />
    </AuthStack.Navigator>
  );
}
