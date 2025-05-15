import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tokenState {
  token : string | null ; 
}
const initialState : tokenState = {
  token : null,
}
const authSlice = createSlice({
  name: 'auth' ,
  initialState , 
  reducers : {
    updateCredentials: (state  , action : PayloadAction<string>) => {
      const accessToken = action.payload ;
      state.token = accessToken ; 
    },
    logOut: (state , action) => {
      state.token = null 
    },
  }
})
export const { updateCredentials , logOut} = authSlice.actions ; 
export default authSlice.reducer ; 
export const selectCurrentToken = (state : any) => state.auth.token ; 