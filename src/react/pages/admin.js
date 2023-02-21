import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { groupByKey, fixObjKey, fixString, replaceObjData, validateMoney, maskCNPJ, maskDecimal, validateCNPJ } from '../../js/resources'
import planilha_modelo_postos from '../../docs/modelo_planilha_postos.xlsx'
import planilha_modelo_frota from '../../docs/modelo_planilha_frota.xlsx'
import planilha_modelo_orgaos from '../../docs/modelo_planilha_orgaos.xlsx'

import '../../styles/transportes.css'
import Firebase from '../../js/firebase'
import fornecedores from '../../js/fornecedores';
import Loader from '../component/loader'
import Excel from '../../js/excel'
import { Content, ContentBar } from '../component/content'
import Warning from '../component/warning'
import { hideWarning, showWarning, selectWarning } from '../../redux/warningSlice'
import OSReport from './osreport'
import Users from './users';
import { selectUser } from '../../redux/userSlice';

import { toggleTipoSelected, toggleShowAllErrors, setError, clearStateFornecedor, setTiposOS, setFornecedor, setFornecedorReady, toggleFornecedorTipoSelected, selectFornecedor, toggleChangeFornecedor } from '../../redux/fornecedorSlice'



let varError = {};
const CIDADES_PATH = '/Transportes/abastecimento/cidades';
const POSTOS_PATH = '/Transportes/abastecimento/postos';
const FROTA_PATH = '/Transportes/frota';
const FROTA_LISTA_PATH = '/Transportes/frota/Disponível/lista';
const ORGAOS_PATH = '/orgaos';
const ORGAOS_LISTA_PATH = '/orgaos/lista';
const OS_TIPOS_PATH = '/Transportes/os/tipos/lista';
const ADMIN = 'Admin';

const Admin = () => {

    const side_menu_opt = [
        { external: false, link: 'users', value: <Users />, text: 'Cadastro de usuários' },
        { external: false, link: 'os', value: <OSReport />, text: 'Ordens de serviço' },
        { external: false, link: 'fornecedores', value: <EditService />, text: 'Editar serviço' },
        { external: false, link: 'addServico', value: <AddService />, text: 'Adicionar serviço' },
        { external: false, link: 'postos', value: <Postos />, text: 'Upload dos Postos de combustível' },
        { external: false, link: 'frota', value: <Frota />, text: 'Upload da Frota de carros oficiais' },
        { external: false, link: 'orgaos', value: <Orgaos />, text: 'Upload da Tabela de Unidades e Órgãos' },
    ];

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const warning = useSelector(selectWarning);

    const MSG = {
        NOT_ADMIN: { title: 'Atenção!', text: 'É necessário acesso como administrador para acessar esta página.' }
    }

    useEffect(() => {
        if (!user.isLogged && user.isLoginChecked && user.credential !== ADMIN)
            dispatch(showWarning(MSG.NOT_ADMIN));
        else
            dispatch(hideWarning());
    }, [user.isLogged, user.isLoginChecked, user.credential]);

    return (
        <div className="content-container">
            <ContentBar
                text={'Admin'}
            />
            {user.credential === ADMIN
                ? <Content
                    side_menu_opt={side_menu_opt}
                />
                : <div className="content-content">
                    {warning.show ? <Warning /> : null}
                </div>}
        </div>)
}

