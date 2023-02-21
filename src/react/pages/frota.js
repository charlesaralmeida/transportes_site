import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/transportes.css';
import { ContentBar, Content } from '../component/content.js';
import { openPage } from '../../js/resources';
import solic_credenciamento from '../../docs/Solicitacao_de_Credenciamento_Para_a_Conducao_de_Veiculo_Oficial_Anexo_I.doc';
import termo_responsabilidade from '../../docs/Termo_de_Responsabilidade_Para_a_Conducao_de_Veiculo_Oficial_Anexo_II.doc';

export class Frota extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    side_menu_opt = [
        { external: false, link: 'credenciamento', value: <Credenciamento />, text: 'Credenciamento de condutores' },
        { external: false, link: 'manutencao', value: <Manutencao />, text: 'Manutenção de veículos' },
        { external: false, link: 'lavagem', value: <Lavagem />, text: 'Lavagem de veículos' },
        { external: false, link: 'abastecimento', value: <Abastecimento />, text: 'Abastecimento de combustível' },
        { external: true, link: 'https://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_085_2015.pdf', value: 'Instrução Normativa DGA nº 085/2015' },
        { external: true, link: 'https://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_071_2009.pdf', value: 'Instrução Normativa DGA nº 071/2009' },
        { external: true, link: 'https://www.pg.unicamp.br/norma/1372/0', value: 'Resolução GR-017/2004' },
        { external: true, link: 'https://www.pg.unicamp.br/norma/16505/0', value: 'Resolução GR-023/2019' },
    ];

    render() {
        return (
            <div className="content-container">
                <ContentBar
                    text='Frota Oficial'
                />
                <Content
                    side_menu_opt={this.side_menu_opt}
                />

            </div>
        );
    }
}

class Credenciamento extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>
                    Credenciamento de condutores</p>
                <br />
                <p>Para a condução de veículos oficiais da Universidade é necessário o credenciamento do motorista
                    pela Transportes DGA.</p>
                <p>Podem ser credenciados:</p>
                <ul>
                    <li>Funcionários da FUNCAMP contratados na função de motorista</li>
                    <li>Funcionários da UNICAMP e FUNCAMP contratados em outras funções</li>
                    <li>Professores colaboradores e pesquisadores colaboradores</li>
                    <li>Professores convidados</li>
                    <li>Alunos da UNICAMP</li>
                </ul>
                <br />
                <p className='content-subtitle'>Tipos de credenciamento</p>
                <p style={{ marginLeft: '2%', fontWeight: 'bold' }}>Permanente:</p>
                <ul style={{ marginLeft: '7%' }}>
                    <li>Servidores da UNICAMP e FUNCAMP</li>
                    <li>Credenciamento válido enquanto a CNH estiver válida</li>
                </ul>
                <p style={{ marginLeft: '2%', fontWeight: 'bold' }}>Eventual:</p>
                <ul style={{ marginLeft: '7%' }}>
                    <li>Professores colaboradores, pesquisadores colaboradores e alunos da Universidade sem vínculo
                        empregatício</li>
                    <li>Credenciamento válido conforme autorização de acordo com a duração do trabalho vinculado à
                        pesquisa
                    </li>
                </ul>
                <br />
                <p className='content-subtitle'>Procedimentos</p>
                <br />
                <p style={{ marginLeft: '2%', fontWeight: 'bold' }}>Servidores da Unicamp:</p>
                <ol style={{ marginLeft: '7%' }}>
                    <li>Preencher e assinar a <a className='link-style'
                        href={solic_credenciamento}>Solicitação de Credenciamento para Condução De
                        Veículo Oficial</a></li>
                    <li>Preencher e assinar o <a className='link-style'
                        href={termo_responsabilidade}>Termo de responsabilidade</a></li>
                    <li>Juntamente com ambos os formulários, enviar a documentação do credenciado:
                        <ul>
                            <li>CNH definitiva (não aceita provisória)</li>
                            <li>Carteira funcional</li>
                        </ul>
                    </li>
                    <li>Todos os documentos e formulários devem ser encaminhados digitalizados por e-mail:
                        <strong>transportes@dga.unicamp.br</strong>
                    </li>

                </ol>
                <br />
                <p style={{ marginLeft: '2%', fontWeight: 'bold' }}>Funcionários da Funcamp:</p>
                <ol style={{ marginLeft: '7%' }}>
                    <li>Preencher e assinar a <a className='link-style' color='black'
                        href={solic_credenciamento}>Solicitação de Credenciamento para Condução de Veículo Oficial</a></li>
                    <li>Preencher e assinar o <a className='link-style'
                        href={termo_responsabilidade}>Termo de responsabilidade</a></li>
                    <li>Juntamente com ambos os formulários, enviar a documentação do credenciado:
                        <ul>
                            <li>CNH definitiva (não aceita provisória)</li>
                            <li>Carteira funcional</li>
                            <li><strong>Termo de responsabilidade emitido pela FUNCAMP</strong></li>
                        </ul>
                    </li>
                    <li>Todos os documentos e formulários devem ser encaminhados digitalizados por e-mail:
                        <strong>transportes@dga.unicamp.br</strong></li>

                </ol>
                <br />
                <p style={{ marginLeft: '2%', fontWeight: 'bold' }}>Credenciamento eventual:</p>
                <ol style={{ marginLeft: '7%' }}>
                    <li>Preencher e assinar o modelo de requerimento contido no Anexo I da <span className='link-style'
                        onClick={openPage('https://www.pg.unicamp.br/norma/1372/0')}>
                        Resolução GR-017/2004</span></li>
                    <li>Juntamente com o requerimento, enviar a documentação do credenciado:
                        <ul>
                            <li>CNH definitiva (não aceita provisória)</li>
                            <li>Carteira funcional ou RA, conforme o caso</li>
                            <li>Comprovação de existência de seguro contra acidentes pessoais</li>
                        </ul>
                    </li>
                    <li>Todos os documentos e o requerimento devem ser encaminhados digitalizados por e-mail:
                        <strong>transportes@dga.unicamp.br</strong></li>
                </ol>
            </div>
        );
    }
}

