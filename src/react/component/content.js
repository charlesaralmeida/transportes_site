import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../../styles/transportes.css';
import { openPage } from '../../js/resources';

export const ContentBar = (props) => <div className="content-bar"><p>{props.text}</p></div>

export const Content = (props) =>
    <div className="content">
        <ContentSideMenu
            side_menu_opt={props.side_menu_opt}
        />
        <div className="content-content">
            <Routes>
                {props.side_menu_opt.map((option, index) => {
                    //se não é um link externo, criará uma rota interna
                    if (!option.external)
                        return <Route key={index} path={option.link} element={option.value} />
                    else
                        return false
                }).filter(el => el)}
            </Routes>
        </div>
    </div>

export const ContentSideMenu = (props) =>
    <div className="content-side-menu">
        {props.side_menu_opt.map((option, index) => {
            if (option.external)
                return <p key={index} className="btn" onClick={openPage(option.link)}>{option.value}</p>
            else
                return <Link key={index} to={option.link} element={option.value}>{option.text}</Link>
        })}
    </div>