const Postos = () => {

    const [isLoaderActive, toggleLoader] = useState(false);
    const dispatch = useDispatch();

    const validateHeaders = (data, headers) => data.every((value, index) => value === headers[index]);

    const savePostos = (file) => {
        toggleLoader(true);
        let postos = {};
        let cidades = {};
        getPostos(file)
            .then(result => { postos = result })
            .then(() => getCidades(postos))
            .then(result => cidades = result)
            .then(() => {
                saveCidades(cidades)
                    .then(() => {
                        Firebase.writeData(POSTOS_PATH, postos);
                    })
                    .then(() => {
                        let title = 'Atenção!';
                        let text = 'Dados salvos com sucesso';
                        dispatch(showWarning({ title, text }));
                        toggleLoader(false);
                    })
            })
            .catch((error) => {
                let title = 'Atenção!';
                let text = error.message;
                dispatch(showWarning({ title, text }))
                toggleLoader(false);
            });
    }

    const getPostos = (file) => {
        const validheaders = ['bandeira', 'cep', 'cidade', 'cnpj', 'contato', 'endereco', 'fone', 'nome_fantasia', 'razao_social', 'uf'];
        validheaders.sort();

        return Excel.toArray(file)
            .then(result => {
                if (result.length) {
                    if (validateHeaders(Object.keys(result[0]).sort(), validheaders))
                        return groupByUF(result);
                    else
                        throw new Error('Arquivo inválido. Utilize o modelo disponível para upload.')
                } else
                    throw new Error('Erro ao ler arquivo. Verifique os dados inseridos na planilha.')
            })
            .then(groupByCity)
            .then(postos => postos)
    }

    const saveCidades = (cidades) => Firebase.writeData(CIDADES_PATH, cidades)

    const getCidades = (postos) => {
        let cidades = {};
        Object.keys(postos).forEach(uf => {
            Object.keys(postos[uf]).forEach(cidade => {
                if (!cidades[uf])
                    cidades[uf] = []
                cidades[uf].push(cidade);
            })
        });
        return cidades;
    }

    const groupByUF = (postos) => groupByKey(postos, 'uf')

    const groupByCity = (postos) => {
        let dados = {};
        Object.keys(postos).map(uf => {
            postos[uf].forEach(posto => {
                if (!dados[uf])
                    dados[uf] = {}
                if (!dados[uf][posto.cidade])
                    dados[uf][posto.cidade] = []
                dados[uf][posto.cidade].push(posto);
            })
        })
        return dados;
    }

    return (
        <>
            <Loader isActive={isLoaderActive} />
            <UploadForm
                modelo={planilha_modelo_postos}
                title={'Upload dos Postos'}
                save={savePostos}
            />
        </>
    )
}

const Frota = () => {

    const [isLoaderActive, toggleLoader] = useState(false);
    const dispatch = useDispatch();

    const validateHeaders = (data, headers) => data.every((value, index) => value === headers[index]);

    const saveFrota = (file) => {
        toggleLoader(true);
        getFrota(file)
            .then(frota => {
                Firebase.writeData(FROTA_PATH, frota)
                    .then(() => {
                        let lista = Object.keys(frota['Disponível']);
                        Firebase.writeData(FROTA_LISTA_PATH, lista)
                    })
                    .then(() => {
                        let title = 'Atenção!';
                        let text = 'Dados salvos com sucesso';
                        dispatch(showWarning({ title, text }));
                        toggleLoader(false);
                    });
            })
            .catch((error) => {
                let title = 'Atenção!';
                let text = error.message;
                dispatch(showWarning({ title, text }))
                toggleLoader(false);
            });
    }

    const getFrota = (file) => {
        const validheaders = ['Nº Frota', 'Placa', 'Fabricante', 'Modelo', 'Combustível', 'Renavam', 'Nº Chassi', 'Cor', 'Empresa', 'Tipo', 'Grupo', 'Configuração de Pneus', 'Centro de Custo - Código', 'Centro de Custo - Descrição', 'Local de Lotação', 'Ano', 'Ano Modelo', 'Data Compra', 'Valor Compra', 'Forma de Aquisição', 'Banco', 'Nº Patrimônio', 'Utiliza Pneus', 'Nº Frota Cliente', 'Status', 'Situação', 'Restrição', 'Tipo de Abastecimento', 'Controlado Por', 'Km Real', 'Última Atualização Km', 'Hs Real', 'Última Atualização Hs', 'Data Baixa', 'Motivo Baixa', 'Filial'];
        validheaders.sort();

        return Excel.toArray(file)
            .then(result => {
                if (result.length) {
                    if (validateHeaders(Object.keys(result[0]).sort(), validheaders)) {
                        let frota = replacements(result);
                        return groupBySituacao(frota);
                    } else
                        throw new Error('Arquivo inválido. Utilize o modelo disponível para upload.')
                } else
                    throw new Error('Erro ao ler arquivo. Verifique os dados inseridos na planilha.')
            })
            .then(groupByFrota)
            .then(frota => frota);
    }

    const replacements = (obj) => {
        // console.log(obj['Tipo']); = fixString(obj['Tipo']);        
        obj = fixObjKey(obj);
        for (let item of obj) {
            item['Tipo'] = fixString(item['Tipo']);
            item['Situação'] = fixString(item['Situação']);
            let key = "Situação";
            let old_value = "Manutenção";
            let new_value = "Disponível";
            item = replaceObjData(item, key, old_value, new_value);
            key = "Situação";
            old_value = "Uso";
            new_value = "Disponível";
            item = replaceObjData(item, key, old_value, new_value);
        }
        return obj;
    }

    const groupBySituacao = (frota) => {
        return groupByKey(frota, 'Situação');
    }

    const groupByFrota = (frota) => {
        let dados = {};
        Object.keys(frota).forEach(situacao => {
            frota[situacao].forEach(veiculo => {
                if (!dados[situacao])
                    dados[situacao] = {}
                let n_frota = veiculo['N_Frota'];
                dados[situacao][n_frota] = veiculo;
            })
        })
        return dados;
    }

    return (
        <>
            <Loader isActive={isLoaderActive} />
            <UploadForm
                modelo={planilha_modelo_frota}
                title={'Upload da Frota'}
                save={saveFrota}
            />
        </>
    )
}

