import axios from "axios";

export async function login(email: string, password: string) {    
    return axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}employee/login`,
        {
            email,
            password
        },
    )
        .then(resp => {
            const responseBody = resp.data;
            
            const { success } = responseBody;
            if (success) {
                return responseBody;
            }
            const err = new Error('Invalid response');
            throw err;
        })
        .catch(err => {            
            throw err;
        });
}

export async function verifyOtp(email: string, otp: string) {
    return axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}employee/verify-otp`,
        {
            email,
            otp
        },
    )
        .then(resp => {
            const responseBody = resp.data;
            const { success } = responseBody;
            if (success) {
                return responseBody;
            }
            const err = new Error('Invalid response');
            throw err;
        })
        .catch(err => {
            throw err;
        });
}

export async function changePassword(
    email: string,
    otp: string,
    newPassword: string
) {
    return axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}employee/change-password`,
        {
            email,
            otp,
            newPassword
        },
    )
        .then(resp => {
            const responseBody = resp.data;
            const { success } = responseBody;
            if (success) {
                return responseBody;
            }
            const err = new Error('Invalid response');
            throw err;
        })
        .catch(err => {
            throw err;
        });
}