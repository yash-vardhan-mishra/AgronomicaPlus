import React, { useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './Auth.styles';
import CustomText from '../../components/atoms/CustomText/CustomText'
import CustomTextBox from '../../components/atoms/CustomText/CustomTextBox'
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView'
import { login } from '../../services/auth'
import { AuthScreenNavigationProp } from '../../navigation/UnauthStack';
import { useLoading } from '../../contexts/LoadingContext';
import { showError } from '../../components/molecules/OtpTextInput/utils';
import Strings from '../../constants/Strings';
import CustomButton from '../../components/molecules/CustomButton';

const Auth = () => {
    const initialState = {
        email: '',
        password: ''
    }
    const navigation = useNavigation<AuthScreenNavigationProp>()
    const [state, setState] = useState(initialState)
    const { setLoading } = useLoading();

    const { email, password } = state

    const handleChange = (type: string, val: string) => {
        setState(prevVal => ({ ...prevVal, [type]: val }))
    }

    const loginUser = () => {
        setLoading(true)
        login(email, password).then(res => {
            if (res.screen === 'change-password') {
                navigation.navigate('ChangePassword', { email });
            } else {
                navigation.navigate('OtpVerification', { email });
            }
        }).catch(err => {
            showError(err)
        }).finally(() => {
            setLoading(false)
        });
    }

    const submitForm = () => {
        loginUser()
    };

    const isButtonEnabled = email && password

    return (
        <SafeAreaView style={styles.container}>
            <CustomKeyboardAvoidingView>
                <View style={styles.formInnerContainer}>
                    <CustomText weight='700' size={32}>
                        {Strings.loginPrompt}
                    </CustomText>
                    <View style={styles.inputContainer}>
                        <CustomTextBox autoCapitalize='none' autoCorrect={false} keyboardType='email-address' style={styles.emailAddressContainer} value={email} onChangeText={(val) => handleChange('email', val)} placeholder='Email' />
                        <CustomTextBox autoCapitalize='none' maxLength={32} value={password} onChangeText={(val) => handleChange('password', val)} placeholder='Password' />
                        <CustomButton disabled={!isButtonEnabled} label='Send OTP' onPress={submitForm} />
                    </View>
                </View>
            </CustomKeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Auth
