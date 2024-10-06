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