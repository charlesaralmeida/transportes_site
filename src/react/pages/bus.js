import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/transportes.css';
import { ContentBar, Content } from '../component/content.js';
import { Agenda } from './agenda';

export class Bus extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    side_menu_opt = [
        { external: false, link: 'procedimentos', value: <Procedimentos />, text: 'Procedimentos' },
        { external: false, link: 'veiculos', value: <Veiculos />, text: 'Tipos de veículos' },
        { external: false, link: 'valores', value: <Valores />, text: 'Valores' },
        { external: true, link: 'https://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_088_2016.pdf', value: 'Instrução Normativa DGA nº 088/2016' },
    ];

    render() {
        return (
            <div className="content-container">
                <ContentBar
                    text='Ônibus, micro-ônibus e vans'
                />
                <Content
                    side_menu_opt={this.side_menu_opt}
                />

            </div>
        );
    }
}

class Procedimentos extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>
                    Procedimentos</p>
                <br />
                <br />
                <p>Os interessados em solicitar tais serviços devem ser cadastrados pela Transportes DGA de acordo
                    com os procedimentos indicados na seguinte seção: <Link className='btn content-subtitle link-style'
                        to='./../../agenda#cadastro_agenda'>Agenda de Transportes</Link></p>
                <p>A solicitação deverá ser efetuada com 16 (dezesseis) dias de antecedência ao início da viagem.
                </p>
                <br />
                <hr />

                <p className="content-subtitle">Solicitante</p>
                <p style={{ marginLeft: '2%' }}>Usuário da Unidade/Órgão autorizado a requisitar serviços de transportes
                    na Agenda Eletrônica</p>
                <p style={{ marginLeft: '2%' }}>Viagens para o litoral paulista e demais cidades que necessitem de
                    autorização de entrada, caberá ao Usuário/Solicitante obter a autorização junto ao Órgão competente.</p>
                <br />
                <hr />

                <p className='content-subtitle'>Responsável Indicado</p>
                <p style={{ marginLeft: '2%' }}>Passageiro indicado no Formulário de Solicitações da Agenda Eletrônica
                    como responsável pelo grupo ao qual o motorista se
                    reportará para orientações no decorrer da viagem.</p>
                <p style={{ marginLeft: '2%' }}>Para todas as viagens contratadas a Unidade/Órgão deverá indicar nome de
                    02 (dois) responsáveis pelo grupo</p>
                <p style={{ marginLeft: '2%' }}>Somente os responsáveis pelo grupo poderão realizar alterações de
                    percurso/itinerário durante o atendimento.</p>
                <p style={{ marginLeft: '2%' }}>Para tanto, deverá constar previamente no campo
                    “Informações Adicionais” do Formulário de Solicitações da Agenda Eletrônica, a seguinte informação:</p>
                <p style={{ marginLeft: '4%' }}>"O responsável poderá alterar o percurso/quilometragem da solicitação."</p>
                <br />
                <hr />

                <p className="content-subtitle">Solicitar viagem</p>
                <ol>
                    <li>
                        <p>
                            A Unidade/Órgão deverá elaborar um itinerário com os locais e seus respectivos endereços
                            (incluindo o CEP), assim como os horários de permanência em cada um dos mesmos, para que:</p>
                        <ul>
                            <li>A empresa contratada efetue a respectiva autorização da viagem junto aos Órgãos
                                competentes;</li>
                            <li>Seja previamente definido o valor da viagem.</li>
                        </ul>
                    </li>
                    <br />
                    <br />
                    <li>
                        <p>O Solicitante deverá obter junto ao responsável da viagem, além das informações já
                            contidas no formulário da Agenda Eletrônica, qualquer tipo de situação especifica ou eventual, tais como:</p>
                        <ul>
                            <li>Verificar se haverá necessidade de percurso específico até o destino, pois a rota
                                pré-estabelecida pela empresa será a mais curta e segura;</li>
                            <li>Especificações do terreno (exemplo: casos de estrada de terra ou demais dificuldades
                                de acesso);
                            </li>
                        </ul>
                    </li>
                    <br />
                    <br />
                    <li>
                        <p>A Unidade/Órgão deverá elaborar uma <strong style={{ color: 'rgb(190,6,6)' }}>Lista de
                            Passageiros</strong>, na forma de uma planilha eletrônica em
                            Excel (ou compatível), contendo na primeira coluna os <strong>Nomes dos
                                Passageiros</strong>, na
                            segunda coluna o <strong>Número do RG ou Passaporte</strong>, e na terceira, o <strong>Órgão Emissor do
                                RG ou País de Origem </strong>(conforme regulamentação da CET/ARTESP/ANTT).</p>
                        <ul>
                            <li>A Lista de Passageiros, por Solicitação, deverá ser enviada para o e-mail
                                transportes@dga.unicamp.br, impreterivelmente com 03 (três) dias úteis de
                                antecedência ao Início da viagem.
                                O campo “Assunto” do e-mail deverá conter o Número da Solicitação.
                            </li>
                            <li>O atraso no envio da lista em questão poderá impossibilitar a realização da viagem.
                            </li>
                        </ul>

                    </li>
                </ol>
                <br />
                <hr />
                <p className="content-subtitle">Cancelar viagem</p>
                <br />
                <p style={{ marginLeft: '2%' }}>A Solicitação de Cancelamento da viagem, deverá ser efetuada com 2
                    (dois) dias úteis de antecedência ao Início da viagem.
                    Para cancelamentos de viagens fora deste prazo, será debitado
                    da Unidade/Órgão o valor integral da viagem.</p>
            </div>
        );
    }
}

