import axios from "axios";
import { store } from "@/redux/store"; // Import the Redux store
import { updateCredentials, logOut } from "@/redux/slices/authSlice"; // Import Redux actions

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true, // Include cookies in requests
});

api.interceptors.request.use(
    (config) => {
        const state = store.getState(); // Access the Redux state
        const token = state.auth.token; // Get the accessToken from Redux
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                // Attempt to refresh the token
                const response = await axios.post<{ accessToken: string }>(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
                    {}, 
                    { withCredentials: true } // include cookie
                );

                const newAccessToken = response.data.accessToken;

                // Update the accessToken in Redux
                store.dispatch(updateCredentials(newAccessToken));

                console.log('new AccessToken in redux : ' , store.getState().auth.token); 
                console.log('new AccessToken in response : ' , newAccessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (err) {
                // If refresh fails, clear tokens and log out the user
                store.dispatch(logOut({})); // Dispatch logOut action to clear Redux state
                return Promise.reject(err);
            }
        }

        return Promise.reject(error); // Reject other errors
    }
);

export default api;
