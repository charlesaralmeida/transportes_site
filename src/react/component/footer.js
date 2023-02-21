import React from 'react'
import Modal from './modal'
import '../../styles/transportes.css'
import maps_icon from '../../img/Google-Maps-logo.png'
import { openPage } from '../../js/resources'
import form_diarias from '../../docs/Solicitacao_de_Antecipacao_de_Despesa_de_viagem.xls'
import form_cadastro_gestor from '../../docs/Cadastro_de_usuario_usetaxi.doc'
import form_termo_responsabilidade from '../../docs/Termo_de_Responsabilidade_Para_a_Conducao_de_Veiculo_Oficial_Anexo_II.doc';
import form_solic_credenciamento from '../../docs/Solicitacao_de_Credenciamento_Para_a_Conducao_de_Veiculo_Oficial_Anexo_I.doc';

export class Footer extends React.Component {
    containers = [<Comunicados />, <TransportesDGA />];

    render() {
        return (
            <>
                <FooterContainer
                    containers={this.containers} />
            </>
        );
    }
}

class FooterContainer extends React.Component {
    render() {
        return (
            <div id='contato' className="footer-container">
                {this.props.containers.map((container, index) => {
                    return <div key={index}>
                        {container}
                    </div>
                })
                }
                <Contato />
            </div>
        );
    }
}

class Comunicados extends React.Component {

    items = [{ text: 'Leilão de veículos', modal: <ModalLeilao /> }];

    render() {

        return (
            <FooterColumn
                title={'Comunicados'}
                items={this.items} />
        );
    }
}

class TransportesDGA extends React.Component {

    items = [
        { text: 'Sobre', modal: <ModalAbout /> },
        { text: 'Equipe', modal: <ModalEquipe /> },
        { text: 'Formulários', modal: <ModalFormularios /> },
    ];

    render() {

        return (
            <FooterColumn
                title={'Transportes DGA'}
                items={this.items} />
        );
    }
}

class Contato extends React.Component {

    icon_style = {
        width: '8%',
    }

    render() {
        return (
            <div className="footer-container-col">
                <p className='footer-container-col-title'><b>Fale com a gente</b></p>
                <div className="footer-item">
                    <p>(19) 3521-4921</p>
                    <p>transportes@dga.unicamp.br</p>
                    <div className="footer-item-contact btn">
                        <p onClick={openPage('https://goo.gl/maps/imNqTzbAC3tyAGJU6')}>Rua Josué de Castro,
                            140 <br /> Cidade Universitária "Zeferino Vaz"</p>
                        <img style={this.icon_style} onClick={openPage('https://goo.gl/maps/imNqTzbAC3tyAGJU6')}
                            src={maps_icon} />
                    </div>
                    <p>Barão Geraldo - Campinas/SP</p>
                </div>
            </div>
        );
    }
}


class FooterColumn extends React.Component {
    render() {
        return (
            <div className="footer-container-col">
                <p className='footer-container-col-title'><b>{this.props.title}</b></p>
                {this.props.items.map((item, index) => {
                    return <FooterItem
                        key={index}
                        text={item.text}
                        modal={item.modal}
                    />
                })}
            </div>
        );
    }
}


class FooterItem extends React.Component {
    state = { show_modal: false }

    openModal = () => {
        this.setState({ show_modal: true });
    }

    closeModal = () => {
        this.setState({ show_modal: false });
    }

    modal = <Modal modal={this.props.modal} closeModal={this.closeModal} />;

    render() {
        return (
            <div className="footer-item">
                <ul>
                    <li className="btn" onClick={this.openModal}>{this.props.text}</li>
                </ul>
                {this.state.show_modal ? this.modal : false}
            </div>
        );
    }
}

class ModalLeilao extends React.Component {
    render() {
        return (
            <div className="modal-content">
                <div className="modal-bar-content">
                    <p>Leilão de veículos</p>
                </div>
                <div className="modal-content-content">
                    <h4></h4>
                    <p>Estamos atualmente realizando o processo de credenciamento de leiloeiros para a alienação dos
                        veículos disponíveis na Universidade.</p><br />
                    <p>O recolhimento de tais veículos leva em consideração os seguintes fatores:</p>
                    <br />
                    <ul>
                        <li>Idade, quilometragem e estado de conservação do veículo</li>
                        <li>Frequência de uso</li>
                        <li>Conveniência do veículo próprio em relação às demais modalidades de transporte
                            disponíveis
                        </li>
                    </ul><br />
                    <p>Considerando os fatores elencados acima, em muitos casos os recursos obtidos no leilão podem ser
                        melhores aproveitados se reinvestidos em outras prioridades.</p><br />
                    <p>Além disso, observados certos critérios e em especial o Art. 12 da
                        <span className="btn link-style"
                            onClick={openPage('https://www.pg.unicamp.br/norma/16505/0')}>
                            Resolução GR 23/2019 </span>, o veículo próprio pode ser substituído por veículos locados, os
                        quais possuem diversas vantagens.</p><br />
                    <p>Caso sua Unidade/Órgão possua veículos que poderiam ser recolhidos, por favor, <i>fale com a
                        gente</i>.</p>
                </div>
            </div >
        );
    }
}

