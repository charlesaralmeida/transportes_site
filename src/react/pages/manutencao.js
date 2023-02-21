//files
import '../../styles/transportes.css';

//react
import React, { useEffect, useRef, useState } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { setOSExtraData, setOSNumber, setOpenOS, setFornecedor, selectManutencao, setPrice, clearState, toggleReady, setFrota, setTiposOS, toggleTipoSelected, toggleFrotaSelected, setDataFrota, setTipoServico } from '../../redux/manutencaoSlice';
import { showWarning, selectWarning } from '../../redux/warningSlice'
//components
import { ContentBar } from '../component/content.js';
import Loader from '../component/loader';
import Warning from '../component/warning';
//scripts
import manutencao from '../../js/manutencao';
import fornecedores from '../../js/fornecedores';

const Manutencao = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="content-container">
            <ContentBar
                text='Ordem de Serviço'
            />
            <ContentManutencao />
        </div>
    );

}

const ContentManutencao = () => {

    const dispatch = useDispatch();
    const warning = useSelector(selectWarning);

    const MSG = {
        NOT_CONNECTED: { title: 'Atenção!', text: 'É necessário se conectar com o usuário @UNICAMP.BR para acessar esta página.' }
    }

    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user.isLogged && user.isLoginChecked)
            dispatch(showWarning(MSG.NOT_CONNECTED));
    }, [user.isLoginChecked])

    return (
        <div className="content">
            <div className="content-content-lonely">
                {user.isLogged
                    ? <FormOSContainer />
                    : warning.show ? <Warning /> : null
                }
            </div>
        </div>

    )
}

const FormOSContainer = () => {
    const titleRef = useRef(null);
    return (
        <div className='form-os-container'>
            <h1 ref={titleRef} tabIndex={'1'} className='form-os-title'>Emitir Ordem de Serviço</h1>
            <FormOS />
        </div>
    )
}

