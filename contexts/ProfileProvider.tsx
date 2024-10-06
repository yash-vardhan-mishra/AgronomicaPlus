import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
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
    fetchProfileData: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const { authToken } = useAuth();

    const fetchProfileData = async () => {
        if (!authToken) return null;
        getProfileInfo(authToken).then((res) => {
            setProfile(res.data);
        }).catch((err) => {
            showError(err)
        });
    };

    useEffect(() => {
        fetchProfileData();
    }, [authToken]);

    return (
        <ProfileContext.Provider value={{ profile, fetchProfileData }}>
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
