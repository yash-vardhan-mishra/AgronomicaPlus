import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Home.styles';
import Header from '../../components/molecules/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLoading } from '../../contexts/LoadingContext';
import { useProfile } from '../../contexts/ProfileProvider';
import { clockIn, clockOut } from '../../services/profile';
import { useAuth } from '../../contexts/AuthContext'; // Import auth context to get the token
import { showError } from '../../components/molecules/OtpTextInput/utils';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';

// Define the navigation type for Home screen
type HomeNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'HomeTab'>;

interface HomeProps {
    navigation: HomeNavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const { location, getLocation } = useProfile();  // Get location and location fetching method from Profile context
    const { setLoading } = useLoading();  // Get loading state setter from Loading context
    const { authToken } = useAuth(); // Get auth token from Auth context

    const handlePunch = async (type: 'In' | 'Out') => {
        setLoading(true);  // Set loading state to true while fetching location and making API call
        try {
            // Fetch the latest location data before proceeding with Punch
            await getLocation();

            if (!location.latitude || !location.longitude) {
                throw new Error('Location permission not provided');
            }

            // API call to Punch In or Out based on type
            let response;
            if (type === 'In') {
                response = await clockIn(location.latitude, location.longitude, authToken);
            } else {
                response = await clockOut(location.latitude, location.longitude, authToken);
            }

            // Handle success response
            console.log(`Successfully punched ${type} at location:`, location);
            Alert.alert('Success', `You have successfully punched ${type}.`);
        } catch (error) {
            // Handle errors and show error message
            showError(error)
        } finally {
            // Stop the loading state after the operation
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home" rightIcon="calendar-outline" onRightIconPress={() => navigation.navigate('Timesheets')} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingHorizontal: 64 }}>
                <View style={{ alignItems: 'center' }}>
                    <Pressable
                        onPress={() => handlePunch('In')}
                        style={{
                            borderRadius: 180,
                            borderColor: 'black',
                            borderWidth: 1,
                            height: 64,
                            width: 64,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialCommunityIcons name="clock-in" size={36} color="black" />
                    </Pressable>
                    <Text style={{ marginTop: 8 }}>Punch-In</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Pressable
                        onPress={() => handlePunch('Out')}
                        style={{
                            borderRadius: 180,
                            borderColor: 'black',
                            borderWidth: 1,
                            height: 64,
                            width: 64,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialCommunityIcons name="clock-out" size={36} color="black" />
                    </Pressable>
                    <Text style={{ marginTop: 8 }}>Punch-Out</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;
