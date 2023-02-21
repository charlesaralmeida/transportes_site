import React from 'react';
import { Content, ContentBar, ContentSideMenu } from '../component/content';
import { Slider } from '../component/slider';
import '../../styles/transportes.css';
import cadastro_gestor_doc from '../../docs/Cadastro_de_usuario_usetaxi.doc'
import esquema_taxi from '../../img/esquema_taxi.png'
import pass from '../../img/pass.png'
import apple from '../../img/apple.png'
import google from '../../img/google_play.png'
import use_taxi_1 from "../../img/use_taxi_1.png"
import use_taxi_2 from "../../img/use_taxi_2.png"
import use_taxi_3 from "../../img/use_taxi_3.png"
import use_taxi_4 from "../../img/use_taxi_4.png"
import use_taxi_5 from "../../img/aba_gestao_taxi.png"
import use_taxi_6 from "../../img/aba_cadastro_taxi.png"
import use_taxi_7 from "../../img/aba_cadastro_taxi_info.png"
import use_taxi_8 from "../../img/aba_cadastro_taxi_salvar.png"
import util_slide_1 from "../../img/use_taxi_1.png"
import util_slide_2 from "../../img/use_taxi_2.png"
import util_slide_3 from "../../img/use_taxi_3.png"
import util_slide_4 from "../../img/use_taxi_4.png"
import util_slide_5 from "../../img/use_taxi_5.png"
import util_slide_6 from "../../img/use_taxi_6.png"
import util_slide_7 from "../../img/use_taxi_7.png"
import util_slide_8 from "../../img/use_taxi_8.png"
import util_slide_9 from "../../img/use_taxi_9.png"
import util_slide_10 from "../../img/use_taxi_10.png"
import { openPage } from '../../js/resources';

export class Taxi extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    side_menu_opt = [{ external: false, link: 'cadastrarGestor', value: <CadastroGestor />, text: 'Cadastro de Gestores' }, { external: false, link: 'cadastrarUsuario', value: <CadastroUsuario />, text: 'Cadastro de Usuários' }, { external: false, link: 'solicitarTaxi', value: <Solicitar />, text: 'Solicitar táxi' }, { external: false, link: 'downloadApp', value: <Download />, text: 'Baixar aplicativo' }, { external: true, link: 'https://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_102_2021.pdf', value: 'Instrução Normativa DGA nº 102/2021' },];

    render() {
        return (
            <div className="content-container">
                <ContentBar
                    text={'Táxi'}
                />
                <Content
                    side_menu_opt={this.side_menu_opt}
                />
            </div>
        );
    }
}

class CadastroGestor extends React.Component {
    render() {
        return (
            <div>
                <p className='head-style'>
                    Cadastro de gestores</p>
                <br />
                <br />
                <p className="content-subtitle">Gestor do
                    Centro de Custo</p>
                <br />
                <p style={{ marginLeft: '2%' }}>Servidor da Unidade/Órgão responsável por:</p>
                <ul>
                    <li>Cadastro e orientação de usuários</li>
                    <li>Realizar solicitações de táxi</li>
                    <li>Acompanhar os serviços de sua respectiva Unidade/Órgão e relatórios de serviços executados
                        (na plataforma web)</li>
                    <li>Reportar à Transportes DGA qualquer ocorrência ou anormalidade na execução e utilização dos
                        serviços</li>
                </ul>
                <br />
                <br />
                <p>A Transportes DGA irá cadastrar os Gestores de Centro de Custo e estes poderão optar por
                    solicitar as corridas dos interessados em sua Unidade/Órgão ou autorizar alguns usuários para que estes
                    solicitem suas próprias viagens.</p>
                <br />
                <br />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '70%' }}>
                        <img alt='' style={{ width: '100%' }} src={esquema_taxi} />
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <p className="content-subtitle">Como cadastrar</p>
                <p>Para solicitar o cadastro do Gestor do Centro de Custo, o interessado deve:</p>
                <ol>
                    <li>Preencher o <a className="btn link-style"
                        href={cadastro_gestor_doc}>
                        Formulário de Credenciamento do Gestor</a></li>
                    <li>Imprimir</li>
                    <li>Assinar</li>
                    <li>Recolher a assinatura do responsável em sua Unidade/Órgão (Diretor/ATD/ATU/Expedidor)</li>
                    <li>Digitalizar o formulário assinado e encaminhá-lo por e-mail: transportes@dga.unicamp.br</li>
                </ol>                
            </div>
        );
    }
}

class CadastroUsuario extends React.Component {    

