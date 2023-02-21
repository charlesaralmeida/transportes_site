import React from 'react';
import '../../styles/transportes.css';
import img_agenda from '../../img/agenda.jpg';
import img_taxi from '../../img/taxi.jpg';
import img_frota from '../../img/DSC03568.jpg';
import img_bus from '../../img/bus.jpg';
import img_taxi_pass from '../../img/pass.png';
import img_apple from '../../img/apple.png';
import img_google from '../../img/google_play.png';
import { CardContainer } from '../component/card';
import { openPage } from '../../js/resources';

export class Init extends React.Component {
    locations = {
        services: '#services-container',
    }

    setLocation = (location) => {
        window.location.href = location;
    }

    render() {
        return (
            <>
                <Highlight
                    locations={this.locations}
                    handleLocation={this.setLocation}
                />
                <Services />
                <Mobile />
            </>
        );
    }
}

class Highlight extends React.Component {

    handleLocation = (location) => {
        return () => this.props.handleLocation(location);
    }

    render() {
        return (
            <div className="highligh-container">
                <div className="highligh-phrase">
                    <p>Transportes</p>
                </div>
                <div className="highligh-button btn" onClick={this.handleLocation(this.props.locations.services)}>
                    <p>NOSSOS SERVIÇOS &gt;&gt;</p>
                </div>
            </div>
        );
    }
}

class Services extends React.Component {
    //cards separados por 'card rows'
    cards = [
        [{ name: 'agenda', img: img_agenda, title: 'AGENDA DE TRANSPORTES', link: '/transportes/agenda', link_text: 'Saiba mais' },
        { name: 'taxi', img: img_taxi, title: 'TÁXI', link: '/transportes/taxi', link_text: 'Saiba mais' }],
        [{ name: 'frota', img: img_frota, title: 'FROTA OFICIAL', link: '/transportes/frota', link_text: 'Saiba mais' },
        { name: 'onibus', img: img_bus, title: 'ÔNIBUS, MICRO-ÔNIBUS E VANS', link: '/transportes/bus', link_text: 'Saiba mais' }],
    ];

    render() {
        return (
            <div id='services-container'>
                <CardContainer
                    cards={this.cards}
                />
            </div>
        );
    }
}

class Mobile extends React.Component {
    render() {
        return (
            <div className="mobile-container">
                <div className="mobile-header">
                    <p>Baixe o app do táxi!</p>
                </div>
                <div className="mobile-text">
                    <img src={img_taxi_pass} alt='Pass_icon' />
                    <div className="mobile-download-container">
                        <img alt='apple' className="mobile-download-container-apple btn" onClick={openPage('https://apps.apple.com/br/app/use-taxi/id803513378')} src={img_apple} />
                        <img alt='google' className="mobile-download-container-google btn" onClick={openPage('https://play.google.com/store/apps/details?id=br.com.taxidigitaluse&hl=pt/')} src={img_google} />
                    </div>
                    <p>Se você já é cadastrado para utilização do táxi, faça o download do aplicativo e solicite transporte
                        sempre que precisar, esteja onde estiver</p>
                </div>
            </div>
        );
    }
}