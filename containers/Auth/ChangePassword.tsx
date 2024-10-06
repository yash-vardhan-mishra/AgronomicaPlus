import React, { useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Auth.styles';
import CustomText from '../../components/atoms/CustomText/CustomText';
import CustomTextBox from '../../components/atoms/CustomText/CustomTextBox';
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView';
import { AuthScreenNavigationProp, UnauthStackParamList } from '../../navigation/UnauthStack';
import CustomButton from '../../components/molecules/CustomButton';

type ChangePasswordRouteProp = RouteProp<UnauthStackParamList, 'ChangePassword'>;

const ChangePassword = () => {
    const initialState = {
        newPassword: ''
    };
    const route = useRoute<ChangePasswordRouteProp>();
    const { email } = route.params;  // Access email from route params correctly
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const [state, setState] = useState(initialState);

    const { newPassword } = state;

    const handleChange = (type: string, val: string) => {
        setState(prevVal => ({ ...prevVal, [type]: val }));
    };
    
    const submitForm = () => {
        navigation.replace('OtpVerification', {
            newPassword,
            email  // Pass email as part of params if necessary
        });
    };

    const isButtonEnabled = newPassword;

    return (
        <SafeAreaView style={styles.container}>
            <CustomKeyboardAvoidingView>
                <View style={styles.formInnerContainer}>
                    <CustomText weight='700' size={32}>
                        Create a new Password
                    </CustomText>
                    <View style={styles.inputContainer}>
                        <CustomTextBox
                            autoCapitalize='none'
                            secureTextEntry
                            style={styles.emailAddressContainer}
                            value={newPassword}
                            onChangeText={(val) => handleChange('newPassword', val)}
                            placeholder='New Password'
                        />
                        <CustomButton
                            disabled={!isButtonEnabled}
                            label='Proceed'
                            onPress={submitForm}
                        />
                    </View>
                </View>
            </CustomKeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChangePassword;