class Veiculos extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>Tipos de veículos</p>
                <br />
                <br />

                <div className='table-onibus-container'>
                    <table className='table-onibus'>
                        <tr>
                            <th>Tipo de veículo</th>
                            <th>Capacidade</th>
                        </tr>
                        <tr>
                            <td>Ônibus Executivo (com ar-condicionado/com banheiro)*</td>
                            <td>46 passageiros</td>
                        </tr>
                        <tr>
                            <td>Ônibus Convencional (sem ar-condicionado/sem banheiro)</td>
                            <td>46 passageiros</td>
                        </tr>
                        <tr>
                            <td>Micro-ônibus (com ar-condicionado)</td>
                            <td>26 passageiros</td>
                        </tr>
                        <tr>
                            <td>Van Executiva (com ar-condicionado)</td>
                            <td>15 passageiros</td>
                        </tr>
                    </table>
                    <br />
                    <br />
                    <p>*Ônibus Executivo não disponível para viagens municipais (viagens realizadas exclusivamente
                        dentro do município de Campinas)</p>
                </div>

            </div>
        );
    }
}

class Valores extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>Valores</p>
                <br />
                <br />
                <p>O valor da viagem será calculado com base na quantidade de
                    quilômetros rodados multiplicado pelo valor do quilometro rodado da respectiva faixa de km em
                    que a viagem se enquadra, conforme tabela abaixo.</p>
                <br />
                <p>Para cálculo da quantidade de quilômetros da viagem, a referência de início e fim da viagem
                    será sempre a Unicamp, campus Campinas, Praça das Bandeiras, s/nº, CEP 13083-970, Campinas/SP.
                </p>
                <br />
                <TableValores />
            </div >
        );
    }
}

class TableValores extends React.Component {
    header = ['Tipo de veículo', 'Faixa de Km', 'Valor Unitário/Km'];

    items = [
        { header: 'Ônibus Executivo', instances: [{ header: 'Até 50', value: 'R$ 21,57' }, { header: '51 a 100', value: 'R$ 14,02' }, { header: '101 a 200', value: 'R$ 8,38' }, { header: '201 a 300', value: 'R$ 7,43' }, { header: '301 a 500', value: 'R$ 6,51' }, { header: '501 a 1000', value: 'R$ 6,32' }, { header: 'Acima de 1000', value: 'R$ 6,04' },] },
        { header: 'Ônibus Convencional', instances: [{ header: 'Até 50', value: 'R$ 18,71' }, { header: '51 a 100', value: 'R$ 12,16' }, { header: '101 a 200', value: 'R$ 7,43' }, { header: '201 a 300', value: 'R$ 6,34' }, { header: '301 a 500', value: 'R$ 5,58' }, { header: '501 a 1000', value: 'R$ 5,38' }, { header: 'Acima de 1000', value: 'R$ 5,11' },] },
        { header: 'Micro-ônibus', instances: [{ header: 'Até 50', value: 'R$ 17,26' }, { header: '51 a 100', value: 'R$ 11,22' }, { header: '101 a 200', value: 'R$ 6,51' }, { header: '201 a 300', value: 'R$ 5,58' }, { header: '301 a 500', value: 'R$ 4,65' }, { header: '501 a 1000', value: 'R$ 4,47' }, { header: 'Acima de 1000', value: 'R$ 4,18' },] },
        { header: 'Van Executiva', instances: [{ header: 'Até 50', value: 'R$ 14,38' }, { header: '51 a 100', value: 'R$ 9,35' }, { header: '101 a 200', value: 'R$ 5,58' }, { header: '201 a 300', value: 'R$ 4,63' }, { header: '301 a 500', value: 'R$ 3,68' }, { header: '501 a 1000', value: 'R$ 3,56' }, { header: 'Acima de 1000', value: 'R$ 3,29' },] },
    ];

    render() {
        return (
            <div className='table-onibus-container'>
                <table className='table-onibus'>
                    <thead>
                        <TableValoresHeader
                            header={this.header} />
                    </thead>
                    <tbody>
                        <TableValoresBody
                            items={this.items} />
                    </tbody>
                </table>
            </div>
        );
    }
}

class TableValoresHeader extends React.Component {
    render() {
        return (
            <tr>
                {this.props.header.map((header, index) => {
                    return <th key={index}>{header}</th>
                })}
            </tr>
        );
    }
}

class TableValoresBody extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.items.map((item, index) => {
                        return <TableValoresRow key={index} item={item} />
                    })
                }
            </>
        );
    }
}

class TableValoresRow extends React.Component {
    render() {
        return (
            <>
                <tr>
                    <td rowSpan="8">{this.props.item.header}</td>
                </tr>
                {this.props.item.instances.map((instance, index) => {
                    return <tr key={index}>
                        <td key={instance.header}>{instance.header}</td>
                        <td key={instance.value}>{instance.value}</td>
                    </tr>
                })}

            </>
        );
    }
}