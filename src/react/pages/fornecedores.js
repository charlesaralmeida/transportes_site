import React, { useEffect, useState } from 'react';
import '../../styles/transportes.css';
import { ContentBar } from '../component/content.js';
import Firebase from '../../js/firebase';
import Loader from '../component/loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdmin, setOSData, toggleDataReady } from '../../redux/adminSlice';
import Warning from '../component/warning'
import { showWarning, selectWarning } from '../../redux/warningSlice'

const Fornecedores = () => {

    const PATH_OS_NOT_VALIDATED = "Transportes/os/registros/not_validated";
    const PATH_OS_VALIDATED = "Transportes/os/registros/validated";
    const PATH_OS_PROCESSED = "Transportes/os/registros/processed";
    const PATH_OS_PROCESSED_LIST = "Transportes/os/registros/processed/list";


    const MSG = {
        VALIDATE_SUCCESS: { title: 'Atenção!', text: 'OS validada com sucesso' },
        VALIDATE_ALREADY: { title: 'Atenção!', text: 'OS já foi validada anteriormente' },
        VALIDATE_INVALID: { title: 'Atenção!', text: 'Código de autenticação inválido. Verifique o código no rodapé da OS' },
        VALIDATE_EMPTY: { title: 'Atenção!', text: 'Insira o código que consta no rodapé da OS' },
    }

    const [authcode, setAuthCode] = useState();

    const dispatch = useDispatch();

    const getCurrentDate = () => {
        let newdate = new Date();
        let day = newdate.getDate();
        day = day.toString().padStart(2, "0");
        let month = newdate.getMonth() + 1;
        month = month.toString().padStart(2, "0");
        let year = newdate.getFullYear();
        let date = day + "/" + month + "/" + year;
        return date;
    }

    const validateOS = () => {
        if (authcode) {
            let path = PATH_OS_NOT_VALIDATED + "/" + authcode;
            Firebase.readData(path)
                .then((result) => {
                    if (result) {
                        Object.assign(result, { "data_validada": getCurrentDate() });
                        let path = PATH_OS_VALIDATED + "/" + authcode;
                        Firebase.updateData(path, result)
                            .then(() => {
                                let path = PATH_OS_NOT_VALIDATED + "/" + authcode;
                                Firebase.deleteData(path)
                                    .then(() => dispatch(showWarning(MSG.VALIDATE_SUCCESS)))
                                    .catch(error => showWarning({ title: "Erro", text: error.message }));
                            })
                            .catch(error => showWarning({ title: "Erro", text: error.message }));
                    } else {
                        let path = PATH_OS_VALIDATED + "/" + authcode;
                        Firebase.readData(path)
                            .then((result) => {
                                if (result)
                                    dispatch(showWarning(MSG.VALIDATE_ALREADY))
                                else {
                                    Firebase.readData(PATH_OS_PROCESSED_LIST)
                                        .then((list) => {
                                            let found = [];
                                            if (list)
                                                found = list.filter(os => os === authcode);                                            
                                            if (found.length>0)
                                                dispatch(showWarning(MSG.VALIDATE_ALREADY))
                                            else
                                                dispatch(showWarning(MSG.VALIDATE_INVALID))
                                        })
                                        .catch(error => showWarning({ title: "Erro", text: error.message }))
                                }
                            }).catch((error) => alert(error));
                    }
                })
        } else
            dispatch(showWarning(MSG.VALIDATE_EMPTY))
    }

    return (
        <div className="content-container">
            <ContentBar
                text='Validar ordem de serviço'
            />
            <p>Esta página é dedicada aos fornecedores para que validem a ordem de serviço após a execução</p>
            <div className="content-fornecedores">
                <div className="form form-fornecedor-validar-os">
                    <p><span>Código de autenticação da OS:</span>
                        <input maxLength="23" onChange={e => setAuthCode(e.target.value)} />
                    </p>
                    <button className="button-solicitacao" onClick={validateOS}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default Fornecedores;