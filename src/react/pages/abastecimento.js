import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostos, setPostos, setEstados, setCidades, selectEstados, selectCidades, clearState, clearCidades, clearEstados, selectCidadeOption, selectEstadoOption, setEstadoOption, setCidadeOption } from '../../redux/abastecimentoSlice';
import '../../styles/transportes.css';
import { ContentBar } from '../component/content.js';
import Firebase from '../../js/firebase';
import { makeTable, getAdressLink } from '../../js/resources';
import Loader from '../component/loader';

const CIDADES_PATH = '/Transportes/abastecimento/cidades';
const POSTOS_PATH = '/Transportes/abastecimento/postos';

export class Abastecimento extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="content-container">
                <ContentBar
                    text='Postos de combustíveis credenciados'
                />
                <ContentPostos />
            </div>
        );
    }
}

const ContentPostos = () => {

    const [isLoaderActive, toggleLoader] = useState(false);

    useEffect(() => {
        dispatch(clearState());
        getEstados();
    }, []);

    const estados = useSelector(selectEstados);
    const cidades = useSelector(selectCidades);
    const estadoOption = useSelector(selectEstadoOption);
    const cidadeOption = useSelector(selectCidadeOption);
    const postos = useSelector(selectPostos);    

    const dispatch = useDispatch();

    const getEstados = () => {
        toggleLoader(true);
        Firebase.readData(CIDADES_PATH)
            .then(result => {
                dispatch(clearState());
                let ufs = Object.keys(result);
                dispatch(setEstados(ufs));
                toggleLoader(false);
            });
    }

    const getCidades = (uf) => {
        toggleLoader(true);
        Firebase.readData(CIDADES_PATH + '/' + uf)
            .then(cidades => {
                dispatch(clearCidades());
                dispatch(setEstadoOption(uf));
                dispatch(setCidades(cidades));
                toggleLoader(false);
            });
    }

    const getPostos = (cidade) => {
        toggleLoader(true);
        Firebase.readData(POSTOS_PATH + '/' + estadoOption + '/' + cidade)
            .then(postos => {
                dispatch(setCidadeOption(cidade));
                dispatch(setPostos(postos));
                toggleLoader(false);
            });
    }

    const getTable = () => {
        let headers = ['Nome do Posto', 'Endereço', 'Cidade', 'Estado', 'Telefone'];

        let data = postos.map(posto => {
            let link_endereco = getAdressLink(posto.cidade, posto.endereco, posto.uf);
            let a_endereco = <a href={link_endereco} target='_blank' style={{ textDecoration: 'underline' }}>{posto.endereco}</a>;
            let link_fone = 'tel: ' + posto.fone;
            let a_fone = <a href={link_fone} target='_blank' style={{ textDecoration: 'underline' }}>{posto.fone}</a>;
            return { nome: posto.nome_fantasia, endereco: a_endereco, cidade: posto.cidade, uf: posto.uf, fone: a_fone }
        });
        return makeTable(headers, data);
    }

    return (
        <div className="content">
            <Loader isActive={isLoaderActive}/>
            <div className="content-content-lonely">
                <p style={{ paddingTop: '5%', paddingLeft: '5%', fontSize: '120%' }}>Empresa contratada: <span
                    style={{ color: 'rgb(190,6,6)', fontWeight: 'bold' }}>Prime Benefícios.</span></p>
                <div className="content-content-no-side-bar">
                    <div className="div_busca">
                        <div className="div_sel_cidade">
                            <label>Estado:<select onChange={(e) => getCidades(e.target.value)} value={estadoOption}>
                                <option value='0'>Selecione um Estado</option>
                                {estados.map((uf, index) => {
                                    return <option key={index} value={uf}>{uf}</option>
                                })}
                            </select></label>
                            <label>Cidade:<select onChange={(e) => getPostos(e.target.value)} value={cidadeOption}>
                                <option value='0'>Selecione uma cidade</option>
                                {cidades.map((cidade, index) => <option key={index} value={cidade}>{cidade}</option>)}
                            </select></label>
                        </div>
                    </div>

                    <div className='table-container'>
                        {postos.length ? getTable() : null}
                    </div>
                </div>
            </div>

        </div >
    );
}