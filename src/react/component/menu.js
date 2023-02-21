import React, { useEffect } from 'react';
import '../../styles/transportes.css';
import logo_dga from '../../img/LogotipoDGA.png';
import foto_dummie from "../../img/photo-login-dummie.png";
import { Link } from 'react-router-dom';
import { openPage } from '../../js/resources';
import LoginHandler from './login';


const Menu = () => {

    const locations = {
        contato: '#contato',
    }

    const setLocation = (location) => {
        window.location.href = location;
    }

    return (
        <div className="nav-container">
            <NavLogoContainer />
            <NavMenu
                locations={locations}
                handleLocation={setLocation}
            />
            <NavLogin />
        </div>
    )
}

const NavLogoContainer = () =>
    <div className="nav-logo-container">
        <img className="btn" onClick={openPage('https://www.dga.unicamp.br/')}
            src={logo_dga} alt='logo_dga' />
    </div>



const NavMenu = (props) => {

    const handleLocation = (location) => () => props.handleLocation(location)

    return (
        <div className="nav-menu">
            <Link to='/transportes'>INICIO</Link>
            <Link to='/transportes/abastecimento'>POSTOS DE COMBUSTÍVEL</Link>
            <Link to='/transportes/manutencao'>ORDEM DE SERVIÇO</Link>
            <Link to='/transportes/normas'>NORMAS</Link>
            <p onClick={handleLocation(props.locations.contato)}>FALE COM A GENTE</p>
        </div>
    )
}

const NavLogin = () => <LoginHandler />    

export default Menu;