const ModalAbout = () =>
    <div className="modal-content">
        <div className="modal-bar-content">
            <p>Sobre a Transportes DGA</p>
        </div>
        <div className="modal-content-content">
            <h4></h4>
            <p>Realiza a gestão da frota de veículos, próprios ou de terceiros, colocados à disposição da
                Universidade para atendimento de traslados e viagens de interesse das Unidades e Órgãos da
                UNICAMP
            </p>
        </div>
    </div>


const ModalEquipe = () =>
    <div className="modal-content">
        <div className="modal-bar-content">
            <p>Equipe Transportes DGA</p>
        </div>
        <div className='modal-content-content'>
            <h4>Coordenador</h4>
            <p>CHARLES ARTHUR DA ROCHA ALMEIDA - charles.almeida@dga.unicamp.br - (19) 3521-4921</p>

            <h4>Frota Oficial</h4>
            <p>PAULO LUCIO RESENDE - paulolucio@dga.unicamp.br - (19) 3521-4927</p>
            <p>SEBASTIAO JOSE DE FARIA - tiao@dga.unicamp.br - (19) 3521-4922</p>

            <h4>Agendamentos</h4>
            <p>MARIVALDO BAPTISTA DE OLIVEIRA - marivaldo@dga.unicamp.br - (19) 3521-4929</p>
            <p>MARCIO JOSE DOS SANTOS - marcio@dga.unicamp.br - (19) 3521-4930</p>

            <h4>Relatórios e pagamentos</h4>
            <p>ALEXANDRE CARLOS DE OLIVEIRA - alexandre@dga.unicamp.br - (19) 3521-4924</p>
            <p>PAULO AUGUSTO BOCCATI - paulo.ab@dga.unicamp.br - (19) 3521-4928</p>

            <h4>Manutenção</h4>
            <p>GETULIO NOGUEIRA ROCHA - getulio@dga.unicamp.br - (19) 3521-4925</p>
            <p>SERGIO APARECIDO VICENTIN - vicentin@dga.unicamp.br - (19) 3521-4925</p>

            <h4>Motoristas - (19) 3521-4927</h4>
            <p>ANESIO SOUZA NOGUEIRA - anesio@dga.unicamp.br</p>
            <p>EDSON DEZOTE - dezote@dga.unicamp.br</p>
            <p>JOSE FELIX DA CRUZ - felix@dga.unicamp.br</p>
            <p>JURANDIR ROCHA RIBEIRO - jurandir@dga.unicamp.br</p>
            <p>OSVALDO ALVES SOBRINHO - osvaldo@dga.unicamp.br</p>
            <p>OSVALDO BOGNAR - bognar@dga.unicamp.br</p>

        </div>
    </div>

const ModalFormularios = () => {
    const form_cadastro_agenda = 'https://www.dga.unicamp.br/Html/Servicos/Formularios/Info/AberturaContaWeb/formAberturaContaWeb_extranet.php';
    return (
        <div className="modal-content">
            <div className="modal-bar-content">
                <p>Formulários</p>
            </div>
            <div className="modal-content-content">
                <ul>                
                    <li>
                        <a className="btn link-style"
                            href={form_diarias}>Antecipação de Despesa de viagem (Diárias)</a>
                        <p>Utilizado para solicitar a antecipação de valores referentes a despesas e diárias quando do deslocamento do servidor dentro do país.</p>
                    </li>
                    <li>
                        <a className="btn link-style"
                            href={form_cadastro_gestor}>Cadastro de Gestor do Táxi</a>
                        <p>Utilizado para o cadastro do Gestor do Centro de Custo no sistema do Táxi.</p>
                    </li>
                    <li>
                        <span className="btn link-style"
                            onClick={openPage(form_cadastro_agenda)}>Cadastro de novo usuário na Agenda</span>
                        <p>Utilizado para obter acesso à Agenda Eletrônica de Transportes.</p>
                    </li>
                    <li>
                        <a className='btn link-style'
                            href={form_solic_credenciamento}>Solicitação de credenciamento para condução de veículo oficial</a>
                        <p>Utilizado no credenciamento de condutores de veículos da frota oficial.</p>
                    </li>
                    <li>
                        <a className='btn link-style'
                            href={form_termo_responsabilidade}>Termo de responsabilidade para condução de veículo oficial</a>
                        <p>Utilizado no credenciamento de condutores de veículos da frota oficial.</p>
                    </li>                    
                </ul>
            </div>
        </div>
    )
}
