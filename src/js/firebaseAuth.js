import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, setPersistence, inMemoryPersistence } from 'firebase/auth'
import firebaseDB from './firebaseDB'
import { removeEmailDomain } from './resources'

//verifica se usuário logado como @unicamp.br
const PATTERN_MAIL = /@unicamp.br/;
const USERS_PATH = '/Transportes/users';


const firebaseConfig = {
    apiKey: "AIzaSyCiEWdYF_i85MGIXhcZ8W9s_eskb-dwWAY",
    authDomain: "testes-html-cd6b4.firebaseapp.com",
    databaseURL: "https://testes-html-cd6b4-default-rtdb.firebaseio.com",
    projectId: "testes-html-cd6b4",
    storageBucket: "testes-html-cd6b4.appspot.com",
    messagingSenderId: "411644535686",
    appId: "1:411644535686:web:1056225d51f326a37a8207",
    measurementId: "G-RFVZS1S8MW"
}
// const firebaseConfig = {
//     apiKey: "AIzaSyDs8OWyb3z70oxbANRhtujozYH8Lp5FIwo",
//     authDomain: "dgaunicamp.firebaseapp.com",
//     databaseURL: "https://dgaunicamp-default-rtdb.firebaseio.com",
//     projectId: "dgaunicamp",
//     storageBucket: "dgaunicamp.appspot.com",
//     messagingSenderId: "927605457632",
//     appId: "1:927605457632:web:9f4eb310f8dd7f428bc685",
//     measurementId: "G-PFJ0J9H1KT"
//   };  
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = 'pt_br';

provider.setCustomParameters({
    'login_hint': 'user@unicamp.br',
    'prompt': 'select_account'
});

const login = () => signInWithPopup(auth, provider)

const logout = () => signOut(auth)

const isUserLogged = () => auth.currentUser ? true : false

const getUserProfile = () => {
    if (!isUserLogged()) return null;
    let current_user = auth.currentUser;
    let user = {
        'full_name': current_user.displayName,
        'first_name': current_user.displayName.split(" ")[0],
        'last_name': current_user.displayName.split(" ")[current_user.displayName.split(" ").length - 1],
        'photo': current_user.photoURL,
        'email': current_user.email
    }
    return user;
}

const isUserUnicamp = () => {
    if (isUserLogged()) {
        let user = getUserProfile();
        if (user.email.search(PATTERN_MAIL) >= 0) {
            return true;
        } else return false;
    } else {
        return false;
    }
}

const getUserCredential = () => {
    if (isUserLogged()) {        
        let username = removeEmailDomain(getUserProfile().email);
        return firebaseDB.readData(USERS_PATH + '/' + username)
            .then((user) => {
                if (user)
                    return user.profile
                else
                    return null
            })
            .catch(error => null)
    } else
        return null
}

const firebaseAuth = {
    login,
    logout,
    isUserLogged,
    getUserProfile,
    isUserUnicamp,
    auth,    
    getUserCredential
}

export default firebaseAuth;