const Orgaos = () => {

    const [isLoaderActive, toggleLoader] = useState(false);
    const dispatch = useDispatch();

    const validateHeaders = (data, headers) => data.every((value, index) => value === headers[index]);

    const saveOrgaos = (file) => {
        toggleLoader(true);
        getOrgaos(file)
            .then(orgaos => {
                Firebase.writeData(ORGAOS_PATH, orgaos)
                    .then(() => {
                        let lista = Object.keys(orgaos);
                        Firebase.writeData(ORGAOS_LISTA_PATH, lista)
                    })
                    .then(() => {
                        let title = 'Atenção!';
                        let text = 'Dados salvos com sucesso';
                        dispatch(showWarning({ title, text }));
                        toggleLoader(false);
                    });
            })
            .catch((error) => {
                let title = 'Atenção!';
                let text = error.message;
                dispatch(showWarning({ title, text }))
                toggleLoader(false);
            });
    }

    const getOrgaos = (file) => {
        const validheaders = ['Cod', 'Sigla', 'Nome'];
        validheaders.sort();

        return Excel.toArray(file)
            .then(result => {
                if (result.length) {
                    if (validateHeaders(Object.keys(result[0]).sort(), validheaders)) {
                        return groupByCod(result);
                    } else
                        throw new Error('Arquivo inválido. Utilize o modelo disponível para upload.')
                } else
                    throw new Error('Erro ao ler arquivo. Verifique os dados inseridos na planilha.')
            })
            .then(orgaos => orgaos);
    }

    const groupByCod = (orgaos) => {
        return groupByKey(orgaos, 'Cod');
    }

    return (
        <>
            <Loader isActive={isLoaderActive} />
            <UploadForm
                modelo={planilha_modelo_orgaos}
                title={'Upload das Unidades e Órgãos'}
                save={saveOrgaos}
            />
        </>
    )
}


const UploadForm = (props) => {

    const [fileSelected, setFileSelected] = useState('');
    const dispatch = useDispatch();
    const warning = useSelector(selectWarning);

    const dragOver = (e) => {
        e.preventDefault();
        e.target.classList.add("upload-container-active");
    }

    const dragLeave = (e) => {
        e.target.classList.remove("upload-container-active");
    }

    const drop = (e) => {
        e.preventDefault();
        let filetype = e.dataTransfer.files[0].type;
        let validtype = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (validtype.includes(filetype)) {
            setFileSelected(e.dataTransfer.files[0]);
        } else {
            let title = 'Atenção!';
            let text = 'Arquivo inválido. Utilize o modelo disponível para upload.';
            dispatch(showWarning({ title, text }));
        }
    }

    const save = () => props.save(fileSelected);

    return (
        <div className='upload-container' onDragOver={e => dragOver(e)} onDragLeave={e => dragLeave(e)} onDrop={e => drop(e)}>
            {warning.show ? <Warning /> : null}
            <a className="btn link-style black"
                href={props.modelo}>
                Download do modelo para upload</a>
            <div className="drag-area">                
                <h1>{props.title}</h1>
                <h4>Solte a planilha aqui</h4>
                <br />
                <span>ou</span>
                <br />
                <label className='button' htmlFor='input-file'>Selecionar arquivo</label>
                <input className='input-upload-file' id='input-file' type="file" accept=".xls,.xlsx" onChange={e => { if (e.target.files[0]) setFileSelected(e.target.files[0]) }} />
                <p className='black'>{fileSelected.name}</p>

                {fileSelected ? <>
                    <br />
                    <br />
                    <br />
                    <p className='button' onClick={save}>Upload</p>
                </> : null}
                <br />
                <br />
                <br />
            </div>
        </div>
    )

}

