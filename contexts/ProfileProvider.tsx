import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as Location from 'expo-location';
import { useAuth } from './AuthContext';
import { showError } from '../components/molecules/OtpTextInput/utils';
import { getProfileInfo } from '../services/profile';

interface Profile {
    email: string;
    employeeFirstName: string;
    employeeLastName: string;
    employeeRole: string;
    contactNumber: string | null;
    farmerName: string | null;
    fieldName: string | null;
    fieldType: string | null;
    farmerContactNumber: string | null;
}

interface ProfileContextProps {
    profile: Profile | null;
    location: { latitude: number | null; longitude: number | null };
    fetchProfileData: () => void;
    getLocation: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
        latitude: null,
        longitude: null,
    });
    const { authToken } = useAuth();

    const fetchProfileData = async () => {
        if (!authToken) return null;
        try {
            const res = await getProfileInfo(authToken);
            setProfile(res.data);
        } catch (err) {
            showError(err);
        }
    };

    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Location permission not granted');
            }
    
            const locationData = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = locationData.coords;
            setLocation({ latitude, longitude });
        } catch (error) {
            showError('Unable to access location. Please provide location permissions.');
        }
    };

    useEffect(() => {
        fetchProfileData();
        getLocation();
    }, [authToken]);

    return (
        <ProfileContext.Provider value={{ profile, location, fetchProfileData, getLocation }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
