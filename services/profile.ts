import AxiosService from "./AxiosService";

const api = AxiosService.getAxiosInstance();

export async function getProfileInfo(authToken: string) {
    return api.get(
        `${process.env.EXPO_PUBLIC_API_URL}employee/get-info`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
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

export async function getTimesheets(authToken: string) {
    return api.get(
        `${process.env.EXPO_PUBLIC_API_URL}employee/timesheets`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
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

export async function clockIn(employeeLat: number, employeeLong: number, token: string) {
    return api.post(
        `${process.env.EXPO_PUBLIC_API_URL}employee/clock-in`,
        {
            employeeLat,
            employeeLong
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
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

export async function clockOut(employeeLat: number, employeeLong: number, token: string) {
    return api.post(
        `${process.env.EXPO_PUBLIC_API_URL}employee/clock-out`,
        {
            employeeLat,
            employeeLong
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
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