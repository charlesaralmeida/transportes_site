import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    title: '',
    text: '',
}

export const slice = createSlice({
    name: 'warning',
    initialState,
    reducers: {
        showWarning(state, { payload }) {
            return {
                ...state,
                show: true,
                title: payload.title,
                text: payload.text,
            }
        },
        hideWarning(state) {
            return {
                ...state,
                ...initialState,
            }
        },
    }
})


export const { showWarning, hideWarning } = slice.actions;

export const selectWarning = state => state.warning;

export default slice.reducer;