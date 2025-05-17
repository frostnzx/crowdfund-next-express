import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tokenState {
    token: string | null;
    isLoggedIn: boolean;
}

const initialState: tokenState = {
    token: null,
    isLoggedIn: false, // Default to false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateCredentials: (state, action: PayloadAction<string>) => {
            const accessToken = action.payload;
            state.token = accessToken;
            state.isLoggedIn = true;
        },
        logOut: (state , action) => {
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});

export const { updateCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn; 
