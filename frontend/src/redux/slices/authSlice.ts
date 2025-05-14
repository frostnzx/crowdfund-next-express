import { createSlice } from "@reduxjs/toolkit";

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
    setCredentials: (state  , action) => {
      const { accessToken } = action.payload ;
      state.token = accessToken ; 
    },
    logOut: (state , action) => {
      state.token = null 
    },
  }
})
export const { setCredentials , logOut} = authSlice.actions ; 
export default authSlice.reducer ; 
export const selectCurrentToken = (state : any) => state.auth.token ; 