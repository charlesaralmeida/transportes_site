//library
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages
import Menu from './component/menu.js'
import { Init } from './pages/init.js'
import { Normas } from './pages/normas.js'
import { Footer } from './component/footer.js'
import { Taxi } from './pages/taxi.js'
import Agenda from './pages/agenda.js'
import { Bus } from './pages/bus.js'
import { Frota } from './pages/frota.js'
import { Abastecimento } from './pages/abastecimento.js'
import Manutencao from './pages/manutencao'
import Admin from './pages/admin'
import Fornecedores from './pages/fornecedores.js';

const Root = () => {

    const locations = {        
            contato: '#contato',        
    }

    const setLocation = (location) => {
        window.location.href = location;
    }

    return (
        <>
            <Router>
                <Menu
                    locations={locations}
                    handleLocation={setLocation}
                />
                <Routes>
                    <Route exact path='/transportes' element={<Init />} />
                    <Route exact path='/' element={<Init />} />
                    <Route path='/transportes/abastecimento' element={<Abastecimento />} />
                    <Route path='/transportes/manutencao' element={<Manutencao />} />
                    <Route path='/transportes/taxi/*' element={<Taxi />} />
                    <Route path='/transportes/agenda/*' element={<Agenda />} />
                    <Route path='/transportes/normas' element={<Normas />} />
                    <Route path='/transportes/bus/*' element={<Bus />} />
                    <Route path='/transportes/frota/*' element={<Frota />} />
                    <Route path='/transportes/admin/*' element={<Admin />} />
                    <Route path='/transportes/fornecedores/*' element={<Fornecedores />} />
                    <Route element={<Init />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default Root;