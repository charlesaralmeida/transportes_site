import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'abastecimento',
    initialState: {
        estados: [],
        cidades: [],
        estadoOption: '0',
        cidadeOption: '0',
        postos: [],
    },
    reducers: {
        setEstados(state, { payload: array }) {                        
            return {
                ...state,
                estados: array.sort(),
            }
        },
        setCidades(state, { payload: array }) {                        
            return {
                ...state,
                cidades: array.sort(),
            }
        },
        setPostos(state, {payload: array}){                                      
            return{
                ...state,
                postos: array.sort(),
            }
        },
        clearEstados(state) {
            return {
                ...state,                
                estados: [],
                cidadeOption: '0',
            }
        },
        clearCidades(state) {
            return {     
                ...state,           
                cidades: [],
                cidadeOption: '0',
            }
        },
        clearState(state) {
            return {     
                ...state,   
                estados: [],        
                cidades: [],
                postos: [],
                estadoOption: '0',
                cidadeOption: '0',                
            }
        },
        setEstadoOption(state, { payload: option }) {            
            return {
                ...state,
                estadoOption: option,
            }
        },
        setCidadeOption(state, { payload: option }) {            
            return {
                ...state,
                cidadeOption: option,
            }
        },
    }
})


export const { setEstados, setCidades, clearState, clearCidades, clearEstados, setCidadeOption, setEstadoOption, setPostos } = slice.actions;

export const selectEstados = state => state.abastecimento.estados;

export const selectCidades = state => state.abastecimento.cidades;

export const selectEstadoOption = state => state.abastecimento.estadoOption;

export const selectCidadeOption = state => state.abastecimento.cidadeOption;

export const selectPostos = state => state.abastecimento.postos;

export default slice.reducer;