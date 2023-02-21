import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import Warning from '../component/warning'
import { showWarning, selectWarning } from '../../redux/warningSlice'
import Loader from '../component/loader'
import { maskCodOrgao, unmaskCodOrgao, validadeEmailUnicamp, removeEmailDomain } from '../../js/resources';
import Firebase from '../../js/firebase';

const Users = () => {

    const ORGAOS_LISTA_PATH = '/orgaos/lista';
    const ORGAOS_PATH = '/orgaos';
    const USERS_PATH = '/Transportes/users';
    const USERS_ADMIN_LISTA_PATH = '/Transportes/users/adminLista';
    const USERS_UNIDADE_LISTA_PATH = '/Transportes/users/unidades';
    const dispatch = useDispatch();

    const [isLoaderActive, toggleLoader] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const [isProfileSelected, setProfileSelected] = useState(false);
    const [userName, setUserName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [userRamal, setUserRamal] = useState('');
    const [userCodUnidade, setUserCodUnidade] = useState('');
    const [userUnidade, setUserUnidade] = useState('');
    const [errorsForm, setError] = useState([]);
    const [isUserChanged, toggleUserChanged] = useState(false);
    const [unidadesList, setUnidadesList] = useState([]);
    const [isCodSelected, setCodSelected] = useState(false);
    const user = useSelector(selectUser);

    const warning = useSelector(selectWarning);
    const usertypes = ['Admin', 'Solicitante', 'Expedidor', 'Gestor'];
    const MSG = {
        EMPTY_ERROR: 'Obrigatório',
        CHECK_ERRORS: { title: 'Atenção!', text: 'Verifique os erros de preenchimento' },
        SAVE_SUCCESS: { title: 'Atenção!', text: 'Dados salvos com sucesso' },
        MAIL_ERROR: "O e-mail do usuário deve estar no formato 'usuário@unicamp.br'",
    }

    const handleProfileChoice = (value) => {
        // newEdit();
        if (value) {
            toggleLoader(true);
            Firebase.readData(ORGAOS_LISTA_PATH)
                .then((lista) => {
                    setUnidadesList(lista);
                    setUserProfile(value);
                    setProfileSelected(true);
                    toggleLoader(false);
                })
        } else {
            setProfileSelected(false);
        }
    }

    const handleCodChoice = (e) => {
        // newEdit();        
        let value = e.target.value;
        if (value) {            
            toggleLoader(true);
            Firebase.readData(ORGAOS_PATH + '/' + unmaskCodOrgao(value) + '/0/Nome')
                .then((nomeUnidade) => {                    
                    setCodSelected(true);
                    setUserUnidade(nomeUnidade);
                    setUserCodUnidade(value);                    
                    toggleUserChanged(true);
                    toggleLoader(false);
                })

        } else
            setCodSelected(false);
        removeError(e.target.name);
    }

    const setUserInfo = (e) => {
        if (!e.target.value)
            toggleUserChanged(false);

        switch (e.target.name) {
            case 'nome':
                setUserName(e.target.value);
                toggleUserChanged(true);
                break;
            case 'mail':
                const mail = e.target.value.toLowerCase();
                setUserMail(mail);
                toggleUserChanged(true);
                break;
            case 'ramal':
                setUserRamal(e.target.value);
                toggleUserChanged(true);
                break;
            case 'cod':
                setUserCodUnidade(e.target.value);
                toggleUserChanged(true);
                break;
        }
        //remove errors onChange (check again onSubmit)
        removeError(e.target.name);
    }

    const removeError = (inputName) => {
        let errors = { ...errorsForm };
        if (errors.hasOwnProperty(inputName))
            delete errors[inputName];
        setError(errors);
    }

    const formSubmit = (formEvent) => {
        formEvent.preventDefault();
        let formData = new FormData(formEvent.target);
        if (checkFormErrors(formData)) {
            toggleUserChanged(false);
            dispatch(showWarning(MSG.CHECK_ERRORS));
        } else
            saveUser();

    }

    const checkFormErrors = (formData) => {
        //evita que envie o submit, tratando o submit internamente (sem atualizar a página)                
        let errors = {};
        for (const [name, value] of formData) {            
            if (!value) {
                errors[name] = MSG.EMPTY_ERROR;
                continue;
            }

            //se não for dado relativo ao fornecedor, analisa o valor inserido
            if (name === 'mail') {
                if (!validadeEmailUnicamp(value)) {
                    errors['mail'] = MSG.MAIL_ERROR;
                }
            }
        }
        errors = { ...errorsForm, ...errors };
        setError(errors);

        return (Object.keys(errors).length !== 0) ? true : false;
    }

    const saveUser = () => {
        toggleLoader(true);

        let data = {
            nome: userName,
            profile: userProfile,
            email: userMail,
            ramal: userRamal,
            unidade: userCodUnidade,
        }

        let path = USERS_PATH + '/' + removeEmailDomain(userMail);
        Firebase.updateData(path, data)
            .then(() => {
                Firebase.readData(USERS_ADMIN_LISTA_PATH)
                    .then((lista) => {
                        if (lista) {
                            lista.push(userMail);
                            lista = [...new Set(lista)];
                        }
                        else
                            lista = [userMail];
                        Firebase.writeData(USERS_ADMIN_LISTA_PATH, lista)
                            .then(() => {
                                toggleUserChanged(false);
                                toggleLoader(false);
                                dispatch(showWarning(MSG.SAVE_SUCCESS));
                                let path = USERS_UNIDADE_LISTA_PATH + '/' + unmaskCodOrgao(userCodUnidade);
                                Firebase.readData(path)
                                    .then((lista) => {
                                        if (lista) {
                                            lista.push(userMail);
                                            lista = [...new Set(lista)];
                                        }
                                        else
                                            lista = [userMail];
                                        Firebase.writeData(path, lista)
                                            .then(() => {
                                                toggleUserChanged(false);
                                                toggleLoader(false);
                                                dispatch(showWarning(MSG.SAVE_SUCCESS));
                                            })
                                            .catch((error) => {
                                                dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                                                toggleUserChanged(false);
                                                toggleLoader(false);
                                            })
                                    })
                                    .catch((error) => {
                                        dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                                        toggleUserChanged(false);
                                        toggleLoader(false);
                                    })
                            })
                    })
                    .catch((error) => {
                        dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                        toggleUserChanged(false);
                        toggleLoader(false);
                    })
            })
            .catch((error) => {
                dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                toggleUserChanged(false);
                toggleLoader(false);
            })
    }

    return (
        <>
            {user.isLogged ?
                <form className="form-fornecedor" onSubmit={e => formSubmit(e)}>
                    <Loader isActive={isLoaderActive} />
                    {warning.show ? <Warning /> : null}
                    <h1>Adicionar usuários</h1>
                    <div className="form-fornecedor-dados">
                        <div className='form-fornecedor-select-container'>
                            <span className='form-fornecedor-select-label'>Perfil</span>
                            <select className='form-fornecedor-select' onChange={e => handleProfileChoice(e.target.value)} value={isProfileSelected ? userProfile : ''}>
                                <option value=''>Selecione o perfil do usuário</option>
                                {usertypes.map((tipo, index) =>
                                    <option key={index} value={tipo}>{tipo}</option>)}
                            </select>
                            <span className='tooltip-icon'><FontAwesomeIcon icon={solid('circle-question')} /></span>
                            <div className='tooltip'>
                                <p><strong>Admin:</strong> Acesso irrestrito a todas as ferramentas</p>
                                <p><strong>Solicitante:</strong> usuário habilitado para solicitar viagens</p>
                                <p><strong>Expedidor:</strong> principal responsável pela comunicação entre a DGA e a Unidade/Órgão</p>
                                <p><strong>Gestor:</strong> usuário com acesso a relatórios e cadastros de uma unidade específica</p>
                            </div>
                        </div>
                        {isProfileSelected ?
                            <div>
                                <div className='form-fornecedor-input-container'>
                                    <span className='form-fornecedor-input-label'>Nome</span>
                                    <input className='form-fornecedor-input' name='nome' value={userName} onChange={e => setUserInfo(e)} />
                                    <p className='input-fornecedor-error'>{errorsForm['nome']}</p>
                                </div>
                                <div className='form-fornecedor-input-container'>
                                    <span className='form-fornecedor-input-label'>E-mail</span>
                                    <input className='form-fornecedor-input' name='mail' value={userMail} onChange={e => setUserInfo(e)} />
                                    <p className='input-fornecedor-error'>{errorsForm['mail']}</p>
                                </div>
                                <div className='form-fornecedor-input-container'>
                                    <span className='form-fornecedor-input-label'>Ramal</span>
                                    <input className='form-fornecedor-input' name='ramal' value={userRamal} onChange={e => setUserInfo(e)} />
                                    <p className='input-fornecedor-error'>{errorsForm['ramal']}</p>
                                </div>
                                <div className='form-fornecedor-select-container'>
                                    <span className='form-fornecedor-select-label'>Cod. Unidade/Órgão</span>
                                    <select name="unidade" className='form-fornecedor-select' onChange={e => handleCodChoice(e)} value={isCodSelected ? userCodUnidade : ''}>
                                        <option value=''>Selecione o código</option>
                                        {unidadesList.map((cod, index) => {
                                            cod = maskCodOrgao(cod);
                                            return <option key={index} value={cod}>{cod}</option>
                                        })}
                                    </select>
                                    <p className='input-fornecedor-error'>{errorsForm['unidade']}</p>
                                    <p className='form-fornecedor-input-label'>{userUnidade}</p>
                                </div>
                            </div>
                            : null}
                        <ButtonAddUserContainer
                            isUserChanged={isUserChanged}
                        />

                    </div>
                </form> : null}
        </>
    )
}

const ButtonAddUserContainer = (props) => {

    return (
        <>
            {props.isUserChanged
                ? < div className="button-fornecedor-container" >
                    <button type='submit' className="button-fornecedor-save">
                        Salvar
                    </button>
                </div > : null}
        </>
    )
}
export default Users;