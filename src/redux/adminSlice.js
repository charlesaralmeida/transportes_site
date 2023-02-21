import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    OSData: {}, 
    isDataReady: false,
}

export const slice = createSlice({
    name: 'admin',
    initialState,    
    reducers: {
        setOSData(state, {payload}){
            return{
                ...state,
                OSData: payload,
            }
        },
        toggleDataReady(state, {payload}){
            return{
                ...state,
                isDataReady: payload,
            }
        }
    }
})


export const { setOSData, toggleDataReady } = slice.actions;

export const selectAdmin = state => state.admin;

export default slice.reducer;