const EditService = () => {

    const [isLoaderActive, toggleLoader] = useState(false);
    const dispatch = useDispatch();
    const fornecedorState = useSelector(selectFornecedor);
    const warning = useSelector(selectWarning);
    const MSG = {
        CNPJ_ERROR: 'Formato: 00.000.000/0000-00',
        FORMATO_ERROR: 'Formato: 0000.00',
        EMPTY_ERROR: 'Obrigatório',
        CHECK_ERRORS: { title: 'Atenção!', text: 'Verifique os erros de preenchimento' },
        SAVE_SUCCESS: { title: 'Atenção!', text: 'Dados salvos com sucesso' },
        TIPOS_EMPTY: "Não existem serviços cadastrados",
    }
    const tiposInfo = ['Nome do serviço', 'Nome do fornecedor', 'Endereço', 'CNPJ'];
    const tiposcarros = ['AMBULANCIA', 'AUTOMOVEL', 'BASE_MOVEL', 'CAMINHAO_FURGAO', 'CAMINHAO_TOCO', 'MAQUINAS_DIVERSAS', 'MECANICO_OPERACIONAL', 'MICRO_ONIBUS', 'ONIBUS', 'ONIBUS_ELETRICO', 'PICK_UP_CABINE_DUPLA', 'PICK_UP_CABINE_SIMPLES', 'REBOQUE', 'TRATOR', 'UTILITARIO_PASSAGEIRO'];

    useEffect(() => {
        newEdit();
    }, [])

    const newEdit = () => {
        toggleLoader(true);
        dispatch(clearStateFornecedor());
        fornecedores.getTipoOSList()
            .then(list => {
                if (list)
                    dispatch(setTiposOS(list))
                else
                    dispatch(setTiposOS([]))
            })
            .then(() => toggleLoader(false))
            .catch((error) => dispatch(showWarning({ title: 'Atenção!', text: [error.message] })))
    }

    const checkTiposList = () => (fornecedorState.tipos.length !== 0) ? true : false;

    const handleServiceChoice = (value) => {
        newEdit();
        if (value) {
            toggleLoader(true);
            fornecedores.getFornecedor(value)
                .then(data => {
                    let fornecedor = data.fornecedor;
                    let precos = data.precos;
                    dispatch(setFornecedor({ fornecedor, precos }));
                    dispatch(toggleTipoSelected(value));
                    dispatch(toggleFornecedorTipoSelected(true));
                })
                .then(() => toggleLoader(false));
        }
    }

    const setFornecedorInfo = (e) => {
        if (!e.target.value) {
            let fornecedor = {
                ...fornecedorState.fornecedor,
                [e.target.name]: e.target.value,
            }
            let precos = fornecedorState.precos;
            dispatch(setFornecedor({ fornecedor, precos }))
            dispatch(toggleChangeFornecedor(false));
        } else {
            if (e.target.name === 'CNPJ')
                e.target.value = maskCNPJ(e.target.value);
            let fornecedor = {
                ...fornecedorState.fornecedor,
                [e.target.name]: e.target.value,
            }
            let precos = fornecedorState.precos;
            dispatch(setFornecedor({ fornecedor, precos }));
            dispatch(toggleChangeFornecedor(true));
        }
        //remove errors onChange (check again onSubmit)
        removeError(e.target.name);
    }

    const setFornecedorPreco = (e) => {
        e.target.value = maskDecimal(e.target.value);
        let precos = {
            ...fornecedorState.precos,
            [e.target.name]: e.target.value,
        }
        let fornecedor = fornecedorState.fornecedor;
        dispatch(setFornecedor({ fornecedor, precos }));
        removeError(e.target.name);
        dispatch(toggleChangeFornecedor(true));
    }

    const removeError = (inputName) => {
        let errors = { ...fornecedorState.errors };
        if (errors.hasOwnProperty(inputName))
            delete errors[inputName];
        dispatch(setError(errors));
    }

    const formSubmit = (formEvent) => {
        formEvent.preventDefault();
        let formData = new FormData(formEvent.target);
        if (checkFormErrors(formData)) {
            dispatch(toggleChangeFornecedor(false));
            dispatch(showWarning(MSG.CHECK_ERRORS));
        } else
            saveFornecedor();
    }

    const checkFormErrors = (formData) => {
        //evita que envie o submit, tratando o submit internamente (sem atualizar a página)                
        let errors = {};
        for (const [name, value] of formData) {
            if (!value) {
                errors[name] = MSG.EMPTY_ERROR;
                continue;
            }
            if (name === 'CNPJ') {
                if (!validateCNPJ(value)) {
                    errors[name] = MSG.CNPJ_ERROR;
                }
            }
            //se não for dado relativo ao fornecedor, analisa o valor inserido
            if (!tiposInfo.includes(name)) {
                if (!validateMoney(value)) {
                    errors[name] = MSG.FORMATO_ERROR;
                }
            }
        }
        errors = { ...fornecedorState.errors, ...errors };
        dispatch(setError(errors));

        return (Object.keys(errors).length !== 0) ? true : false;
    }

    const saveFornecedor = () => {
        toggleLoader(true);
        let tipoServico = tiposInfo[0];
        let tipoSelected = fornecedorState.tipoSelected;
        let listaTipos = [...fornecedorState.tipos];
        let data = {
            fornecedor: fornecedorState.fornecedor,
            precos: fornecedorState.precos,
        }

        if (tipoSelected !== fornecedorState.fornecedor[tipoServico]) {
            listaTipos.push(fornecedorState.fornecedor[tipoServico]);
            dispatch(setTiposOS(listaTipos));
        }

        fornecedores.saveFornecedor(fornecedorState.fornecedor[tipoServico], data, listaTipos)
            .then(() => {
                dispatch(toggleChangeFornecedor(false));
                toggleLoader(false);
                if (tipoSelected !== fornecedorState.fornecedor[tipoServico])
                    deleteFornecedor();
                else
                    dispatch(showWarning(MSG.SAVE_SUCCESS));
            })
            .catch((error) => {
                dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                dispatch(toggleChangeFornecedor(false));
                toggleLoader(false);
            })
    }


    //apaga dados salvando nulo no caminho do tipo de servico
    //atualiza lista salvando a lista após retirar o tipo de servico da lista
    const deleteFornecedor = () => {
        toggleLoader(true);
        let tipoServico = fornecedorState.tipoSelected;
        fornecedores.getTipoOSList()
            .then(list => {
                let tipos = list.filter(tipo => tipo !== tipoServico);
                fornecedores.saveFornecedor(tipoServico, null, tipos)
                    .then(() => {
                        dispatch(toggleChangeFornecedor(false));
                        newEdit();
                        toggleLoader(false);
                        dispatch(showWarning(MSG.SAVE_SUCCESS));
                    })
                    .catch((error) => {
                        dispatch(toggleChangeFornecedor(false));
                        toggleLoader(false);
                        dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                    })
            })
            .catch((error) => {
                dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                dispatch(toggleChangeFornecedor(false));
                toggleLoader(false);
            })
    }

    return (
        <form className="form-fornecedor" onSubmit={e => formSubmit(e)}>
            <Loader isActive={isLoaderActive} />
            {warning.show ? <Warning /> : null}
            <h1>Editar serviço</h1>
            <div className="form-fornecedor-dados">
                <div className='form-fornecedor-select-container'>
                    <span className='form-fornecedor-select-label'>Tipo de serviço</span>
                    {checkTiposList()
                        ? <select className='form-fornecedor-select' onChange={e => handleServiceChoice(e.target.value)} disabled={!fornecedorState.ready} value={fornecedorState.isTipoSelected ? fornecedorState.tipo : ''}>
                            <option value=''>Selecione o tipo de serviço</option>
                            {fornecedorState.tipos.map((tipo, index) =>
                                <option key={index} value={tipo}>{tipo}</option>)}
                        </select>
                        : <select><option>{MSG.TIPOS_EMPTY}</option></select>}
                </div>
                {fornecedorState.isTipoSelected ?
                    <>
                        {tiposInfo.map((tipoInfo, index) => {
                            return <div key={index}>
                                <div className='form-fornecedor-input-container'>
                                    <span className='form-fornecedor-input-label'>{tipoInfo}</span>
                                    <input className='form-fornecedor-input' name={tipoInfo} value={fornecedorState.fornecedor[tipoInfo]} onChange={e => setFornecedorInfo(e)} />
                                    <p className='input-fornecedor-error'>{fornecedorState.errors[tipoInfo]}</p>
                                </div>
                                {index == 0 ? <><br /><br /><h4>Fornecedor</h4></> : null}
                            </div>
                        })}
                        <h4>Preços</h4>
                        {Object.keys(fornecedorState.precos).map((tipocarro, index) =>
                            <div className='form-fornecedor-input-container' key={index}>
                                <span className='form-fornecedor-input-label'>{tipocarro}</span>
                                <input className='form-fornecedor-input form-fornecedor-input-preco' name={tipocarro} value={fornecedorState.precos[tipocarro]} onChange={e => setFornecedorPreco(e)} />
                                <p className='input-fornecedor-error'>{fornecedorState.errors[tipocarro]}</p>
                            </div>
                        )}
                        <ButtonEditFornecedorContainer
                            deleteFornecedor={deleteFornecedor}
                        />
                    </> : null}
            </div>
        </form>
    )
}