    slides = { title: 'Cadastrar Usuário', instances: [{ instruction: <p>1. Após cadastro do Gestor, acessar: <span onClick={openPage('http://usetaxi.com.br')} className="btn link-style" >usetaxi.com.br</span></p>, img: use_taxi_1, }, { instruction: <p>2. Clicar em "Empresa" -&gt; "Portal corporativo":</p>, img: use_taxi_2, }, { instruction: <p>3. Realizar login através de usuário e senha. Caso este seja o primeiro acesso, será necessário criar uma senha:</p>, img: use_taxi_3, }, { instruction: <p>4. Clicar em “PERMITIR” localização:</p>, img: use_taxi_4, }, { instruction: <p>5. Clicar na aba GESTÃO e em seguida em CADASTRO DE AUTORIZADOS:</p>, img: use_taxi_5, }, { instruction: <p>6. Clicar em APLICAR: </p>, img: use_taxi_6, }, { instruction: <p>7. Preencher todas as informações do formulário:</p>, img: use_taxi_7, }, { instruction: <p>8. Em seguida clicar em SALVAR:</p>, img: use_taxi_8, },] };

    render() {
        return (
            <div>
                <p className='head-style'>
                    Cadastro de usuários</p>
                <br />
                <br />
                <div>
                    <p className="content-subtitle">Usuário</p>
                    <br />
                    <p style={{ marginLeft: '2%' }}>Pessoa cadastrada pelo <strong>Gestor do Centro de Custo</strong>
                        (Unidade/Órgão) autorizada para solicitar táxis via plataforma web e/ou aplicativo para smartphone.</p>
                    <br />
                </div>
                <br />
                <hr />
                <br />
                <Slider
                    slides={this.slides} />
            </div>
        );
    }
}

class Solicitar extends React.Component {
    
    slides = { title: 'Manual de utilização', instances: [{ instruction: <p>1. Após cadastro do Gestor, acessar: <span onClick={openPage('http://usetaxi.com.br')} className='btn link-style' >usetaxi.com.br</span></p>, img: util_slide_1, }, { instruction: <p> 2. Clicar em "Empresa" -&gt; "Portal corporativo":</p>, img: util_slide_2, }, { instruction: <p>3. Realizar login através de usuário e senha. Caso este seja o primeiro acesso, será necessário criar uma senha:</p>, img: util_slide_3, }, { instruction: <p>4. Clicar em “PERMITIR” localização:</p>, img: util_slide_4, }, { instruction: <p>5. Na aba lateral, clicar em SOLICITAR CORRIDA:</p>, img: util_slide_5, }, { instruction: <p>6. Clicar em PEDIR TÁXI:</p>, img: util_slide_6, }, { instruction: <p>7. Preencher as informações:</p>, img: util_slide_7, }, { instruction: <p>8. Selecionar o recurso e inserir justificativa:</p>, img: util_slide_8, }, { instruction: <p>9. Confirmar:</p>, img: util_slide_9, }, { instruction: <p>10. As corridas realizadas podem ser consultadas pelo Gestor em "Painel" informando o período de interesse:</p>, img: util_slide_10, }] };

    render() {
        return (
            <div>
                <p className='head-style'>Solicitar táxi</p>
                <br />
                <ul>
                    <li><p>Os valores das corridas podem ser estimados a cada solicitação de viagem sem a
                        necessidade de se confirmar o agendamento</p>
                    </li>
                    <li>
                        <p>Apesar de não ser obrigatório informar o número do celular do passageiro ao solicitar a
                            corrida, essa informação é importante para que o passageiro esteja em contato direto com o
                            motorista pouco antes do embarque</p>
                    </li>
                </ul>
                <br />
                <hr />
                <br />
                <Slider
                    slides={this.slides} />
            </div>
        );
    }
}

class Download extends React.Component {    
    render() {
        return (
            <div className="mobile-container">
                <div className="mobile-header">
                    <p>Baixe o app do táxi!</p>
                </div>
                <div className="mobile-text" style={{ width: '90%' }}>
                    <img alt='' src={pass} />
                    <div className="mobile-download-container">
                        <img alt='' className="mobile-download-container-apple btn"
                            onClick={openPage('https://apps.apple.com/br/app/use-taxi/id803513378')}
                            src={apple} />
                        <img alt='' className="mobile-download-container-google btn"
                            onClick={openPage('https://play.google.com/store/apps/details?id=br.com.taxidigitaluse&hl=pt/')}
                            src={google} />
                    </div>
                    <p>Se você já é cadastrado para utilização do táxi, faça o download do aplicativo e
                        solicite transporte sempre que precisar, esteja onde estiver</p>
                </div>
            </div>
        );
    }
}
