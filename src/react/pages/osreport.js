import React, { useEffect, useState } from 'react';
import '../../styles/transportes.css';
import { ContentBar } from '../component/content.js';
import Firebase from '../../js/firebase';
import { makeTable } from '../../js/resources';
import Loader from '../component/loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdmin, setOSData, toggleDataReady } from '../../redux/adminSlice';
import Warning from '../component/warning'
import { showWarning, selectWarning } from '../../redux/warningSlice'
import Excel from '../../js/excel';

const OSReport = () => {

    const PATH_OS_VALIDATED = "Transportes/os/registros/validated";
    const PATH_OS_NOT_VALIDATED = "Transportes/os/registros/not_validated";
    const PATH_OS_PROCESSED = "Transportes/os/registros/processed";
    const PATH_OS_PROCESSED_LIST = "Transportes/os/registros/processed/list";

    const MSG = {
        NO_OS: { title: 'Atenção!', text: 'Nenhuma OS encontrada' },
        OS_PROCESSED: { title: 'Atenção!', text: 'Todas as OSs foram processadas' },
    }

    const [isLoaderActive, toggleLoader] = useState(false);
    const warning = useSelector(selectWarning);
    const adminState = useSelector(selectAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const CNPJOnlyNum = (cnpj) => {
        let reg = /[\.]+|[\-]+|[\/]/g;
        cnpj = cnpj.replace(reg, "");
        return cnpj;
    }

    const convertMoney = (value) => {
        let reg = /[\.]/g;
        value = value.replace(reg, ",");
        value = parseFloat(value);
        return value;
    }

    const exportOsToExcel = (path) => () => {
        Firebase.readData(path)
            .then((result) => {
                if (result) {
                    let data = Object.keys(result).map(authCode => {
                        let base = result[authCode];
                        return {
                            OS: base["os_id"],
                            Data_emissão: base["date"],
                            Data_validação: base["data_validada"],
                            Frota: base["frota"],
                            Placa: base["placa"],
                            Cod_unidade: base["cod_unidade"],
                            Tipo_serviço: base["tipo"],
                            Valor: convertMoney(base["valor"]),
                            CNPJ_Fornecedor: CNPJOnlyNum(base["fornecedor_cnpj"]),
                            Fornecedor_nome: base["fornecedor_nome"],
                            Nome_solicitante: base["name"],
                            Email_solicitante: base["email"],
                            Cod_autenticação: base["auth_code"]
                        }
                    })
                    Excel.arrayToExcel(data);
                } else
                    dispatch(showWarning(MSG.NO_OS));
            })
            .catch((error) => console.log(error));
    }

    const disjointDate = (date_str, char) => {
        return date_str.split(char);
    }

    const processAllOs = () => {
        if (window.confirm('Confirmar processamento?')) {
            Firebase.readData(PATH_OS_VALIDATED)
                .then((result) => {
                    if (result) {
                        let newlist = [];
                        let payload = [];
                        for (let os in result) {
                            let date = disjointDate(result[os]["data_validada"], "/");
                            let year = date[2];
                            let month = date[1];
                            let day = date[0];
                            let path = PATH_OS_PROCESSED + "/" + year + "/" + month + "/" + day + "/" + result[os]["auth_code"];
                            let data = result[os];
                            newlist.push(result[os]["auth_code"]);
                            Firebase.updateData(path, data)
                                .catch(error => dispatch(showWarning({ title: 'Erro', text: error.message })));
                        }
                        Firebase.readData(PATH_OS_PROCESSED_LIST)
                            .then((list) => {
                                if (list)                                
                                    list = list.concat(newlist);                                                                    
                                else
                                    list = newlist;                                                                                                                      
                                Firebase.writeData(PATH_OS_PROCESSED_LIST, list)
                                    .then(() => {
                                        list.forEach(authCode => {
                                            let path = PATH_OS_VALIDATED + "/" + authCode;
                                            Firebase.deleteData(path)
                                                .then(() =>
                                                    dispatch(showWarning(MSG.OS_PROCESSED))
                                                )
                                        })
                                    });
                            });
                    } else dispatch(showWarning(MSG.NO_OS));
                })
                .catch((error) => dispatch(showWarning({ title: 'Erro', text: error.message })));
        }
    }

    const getDataToTable = () => {
        const authCodes = Object.keys(adminState.OSData);
        if (authCodes.length) {
            const firstData = adminState.OSData[authCodes[0]];
            const headers = Object.keys(firstData);
            const rows = Object.keys(adminState.OSData).map(key => adminState.OSData[key]);
            return { headers, rows }
        }

        return null;
    }


    return (
        <div className="content-container">           
            <Loader isActive={isLoaderActive} />
            {warning.show ? <Warning /> : null}
            <div className="content">
                <div className='content-content-admin'>
                    <div className="content-admin-os-validadas-container content-admin-container">
                        <h1>OS não validadas</h1>
                        <br />
                        <div className='content-admin-btn-container'>
                            <button className="button-admin" onClick={exportOsToExcel(PATH_OS_NOT_VALIDATED)}>Exportar</button>
                        </div>
                    </div>
                    {adminState.isDataReady ? makeTable(getDataToTable().headers, getDataToTable().rows) : null}
                    <div className="content-admin-os-validadas-container content-admin-container">
                        <h1>OS validadas</h1>
                        <br />
                        <div className='content-admin-btn-container'>
                            <button className="button-admin" onClick={exportOsToExcel(PATH_OS_VALIDATED)}>Exportar</button>
                            <button className="button-admin" onClick={processAllOs}>Processar</button>
                        </div>
                    </div>

                </div>
            </div >
        </div>
    )
}

export default OSReport;