import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tipos: [],    
    tipoSelected: false,
    fornecedor: {
        'Nome do serviço': '',
        'Nome do fornecedor': '',
        'Endereço': '',
        'CNPJ': '',        
    },
    precos: {},
    ready: true,
    isTipoSelected: false,
    change: false,
    errors: {},
    showallerrors: false,
}

export const slice = createSlice({
    name: 'fornecedor',
    initialState,
    reducers: {
        clearStateFornecedor(state) {
            return {
                ...state,
                ...initialState,                
            }
        },
        setTiposOS(state, { payload }) {
            return {
                ...state,
                tipos: payload,
            }
        },
        toggleTipoSelected(state, { payload }) {
            return {
                ...state,
                tipoSelected: payload,
            }
        },
        setFornecedor(state, { payload }) {
            return {
                ...state,
                fornecedor: payload.fornecedor,
                precos: payload.precos,
            }
        },
        setFornecedorReady(state, { payload }) {
            return {
                ...state,
                ready: payload,
            }
        },
        toggleFornecedorTipoSelected(state, { payload }) {
            return {
                ...state,
                isTipoSelected: payload,
            }
        },
        toggleChangeFornecedor(state, { payload }) {
            return {
                ...state,
                change: payload,
            }
        },
        setError(state, { payload }) {
            return {
                ...state,
                errors: payload,
            }
        },
        removeError(state, { payload }) {
            return {
                ...state,
                errors: {
                    payload
                },
            }
        },
        toggleShowAllErrors(state, { payload }) {
            return {
                ...state,
                showallerrors: payload,
            }
        }
    }
})


export const { toggleTipoSelected, toggleShowAllErrors, removeError, setError, clearStateFornecedor, setTiposOS, setFornecedor, setFornecedorReady, toggleFornecedorTipoSelected, toggleChangeFornecedor } = slice.actions;

export const selectFornecedor = state => state.fornecedor;

export default slice.reducer;