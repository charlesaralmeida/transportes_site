import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredential, changeUser, logout as reduxLogout, selectUser, setLoginChecked } from '../../redux/userSlice';
import Firebase from '../../js/firebase';
import Warning from '../component/warning'
import { showWarning, selectWarning } from '../../redux/warningSlice'
import Loader from './loader';


const LoginHandler = () => {

    useEffect(() => {
        toggleLoader(true);
        Firebase.auth.onAuthStateChanged(
            user => {
                handleUser();                                
            },
            error => {
                dispatch(showWarning({ title: 'Atenção!', text: [error.message] }));
                toggleLoader(false);
                dispatch(setLoginChecked());
            }
        )
    }, []);

    const user = useSelector(selectUser);
    const warning = useSelector(selectWarning);
    const [isLoaderActive, toggleLoader] = useState(false);

    const dispatch = useDispatch();

    const handleUser = () => {
        toggleLoader(true);
        if (Firebase.isUserUnicamp()) {
            let user = Firebase.getUser();
            Firebase.getUserCredential()
                .then((credential) => {        
                    dispatch(setCredential(credential));            
                    dispatch(changeUser(user));    
                    dispatch(setLoginChecked());
                    toggleLoader(false);             
                })

        } else {
            handleLogout();
        }
    }

    const handleLogin = () => {
        Firebase.login()
            .then(() => {
                handleUser();
            })
            .catch(error => {
                dispatch(showWarning({ title: 'Atenção!', text: [error.message] }));
            });
    }

    const handleLogout = () => {
        Firebase.logout()
            .then(() => dispatch(reduxLogout()))
            .catch((error) => {
                dispatch(showWarning({ title: 'Atenção!', text: [error.message] }));
            })
    }

    return (
        <>
            {user.isLoginChecked
                ? <div className="nav-login">
                    {warning.show ? <Warning /> : null}
                    <div className="nav-photo-login-tooltip">
                        <img src={user.photo} className="nav-photo-login" alt='user_picture' />
                        {user.isLogged ?
                            <div className="nav-photo-login-tooltiptext">
                                <span>{user.full_name}</span><br />
                                <span>{user.email}</span>
                            </div> : null}
                    </div>
                    {user.isLogged
                        ? <button className="nav-button nav-button-logout" onClick={handleLogout}>Desconectar</button>
                        : <button className="nav-button nav-button-login" onClick={handleLogin}>Conectar</button>}
                </div>
                : <Loader isActive={isLoaderActive} />}
        </>
    );
}

export default LoginHandler;