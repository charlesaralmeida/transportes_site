import { createSlice } from '@reduxjs/toolkit';
import foto_dummie from "../img/photo-login-dummie.png";

const initialState = {
    full_name: '',
    first_name: '',
    last_name: '',
    photo: foto_dummie,
    email: '',
    isLogged: false,
    isLoginChecked: false,
    credential: null,
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser(state, { payload }) {
            return {
                ...state,
                isLogged: true,
                full_name: payload.full_name,
                first_name: payload.first_name,
                last_name: payload.last_name,
                photo: payload.photo,
                email: payload.email,
            }
        },
        setCredential(state, {payload}){
            return {
                ...state,
                credential: payload,
            }
        },
        logout(state) {
            return {
                ...state,
                ...initialState,
                isLoginChecked: true,
            }
        },
        setLoginChecked(state) {
            return {
                ...state,                
                isLoginChecked: true,
            }
        }
    }
})


export const { setCredential, changeUser, logout, setLoginChecked } = slice.actions;

export const selectUser = state => state.user;

export default slice.reducer;