class Manutencao extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>
                    Manutenção de veículos</p>
                <br />
                <br />
                <p>A manutenção de veículos é agendada através de solicitação do expedidor da Unidade/Órgão
                    encaminhada ao
                    e-mail <span
                        style={{ color: 'rgb(190,6,6)', fontWeight: 'bold' }}>manutencaoveicular@dga.unicamp.br</span>.
                </p>
                <p>Necessário somente informar:</p>
                <ul>
                    <li>Número da frota ou placa do veículo</li>
                    <li>Defeito ou motivo da manutenção</li>
                </ul>
                <p><br /><span className='link-style'
                    onClick={openPage('http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_071_2009.pdf')}>
                    Instrução Normativa DGA nº 071/2009</span> </p>
            </div>
        );
    }
}

class Lavagem extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>
                    Lavagem de veículos</p>
                <br />
                <ul>
                    <li>A lavagem de veículos é realizada através de ordem de serviço emitida através do menu acima<Link className='btn content-subtitle link-style' style={{ marginLeft: '2%' }} to='./../../manutencao'>ORDEM DE SERVIÇO</Link></li>                                        
                </ul>
            </div>
        );
    }
}

class Abastecimento extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>
                    Abastecimento de combustível</p>
                <br />
                <ul>
                    <li>O abastecimento de combustível é realizado através de uma rede credenciada de postos
                        conforme contratação formalizada através de processo licitatório.</li>
                    <li>O veículo deve ser abastecido por condutor credenciado da Unidade/Órgão através do cartão
                        respectivo a cada veículo.</li>
                    <li>A lista de postos credenciados pode ser consultada no menu acima<Link className='btn content-subtitle link-style' style={{ marginLeft: '2%' }} to='./../../abastecimento'>POSTOS DE COMBUSTÍVEL</Link></li>
                </ul>
                <p><br /><span class='link-style'
                    onClick={openPage('http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_071_2009.pdf')}>
                    Instrução Normativa DGA nº 071/2009</span> </p>
            </div >
        );
    }
}