const FormOS = () => {

    const [isLoaderActive, toggleLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const manutencaoState = useSelector(selectManutencao);
    const user = useSelector(selectUser);

    const MSG = {
        TIPOS_EMPTY: "Não existem serviços cadastrados",
    }

    useEffect(() => {
        newOS();
    }, [])

    const newOS = () => {
        toggleLoader(true);
        dispatch(clearState());
        manutencao.getTipoOSList()
            .then(list => {
                if (list)
                    dispatch(setTiposOS(list))
            })
            .then(() => toggleLoader(false));

    }

    const checkTiposOSList = () => (manutencaoState.tiposOSList.length !== 0) ? true : false;

    const handleServiceChoice = (value) => {        
        if (!value) {
            newOS();
        } else {
            toggleLoader(true);
            if (!manutencaoState.frotaList.length) {
                manutencao.getFrotaList()
                    .then(list => {
                        dispatch(setTipoServico(value));
                        dispatch(setFrota(list));
                        dispatch(toggleTipoSelected(true));
                    })
                    .then(() => toggleLoader(false));
            } else {
                dispatch(setTipoServico(value));
                dispatch(toggleTipoSelected(true));
                toggleLoader(false);
            }
        }
    }

    const handleFrotaChoice = (value) => {
        if (!value) {
            dispatch(toggleFrotaSelected(false));
        } else {
            toggleLoader(true);
            manutencao.getFrotaData(value)
                .then(data => {
                    dispatch(setDataFrota(data));
                    dispatch(toggleFrotaSelected(true));
                    fornecedores.getFornecedor(manutencaoState.tipoServico)
                        .then(fornecedor => {
                            dispatch(setPrice(fornecedor.precos[data.Tipo]));
                            dispatch(setFornecedor(fornecedor.fornecedor));
                            toggleLoader(false);
                        })
                })
                .catch(error => error);
        }
    }

    const saveOS = () => {
        toggleLoader(true);
        manutencao.getLastOSNumber()
            .then(number => {
                number+=1;
                dispatch(setOSNumber(number));
                dispatch(setOpenOS());
                const frotaDados = manutencaoState.frotaData;
                const service = {
                    tipo: manutencaoState.tipoServico,
                    preco: manutencaoState.preco,
                    fornecedor: manutencaoState.fornecedor,
                }
                let date = manutencao.getCurrentDate();                
                let auth_code = manutencao.generateRandomCode();
                dispatch(setOSExtraData({date, auth_code}));
                manutencao.generateOSBody(number, user, frotaDados, service, date, auth_code);
                manutencao.saveOS(number, user, frotaDados, service, date, auth_code)
                    .then(() => {
                        dispatch(toggleReady(false));
                        toggleLoader(false);
                    })
            })
    }

    const printOS = () => {
        toggleLoader(true);
        const number = manutencaoState.OSNumber;
        const frotaDados = manutencaoState.frotaData;
        const service = {
            tipo: manutencaoState.tipoServico,
            preco: manutencaoState.preco,
            fornecedor: manutencaoState.fornecedor,
        }
        let date = manutencaoState.date;
        let auth_code = manutencaoState.authCode;
        manutencao.generateOSBody(number, user, frotaDados, service, date, auth_code);
        toggleLoader(false);        
    }

    return (
        <>
            <div className="form-os">
                <Loader isActive={isLoaderActive} />
                <div className="form-os-dados">
                    <div className='form-os-select-container'>
                        <span className='form-os-select-label'>Tipo de serviço</span>
                        {checkTiposOSList()
                            ? <select className='form-os-select' onChange={e => handleServiceChoice(e.target.value)} disabled={!manutencaoState.ready} value={manutencaoState.tipoSelected ? manutencaoState.tipoServico : ''}>
                                <option value=''>Selecione o tipo de serviço</option>
                                {manutencaoState.tiposOSList.map((tipo, index) =>
                                    <option key={index} value={tipo}>{tipo}</option>
                                )}
                            </select>
                            : <select><option>{MSG.TIPOS_EMPTY}</option></select>}
                    </div>
                    {manutencaoState.tipoSelected ?
                        <div className='form-os-select-container'>
                            <span className='form-os-select-label'>Frota nº</span>
                            <select className='form-os-select' onChange={e => handleFrotaChoice(e.target.value)} disabled={!manutencaoState.ready}>
                                <option value=''>Selecione o número da frota</option>
                                {manutencaoState.frotaList.map((frota, index) =>
                                    <option key={index} value={frota}>{frota}</option>
                                )}
                            </select>
                        </div>
                        : null}
                    {manutencaoState.frotaSelected ? <div className='form-os-input-container'><span className='form-os-input-label'>Placa</span><input className='form-os-input' disabled placeholder={manutencaoState.frotaData.Placa} /></div> : null}
                    {manutencaoState.frotaSelected ? <div className='form-os-input-container'><span className='form-os-input-label'>Modelo</span><input className='form-os-input' disabled placeholder={manutencaoState.frotaData.Modelo} /></div> : null}
                </div>
                <ButtonOSContainer newOS={newOS} saveOS={saveOS} printOS={printOS}/>
            </div>
        </>
    )
}

const ButtonOSContainer = (props) => {

    const dispatch = useDispatch();
    const manutencaoState = useSelector(selectManutencao);

    const saveOS = () => {
        dispatch(toggleReady(false));
    }

    return (
        <>
            {manutencaoState.frotaSelected
                ? <div className="button-os-container">
                    {manutencaoState.ready
                        ? <div className='button-os-container-before-save'>
                            <button className="button-os" onClick={props.saveOS}>Emitir</button>
                        </div>
                        : <div className='button-os-container-after-save'>
                            <button className="button-os" onClick={props.printOS}>Imprimir</button>
                            <button className="button-os" onClick={props.newOS}>Nova OS</button>
                        </div>}
                </div >
                : null}
        </>
    )
}

export default Manutencao;