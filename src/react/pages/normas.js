import React from 'react';
import { ContentBar } from '../component/content';
import '../../styles/transportes.css';
import { openPage } from '../../js/resources';

export class Normas extends React.Component {

    links = { in_102_21: 'https://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_102_2021.pdf', in_63_08: 'http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_063_2008.pdf', gr_23_19: 'https://www.pg.unicamp.br/norma/16505/0', of_07_07: 'http://www.dga.unicamp.br/Conteudos/Legislacao/OficiosCircularesDGA/Ofi_007_2007.pdf', in_88_16: 'http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_088_2016.pdf', in_55_06: 'http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_055_2006.pdf', in_83_15: 'http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_083_2015.pdf', in_84_15: 'http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_084_2015.pdf', in_85_15: 'http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_085_2015.pdf', gr_17_04: 'http://www.pg.unicamp.br/mostra_norma.php?id_norma=1372', gr_19_07: 'http://www.pg.unicamp.br/mostra_norma.php?id_norma=1459', in_71_09: 'http://www.dga.unicamp.br/Conteudos/Legislacao/InstrucoesNormativasDGA/Instrucao_DGA_n_071_2009.pdf', };
    normas = [{ header: 'Táxi', instances: [{ link: this.links.in_102_21, name: 'Instrução Normativa DGA nº 102/2021', description: 'Estabelece procedimentos para utilização de serviços de táxi através de contrato gerenciado pela Transportes DGA' }] }, { header: 'Agenda de Transportes', instances: [{ link: this.links.in_63_08, name: 'Instrução Normativa DGA nº 063/2008', description: 'Estabelece procedimentos para utilização da agenda eletrônica para solicitação de serviços de transportes' }] }, { header: 'Utilização dos serviços de transporte', instances: [{ link: this.links.gr_23_19, name: 'Resolução GR-023/2019', description: 'Utilização de veículos oficiais da Universidade, de veículos locados e de serviços de transporte terceirizados' }, { link: this.links.of_07_07, name: 'Ofício Circular DGA/Coordenadoria nº 007/2007', description: 'Utilização dos serviços de transporte na Universidade' },] }, { header: 'Ônibus, micro-ônibus e vans', instances: [{ link: this.links.in_88_16, name: 'Instrução Normativa DGA nº 088/2016', description: 'Estabelece procedimentos para utilização de serviços de transportes fretados de ônibus, micro-ônibus e Vans' },] }, { header: 'Carros oficiais', instances: [{ link: this.links.in_55_06, name: 'Instrução Normativa DGA nº 055/2006', description: 'Estabelece procedimentos para utilização de veículos oficiais da Transportes e repasse de custos dos serviços prestados' }, { link: this.links.in_83_15, name: 'Instrução Normativa DGA nº 083/2015', description: 'Estabelece procedimentos a serem adotados em caso de acidentes de trânsito, roubo ou furto de veículos oficiais da Universidade' }, { link: this.links.in_84_15, name: 'Instrução Normativa DGA nº 084/2015', description: 'Estabelece procedimentos para normatizar a implantação e utilização do Fundo de Sinistro de Veículos da Universidade' }, { link: this.links.in_85_15, name: 'Instrução Normativa DGA nº 085/2015', description: 'Estabelece procedimentos para o credenciamento de pessoas para a condução de veículos oficiais da Universidade' }, { link: this.links.gr_17_04, name: 'Resolução GR-017/2004', description: 'Disciplina a autorização para condução de veículos oficiais por professores convidados,pesquisadores colaboradores voluntários e alunos da Universidade Estadual de Campinas' }, { link: this.links.gr_19_07, name: 'Resolução GR-019/2007', description: 'Institui o Fundo de Sinistro de Veículos' }, { link: this.links.gr_23_19, name: 'Resolução GR-023/2019', description: 'Utilização de veículos oficiais da Universidade, de veículos locados e de serviços de transporte terceirizados' }, { link: this.links.in_71_09, name: 'Instrução Normativa DGA nº 071/2009', description: 'Estabelece procedimentos a serem adotados para abastecimento dos veículos, máquinas e equipamentos e manutenção dos veículos da Universidade, através do Sistema de Cartão Magnético' },] },]

    render() {
        return (
            <div className="content-container">
                <ContentBar text='Normativas' />
                <NormaContainer
                    normas={this.normas}
                />
            </div>
        );
    }
}

class NormaContainer extends React.Component {

    render() {
        return (
            <div className="content-content">
                {this.props.normas.map((group, index) => {
                    return (<div key={index}>
                        <h3 className="content-subtitle">{group.header}</h3>
                        {group.instances.map((norma, index) => {
                            return <div key={index}>
                                <NormaInstance
                                    norma={norma}
                                />
                                <br />
                            </div>
                        })}
                        {(index < this.props.normas.length - 1) ? <hr /> : false}
                    </div>)
                })}
            </div>
        );
    }
}

class NormaInstance extends React.Component {

    INStyle = { fontWeight: 'bold', textDecoration: 'underline', }    

    render() {
        return (
            <>
                <p className="btn"
                    onClick={openPage(this.props.norma.link)}
                    style={this.INStyle}>{this.props.norma.name}</p>
                <p>{this.props.norma.description}</p>
            </>
        );
    }
}