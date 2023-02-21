import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ready: true,
    tipoSelected: false,
    frotaSelected: false,
    frotaList: [],
    tiposOSList: [],
    frotaData: {},
    tipoServico: '',
    fornecedor: {
        'Nome do serviço': '',
        'Nome do fornecedor': '',
        'Endereço': '',
        'CNPJ': '',        
    },
    preco: '',
    openOS: false,
    OSNumber: '',
    authCode: '',
    date: '',
}

export const slice = createSlice({
    name: 'manutencao',
    initialState,
    reducers: {
        clearState(state) {
            return {
                ...state,
                ...initialState,                
            }
        },
        toggleReady(state, { payload }) {
            return {
                ...state,
                ready: payload,
            }
        },
        setFrota(state, { payload: frota_list }) {
            return {
                ...state,
                frotaList: frota_list.sort(),
            }
        },
        setTiposOS(state, { payload: tipos_list }) {
            return {
                ...state,
                tiposOSList: tipos_list.sort(),
            }
        },
        toggleTipoSelected(state, { payload }) {
            return {
                ...state,
                tipoSelected: payload,
            }
        },
        toggleFrotaSelected(state, { payload }) {
            return {
                ...state,
                frotaSelected: payload,
            }
        },
        setDataFrota(state, { payload }) {            
            return {
                ...state,
                frotaData: payload,
            }
        },
        setTipoServico(state, { payload }) {            
            return {
                ...state,
                tipoServico: payload,
            }
        },     
        setPrice(state, {payload}){
            return {
                ...state,
                preco: payload,
            }
        },
        setFornecedor(state, {payload}){
            return {
                ...state,
                fornecedor: payload,
            }
        },
        setOpenOS(state){
            return {
                ...state,
                openOS: true,
            }
        },
        setOSNumber(state, {payload}){
            return {
                ...state,
                OSNumber: payload,
            }
        },
        setOSExtraData(state, {payload}){
            return{
                ...state,
                date: payload.date,
                authCode: payload.auth_code,
            }
        }
    }
})


export const { setOSExtraData, setOSNumber, setOpenOS, setFornecedor, setPrice, clearState, toggleReady, setFrota, setTiposOS, toggleTipoSelected, toggleFrotaSelected, setDataFrota, setTipoServico } = slice.actions;

export const selectManutencao = state => state.manutencao;

export default slice.reducer;