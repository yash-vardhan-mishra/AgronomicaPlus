import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../containers/Home/Home';
import Profile from '../containers/Profile/Profile';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export type HomeTabParamList = {
    Home: undefined;
    Profile: undefined;
};

export default function HomeTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home'; // Icon for Home tab
                    } else if (route.name === 'Profile') {
                        iconName = 'user'; // Icon for Profile tab
                    }

                    // You can return any component that renders an icon from your library
                    return <AntDesign name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'white', // Active tab color
                tabBarInactiveTintColor: 'rgba(255,255,255,0.47)',  // Inactive tab color
                tabBarStyle: { backgroundColor: Colors.tintColor }
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}