const AddService = () => {

    const [isLoaderActive, toggleLoader] = useState(false);
    const dispatch = useDispatch();
    const fornecedorState = useSelector(selectFornecedor);
    const warning = useSelector(selectWarning);
    const tiposcarros = ['AMBULANCIA', 'AUTOMOVEL', 'BASE_MOVEL', 'CAMINHAO_FURGAO', 'CAMINHAO_TOCO', 'MAQUINAS_DIVERSAS', 'MECANICO_OPERACIONAL', 'MICRO_ONIBUS', 'ONIBUS', 'ONIBUS_ELETRICO', 'PICK_UP_CABINE_DUPLA', 'PICK_UP_CABINE_SIMPLES', 'REBOQUE', 'TRATOR', 'UTILITARIO_PASSAGEIRO'];
    const MSG = {
        CNPJ_ERROR: 'Formato: 00.000.000/0000-00',
        FORMATO_ERROR: 'Formato: 0000.00',
        EMPTY_ERROR: 'Obrigatório',
        CHECK_ERRORS: { title: 'Atenção!', text: 'Verifique os erros de preenchimento' },
        SAVE_SUCCESS: { title: 'Atenção!', text: 'Dados salvos com sucesso' },
    }
    const tiposInfo = ['Nome do serviço', 'Nome do fornecedor', 'Endereço', 'CNPJ'];

    useEffect(() => {
        newEdit();
    }, [])

    const newEdit = () => {
        dispatch(clearStateFornecedor());
        toggleLoader(true);
        fornecedores.getTipoOSList()
            .then(list => {
                if (list)
                    dispatch(setTiposOS(list));
                toggleLoader(false);
            })
    }

    const setFornecedorInfo = (e) => {
        if (!e.target.value) {
            let fornecedor = {
                ...fornecedorState.fornecedor,
                [e.target.name]: e.target.value,
            }
            let precos = fornecedorState.precos;
            dispatch(setFornecedor({ fornecedor, precos }))
            dispatch(toggleChangeFornecedor(false));
        } else {
            if (e.target.name === 'CNPJ')
                e.target.value = maskCNPJ(e.target.value);
            let fornecedor = {
                ...fornecedorState.fornecedor,
                [e.target.name]: e.target.value,
            }
            let precos = fornecedorState.precos;
            dispatch(setFornecedor({ fornecedor, precos }));
            dispatch(toggleChangeFornecedor(true));
        }
        //remove errors onChange (check again onSubmit)
        removeError(e.target.name);
    }

    const setFornecedorPreco = (e) => {
        e.target.value = maskDecimal(e.target.value);
        let precos = {
            ...fornecedorState.precos,
            [e.target.name]: e.target.value,
        }
        let fornecedor = fornecedorState.fornecedor;
        dispatch(setFornecedor({ fornecedor, precos }));
        removeError(e.target.name);
        dispatch(toggleChangeFornecedor(true));
    }

    const removeError = (inputName) => {
        let errors = { ...fornecedorState.errors };
        if (errors.hasOwnProperty(inputName))
            delete errors[inputName];
        dispatch(setError(errors));
    }

    const formSubmit = (formEvent) => {
        formEvent.preventDefault();
        let formData = new FormData(formEvent.target);
        if (checkFormErrors(formData)) {
            dispatch(toggleChangeFornecedor(false));
            dispatch(showWarning(MSG.CHECK_ERRORS));
        } else
            saveFornecedor();
    }

    const checkFormErrors = (formData) => {
        //evita que envie o submit, tratando o submit internamente (sem atualizar a página)                
        let errors = {};
        for (const [name, value] of formData) {
            if (!value) {
                errors[name] = MSG.EMPTY_ERROR;
                continue;
            }
            if (name === 'CNPJ') {
                if (!validateCNPJ(value)) {
                    errors[name] = MSG.CNPJ_ERROR;
                }
            }
            //se não for dado relativo ao fornecedor, analisa o valor inserido
            if (!tiposInfo.includes(name)) {
                if (!validateMoney(value)) {
                    errors[name] = MSG.FORMATO_ERROR;
                }
            }
        }
        errors = { ...fornecedorState.errors, ...errors };
        dispatch(setError(errors));

        return (Object.keys(errors).length !== 0) ? true : false;
    }

    const saveFornecedor = () => {
        toggleLoader(true);
        let tipoServico = tiposInfo[0];
        let array = fornecedorState.tipos.concat(fornecedorState.fornecedor[tipoServico]);
        let list = [...new Set(array)];
        dispatch(setTiposOS(list));
        let data = {
            fornecedor: fornecedorState.fornecedor,
            precos: fornecedorState.precos,
        }
        fornecedores.saveFornecedor(fornecedorState.fornecedor[tipoServico], data, list)
            .then(() => {
                dispatch(showWarning(MSG.SAVE_SUCCESS));
                dispatch(toggleChangeFornecedor(false));
                toggleLoader(false);
            })
            .catch((error) => {
                dispatch(showWarning({ title: 'Atenção!', text: error.message }));
                dispatch(toggleChangeFornecedor(false));
                toggleLoader(false);
            });
    }

    return (
        <form className="form-fornecedor" onSubmit={e => formSubmit(e)}>
            <Loader isActive={isLoaderActive} />
            {warning.show ? <Warning /> : null}
            <h1>Adicionar serviço</h1>
            <div className="form-fornecedor-dados">
                {tiposInfo.map((tipoInfo, index) => {
                    return <div key={index}>
                        <div className='form-fornecedor-input-container'>
                            <span className='form-fornecedor-input-label'>{tipoInfo}</span>
                            <input className='form-fornecedor-input' name={tipoInfo} value={fornecedorState.fornecedor[tipoInfo]} onChange={e => setFornecedorInfo(e)} />
                            <p className='input-fornecedor-error'>{fornecedorState.errors[tipoInfo]}</p>
                        </div>
                        {index == 0 ? <><br /><br /><h4>Fornecedor</h4></> : null}
                    </div>
                })}
                <h4>Preços</h4>
                {tiposcarros.map((tipocarro, index) =>
                    <div className='form-fornecedor-input-container' key={index}>
                        <span className='form-fornecedor-input-label'>{tipocarro}</span>
                        <input className='form-fornecedor-input form-fornecedor-input-preco' name={tipocarro} value={fornecedorState.precos.tipocarro} onChange={e => setFornecedorPreco(e)} />
                        <p className='input-fornecedor-error'>{fornecedorState.errors[tipocarro]}</p>
                    </div>)}
                <ButtonAddFornecedorContainer />
            </div>
        </form>
    )
}

const ButtonEditFornecedorContainer = (props) => {

    const fornecedorState = useSelector(selectFornecedor);

    return (
        <>
            {fornecedorState.isTipoSelected
                ? <div className="button-fornecedor-container">
                    {fornecedorState.change
                        ? <button type='submit' className="button-fornecedor-save">
                            Salvar
                        </button>
                        : null}
                    <button type='button' className="button-fornecedor-delete" onClick={props.deleteFornecedor}>
                        Excluir
                    </button>
                </div > : null}
        </>
    )
}

const ButtonAddFornecedorContainer = (props) => {

    const fornecedorState = useSelector(selectFornecedor);

    return (
        <>
            {fornecedorState.change
                ? < div className="button-fornecedor-container" >
                    <button type='submit' className="button-fornecedor-save">
                        Salvar
                    </button>
                </div > : null}
        </>
    )
}


export default Admin;