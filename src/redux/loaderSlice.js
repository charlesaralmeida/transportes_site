import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'loader',
    initialState: {
        isLoaderActive: true,
    },
    reducers: {
        toggleLoader(state, { payload }) {
            return {
                ...state,
                isLoaderActive: payload,
            }
        },
    }
})

export const { toggleLoader } = slice.actions;

export const selectLoaderShow = state => state.loader.isLoaderActive;

export default slice.reducer;