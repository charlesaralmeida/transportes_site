import Firebase from "./firebase";

import logo_unicamp from '../img/logo_unicamp.png'

const PATH_FROTA = '/Transportes/frota/Disponível';
const PATH_FROTA_LIST = '/Transportes/frota/Disponível/lista';
const PATH_TIPOS_OS_LIST = '/Transportes/os/tipos/lista';
const PATH_OS_LAST_REG = "Transportes/os/registros/last";
const PATH_OS_NOT_VALIDATED = "Transportes/os/registros/not_validated";

const PATH_OS = "Transportes/os";
const PATH_OS_REG = "Transportes/os/registros";


const PATH_OS_VALIDATED = "Transportes/os/registros/validated";
const PATH_OS_PROCESSED = "Transportes/os/registros/processed"
const PATH_OS_TYPES = "Transportes/os/tipos";
const PATH_ORGAOS = "orgaos";

const getFrotaList = () => Firebase.readData(PATH_FROTA_LIST)
    .then(list => list.map(frota => frota))


const getTipoOSList = () => Firebase.readData(PATH_TIPOS_OS_LIST)

const getFrotaData = (frota) => Firebase.readData(PATH_FROTA + '/' + frota)
    .then(frota => frota);

const getLastOSNumber = () =>
    Firebase.readData(PATH_OS_LAST_REG)

function getCurrentDate() {
    let newdate = new Date();
    let day = newdate.getDate();
    day = day.toString().padStart(2, "0");
    let month = newdate.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    let year = newdate.getFullYear();
    let date = day + "/" + month + "/" + year;
    return date;
}

function generateRandomCode() {
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
    const allNumbers = [..."0123456789"];

    const base = [...allNumbers, ...allLowerAlpha];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    };

    let date = getCurrentDate();
    let random_code = date.slice(6, 10) + date.slice(3, 5) + date.slice(0, 2) + "-" + generator(base, 4) + "-" + generator(base, 4) + "-" + generator(base, 4);
    return random_code;
}


function reverseDate(date_str) {
    return date_str.split('-').reverse().join('-');
}

//data no formato 2022-03-08
function disjointDate(date_str, char) {
    let date = date_str.split(char);
    return date;
}

