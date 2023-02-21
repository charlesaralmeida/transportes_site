import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import abastecimentoReducer from './abastecimentoSlice'
import manutencaoReducer from './manutencaoSlice'
import warningSliceReducer from './warningSlice'
import fornecedorSliceReducer from './fornecedorSlice'
import adminSliceReducer from './adminSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    abastecimento: abastecimentoReducer,
    manutencao: manutencaoReducer,        
    warning: warningSliceReducer,
    fornecedor: fornecedorSliceReducer,
    admin: adminSliceReducer,
  },
})