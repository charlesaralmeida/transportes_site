import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({{
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
},
    {
        name: 'warning',
        initialState: {
            isWarningActive: true,
        },
        reducers: {
            toggleWarning(state, { payload }) {
                return {
                    ...state,
                    isWarningActive: payload,
                }
            },
        }
    }
})


export const { toggleLoader, toggleWarning } = slice.actions;

export const selectLoaderShow = state => state.loader.isLoaderActive;
export const selectWarningShow = state => state.warnning.isWarningActive;

export default slice.reducer;