const generateOSBody = (os_number, user, frotaDados, service, date, auth_code) => {
    let fornecedor_nome = service.fornecedor['Nome do fornecedor'];
    let fornecedor_cnpj = service.fornecedor['CNPJ'];
    let fornecedor_endereco = service.fornecedor['Endereço'];
    let frota = frotaDados['N_Frota'];
    let modelo = frotaDados['Modelo'];
    let placa = frotaDados['Placa'];
    let tipo = service['tipo'];
    let valor = service['preco'];
    let name = user['full_name'];
    let cod_unidade = frotaDados['Centro_de_Custo__Código'];
    let unidade = frotaDados['Centro_de_Custo__Descrição'];
    let email = user['email'];
    
    let html = `<html><head><title>OS DGA</title>
        <style>
        @font-face {
            font-family: Robot;
            src: url(../font/RobotoCondensed-Bold.ttf);
            font-weight: bold;
        }
        
        @font-face {
            font-family: Robot;
            src: url(../font/RobotoCondensed-Regular.ttf);
        }
               
        body {
            margin: 0;                        
            display: flex;
            flex-direction: column;
            font-family: Robot, Arial, Helvetica, sans-serif;
        }
                
        .content-os { 
            padding-top: 2%;
            padding-bottom: 2%;
            width: 90%;           
            height: 800px;
            margin-top: 100px;
            border: 2px solid black;
            border-radius: 1.5%;
            display: flex;
            flex-direction: column;
            align-self: center;
            justify-content: center;
        }
        
        .content-os-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-top: 5%;
        }
        
        .content-os-logo {
            width: 12%;
            margin-right: 10%;
        }
        
        .content-os-id {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 7%;
        }
        
        .content-os-id p {
            margin: 3px 0;
        }
        
        .content-os-id-title {
            font-size: xx-large;
        }
        
        .content-os-content {
            padding: 2%;
            border-top: 1px dashed black;
            display: flex;
        }
        
        .content-os-content-title {
            width: 40%;
            font-weight: bolder;
            font-size: larger;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .content-os-content-content {
            width: 50%;
            margin-left: 7%;
        }
        
        .content-os-shop {
            margin-top: 40px;
        }
        
        .footer-os {
            width: 90%;
            display: flex;
            align-self: center;
            justify-content: space-around;
        }
        
        .footer-os p {
            font-size: small;
        }           
        </style>
        </head>
        <body onload="print();">
        <div class="content-os">
                <div class="content-os-header">
                    <div class="content-os-id">
                        <p class="content-os-id-title">Ordem de Serviço nº <span class="os-service-id">${os_number}</span></p>
                        <p>Transportes/DGA</p>
                    </div>
                    <img alt="logo" class="content-os-logo" src=${logo_unicamp} />
                </div>

                <div class="content-os-content content-os-shop">
                    <div class="content-os-content-title content-os-shop-title">
                        <p>FORNECEDOR</p>
                    </div>
                    <div class="content-os-content-content content-os-shop-content">
                        <p>${fornecedor_nome}</p>
                        <p>CNPJ: ${fornecedor_cnpj}</p>
                        <p>${fornecedor_endereco}</p>
                    </div>
                </div>

                <div class="content-os-content content-os-car">
                    <div class="content-os-content-title content-os-car-title">
                        <p>VEÍCULO</p>
                    </div>
                    <div class="content-os-content-content content-os-car-content">
                        <p>Frota: ${frota}</p>
                        <p>Modelo: ${modelo}</p>
                        <p>Placa: ${placa}</p>
                    </div>
                </div>



                <div class="content-os-content content-os-type">
                    <div class="content-os-content-title content-os-type-title">
                        <p>SERVIÇO CONTRATADO</p>
                    </div>
                    <div class="content-os-content-content content-os-type-content">
                        <p>${tipo}</p>
                        <p>Valor: R$ ${valor}</p>
                    </div>
                </div>

                <div class="content-os-content content-os-user">
                    <div class="content-os-content-title content-os-user-title">
                        <p>SOLICITANTE</p>
                    </div>
                    <div class="content-os-content-content content-os-user-content">
                        <p>${name}</p>
                        <p>Cod. Unidade: ${cod_unidade}</p>
                        <p>Unidade: ${unidade}</p>
                        <p>E-mail: ${email}</p>
                    </div>
                </div>
        </div>
            <div class="footer-os">
                <p>Data de emissão: <span class="os-service-date">${date}</span></p>
                <p>Autenticação: ${auth_code}</p>
            </div>
        </body><html>`

    let externalWindow = window.open('', '', 'width=800,height=800,left=200,top=200');
    externalWindow.document.write(html);
    externalWindow.document.close();
    externalWindow.focus();

    return html;
}

const saveOS = (os_number, user, frotaDados, service, date, auth_code) => {
    let fornecedor_nome = service.fornecedor['Nome do fornecedor'];
    let fornecedor_cnpj = service.fornecedor['CNPJ'];
    let fornecedor_endereco = service.fornecedor['Endereço'];
    let frota = frotaDados['N_Frota'];
    let modelo = frotaDados['Modelo'];
    let placa = frotaDados['Placa'];
    let tipo = service['tipo'];
    let valor = service['preco'];
    let name = user['full_name'];
    let cod_unidade = frotaDados['Centro_de_Custo__Código'];
    let unidade = frotaDados['Centro_de_Custo__Descrição'];
    let email = user['email'];

    let data = {
        [auth_code]: {
            auth_code: auth_code,
            fornecedor_nome: fornecedor_nome,
            fornecedor_cnpj: fornecedor_cnpj,
            fornecedor_endereco: fornecedor_endereco,
            frota: frota,
            modelo: modelo,
            placa: placa,
            tipo: tipo,
            valor: valor,
            name: name,
            cod_unidade: cod_unidade,
            unidade: unidade,
            email: email,
            date: date,
            os_id: os_number,
        }
    }
    
    return Firebase.updateData(PATH_OS_NOT_VALIDATED, data)
        .then(() => Firebase.writeData(PATH_OS_LAST_REG, os_number));
}

const manutencao = {
    getFrotaList,
    getTipoOSList,
    getFrotaData,
    getLastOSNumber,
    getCurrentDate,
    generateRandomCode,
    generateOSBody,
    saveOS
}

export default manutencao;