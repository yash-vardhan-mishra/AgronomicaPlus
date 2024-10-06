import React, { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import styles from './Auth.styles'
import CustomButton from '../../components/molecules/CustomButton'
import CustomText from '../../components/atoms/CustomText/CustomText'
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView'
import Colors from '../../constants/Colors'
import Strings from '../../constants/Strings'
import OtpTextInput from '../../components/molecules/OtpTextInput/OtpTextInput'
import { UnauthStackParamList } from '../../navigation/UnauthStack';
import { changePassword, verifyOtp } from '../../services/auth';
import { useLoading } from '../../contexts/LoadingContext';
import { saveItem } from '../../services/keychain';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../navigation';
import { useAuth } from '../../contexts/AuthContext';
import { showError } from '../../components/molecules/OtpTextInput/utils';
import BackButton from '../../components/atoms/BackButton';

type OtpVerificationRouteProp = RouteProp<UnauthStackParamList, 'OtpVerification'>;
type OtpVerificationNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OtpVerification = ({ }) => {
    const route = useRoute<OtpVerificationRouteProp>();
    const { setLoading } = useLoading()
    const { login } = useAuth();
    const { email, newPassword } = route.params;

    const navigation = useNavigation<OtpVerificationNavigationProp>()
    const [otp, setOtp] = useState('')

    const submitForm = () => {
        setLoading(true)
        if (newPassword) {
            changePassword(email, otp, newPassword).then(async res => {
                await saveItem('authTokenEmployee', res.authToken);
                login(res.authToken);  // Trigger login with the new token
                navigation.navigate('AuthStack', { screen: 'HomeTab' });
            }).catch(err => {
                showError(err)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            verifyOtp(email, otp).then(async res => {
                await saveItem('authTokenEmployee', res.authToken);
                login(res.authToken);  // Trigger login with the new token
                navigation.navigate('AuthStack', { screen: 'HomeTab' });
            }).catch(err => {
                showError(err)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const onBackPress = () => {
        navigation.goBack()
    }

    const isButtonEnabled = otp.length === 4

    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={onBackPress} />
            <CustomKeyboardAvoidingView>
                <View style={styles.formInnerContainer}>
                    <CustomText weight='700' size={32}>
                        {Strings.otpVerifyPrompt}
                    </CustomText>
                    <View style={styles.otpInputOuterContainer}>
                        <CustomText style={styles.otpInputPrompt} weight='500' color={Colors.romanSilver2}>
                            {Strings.otpInputPrompt}
                        </CustomText>
                        <OtpTextInput otp={otp} setOtp={setOtp} digits={4} />
                        <CustomButton disabled={!isButtonEnabled} label='Verify' onPress={submitForm} />
                    </View>
                </View>
            </CustomKeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OtpVerification
