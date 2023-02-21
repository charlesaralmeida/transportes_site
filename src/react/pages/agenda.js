import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/transportes.css';
import { ContentBar, Content } from '../component/content.js';
import { openPage } from '../../js/resources';

import TextField from '@mui/material/TextField';

const Agenda = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const side_menu_opt = [
        { external: true, link: 'https://www.dga.unicamp.br/exterlogin/A_Sistema.asp', value: 'Agenda Eletrônica de Transportes' },
        { external: false, link: 'cadastrarUsuario', value: <CadastroUsuario />, text: 'Cadastro de novo usuário' },
        { external: false, link: 'solicitarTransporte', value: <Solicitar />, text: 'Solicitar transporte' },
        { external: false, link: 'alterarReserva', value: <Alterar />, text: 'Alterar ou cancelar reserva' },
        { external: true, link: 'https://www.dga.unicamp.br/Html/Servicos/Formularios/Info/AberturaContaWeb/formAberturaContaWeb_extranet.php', value: 'Formulário para cadastro de novo usuário' },
        { external: true, link: 'https://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_063_2008.pdf', value: 'Instrução Normativa DGA nº 063/2008' },
        { external: true, link: 'https://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_055_2006.pdf', value: 'Instrução Normativa DGA nº 055/2006' },
    ];

    const getCidade = (cidade) => {
        console.log(cidade);
    }

    const getUF = (UF) => {
        console.log(UF);
    }

    return (
        <>
            <div className="content-container">
                <ContentBar
                    text='Agenda de transportes'
                />
                <Content
                    side_menu_opt={side_menu_opt}
                />
                <br />
                <br />
                <div style={{ marginLeft: '5%', width: '30%' }}>
                    <TextField fullWidth
                        label='Ponto de Referência'
                        helperText='Nome do local e/ou de algum estabelecimento próximo'                        
                    />
                </div>
                <br />
                <br />
            </div>

        </>

    );
}

class CadastroUsuario extends React.Component {

    render() {
        return (
            <div>
                <p className='head-style'>Cadastro de novo usuário</p>
                <br />
                <p>Para solicitar acesso à Agenda Eletrônica de Transportes, o interessado deve:</p>
                <ol>
                    <li>Preencher o <span className="btn content-subtitle link-style"
                        onClick={openPage('https://www.dga.unicamp.br/Html/Servicos/Formularios/Info/AberturaContaWeb/formAberturaContaWeb_extranet.php')}>
                        Formulário para cadastro de solicitante</span></li>
                    <li>Imprimir</li>
                    <li>Assinar</li>
                    <li>Recolher a assinatura do responsável em sua Unidade/Órgão (Diretor/ATD/ATU/Expedidor)</li>
                    <li>Digitalizar o formulário assinado e encaminhá-lo por e-mail: transportes@dga.unicamp.br</li>
                </ol>
            </div>
        );
    }
}

class Solicitar extends React.Component {

    render() {
        return (
            <div>
                <p className='head-style'>
                    Solicitar transporte</p>
                <br />
                <ul>
                    <li>Para solicitar a reserva de um veículo o expedidor deverá solicitar através da Agenda
                        Eletrônica de Transportes, com antecedência mínima de 04 (quatro) horas em relação ao horário de
                        início do serviço.</li>
                    <br />
                    <li>A Agenda Eletrônica de Transportes está programada para fechar o agendamento diário às 16h30min, para o dia
                        corrente.</li>
                    <br />
                    <li>A solicitação efetuada após as 16h30min só aceitara agendamento a partir das 12h30min do dia
                        útil seguinte.</li>
                    <br />
                    <li>As emergências deverão ser tratadas através dos ramais: 14930 ou 14927.</li>
                </ul>

                <br />
                <br />
                <p><strong>Caso o transporte necessário seja o de pessoa(s) utilizando um carro
                    comum, sugerimos a utilização dos nossos serviços de táxi.</strong></p>
                <Link className='btn content-subtitle link-style' style={{ marginLeft: '2%' }} to='./../../taxi'>Táxi</Link>
            </div>

        );
    }
}

class Alterar extends React.Component {
    render() {
        return (
            <div>
                <div className='head-style'>
                    <p>Alterar ou cancelar reserva</p>
                </div>
                <br />
                <ul>
                    <li>Para alterar ou cancelar uma reserva de veículo, o expedidor deverá acessar a Agenda
                        Eletrônica de Transportes quando a solicitação estiver com status de “Pendente”.</li>
                    <br />
                    <li>Para alterar ou cancelar uma reserva de veículo, quando status da solicitação estiver
                        “Agendado” o expedidor deverá entrar em contato com a Diretoria de Transportes através do
                        e-mail <strong>transportes@dga.unicamp.br</strong> ou através dos ramais 14930 ou 14927</li>
                    <br />
                    <li>Em finais de semana, feriados ou fora do horário de expediente, em caráter excepcional, o
                        cancelamento deverá ser feito diretamente na empresa contratada.</li>
                    <br />
                    <li>O não cancelamento da solicitação em tempo hábil implicará na cobrança para a Unidade/Órgão
                        do valor referente ao serviço solicitado.</li>
                </ul>
            </div>
        );
    }
}

export default Agenda;