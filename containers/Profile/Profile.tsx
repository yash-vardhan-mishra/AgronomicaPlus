import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/molecules/Header';
import { Pressable, ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import { useProfile } from '../../contexts/ProfileProvider';
import CustomButton from '../../components/molecules/CustomButton';
import CustomTextBoxWithTitle from '../../components/molecules/CustomTextBoxWithTitle';
import styles from './Profile.styles';
import { useAuth } from '../../contexts/AuthContext';
import CustomText from '../../components/atoms/CustomText/CustomText';
import Colors from '../../constants/Colors';

type ProfileNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'Profile'>; // Define the type for navigation

interface ProfileProps {
    navigation: ProfileNavigationProp;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    const { profile } = useProfile();
    const { logout } = useAuth();
    console.log('profile in profile screen', profile);

    // Provide default values if profile is null
    const employeeFirstName = profile?.employeeFirstName || '';
    const employeeLastName = profile?.employeeLastName || '';
    const contactNumber = profile?.contactNumber || '';
    const employeeRole = profile?.employeeRole || '';
    const farmerName = profile?.farmerName || '';
    const fieldType = profile?.fieldType || '';
    const farmerContactNumber = profile?.farmerContactNumber || '';

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Profile" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <CustomTextBoxWithTitle title='Your First Name' editable={false} value={employeeFirstName} />
                    <CustomTextBoxWithTitle title='Your Last Name' editable={false} value={employeeLastName} />
                    <CustomTextBoxWithTitle title='Your Contact Number' editable={false} value={contactNumber} />
                    <CustomTextBoxWithTitle title='Your Role' editable={false} value={employeeRole} />
                    <CustomTextBoxWithTitle title="Employer's Name" editable={false} value={farmerName} />
                    <CustomTextBoxWithTitle title="Your assigned Field Type" editable={false} value={fieldType} />
                    <CustomTextBoxWithTitle title="Employer's Contact Number" editable={false} value={farmerContactNumber} />
                </View>
                <Pressable onPress={() => logout()} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <CustomText color={Colors.tintColor} weight='700' size={18}>
                        Log Out
                    </CustomText>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
