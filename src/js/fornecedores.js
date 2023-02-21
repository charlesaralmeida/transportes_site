import Firebase from "./firebase";

const PATH_TIPOS_OS_LIST = '/Transportes/os/tipos/lista';
const PATH_TIPOS_OS = '/Transportes/os/tipos/descricao';
const PATH_REGISTROS_OS = '/Transportes/os/registros';

const getTipoOSList = () => Firebase.readData(PATH_TIPOS_OS_LIST)

const getFornecedor = (descricao) => Firebase.readData(PATH_TIPOS_OS + '/' + descricao)

const getFornecedorInfo = (tiposervico) => Firebase.readData(PATH_TIPOS_OS + '/' + tiposervico + '/fornecedor')

const getServicePrice = (tiposervico, tipoveiculo) =>
    Firebase.readData(PATH_TIPOS_OS + '/' + tiposervico + '/precos/' + tipoveiculo);
    
const saveFornecedor = (descricao, dados, tiposList) =>
    Firebase.writeData(PATH_TIPOS_OS + '/' + descricao, dados)
        .then(() => Firebase.writeData(PATH_TIPOS_OS_LIST, tiposList))

const fornecedores = {
    getTipoOSList,
    getFornecedor,
    saveFornecedor,
    getServicePrice,
    getFornecedorInfo,
}

export default fornecedores;
