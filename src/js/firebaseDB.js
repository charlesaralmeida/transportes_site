// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, update, child, get, remove } from 'firebase/database'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

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

// const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('6LcfTLweAAAAANB7XRZIcvWCHvaqhWpQouAvXE4t'),    
//     isTokenAutoRefreshEnabled: true
// });

const database = getDatabase();

const writeData = (reference, data) => set(ref(database, reference), data)
const updateData = (reference, data) => update(ref(database, reference), data)
const deleteData = (path) => remove(ref(database, path))


const readData = (path) => {
    const dbRef = ref(database);
    return new Promise((resolve, reject) => {
        get(child(dbRef, path))
            .then(snapshot => {
                if (snapshot.exists()) {
                    var data_read = snapshot.val();
                    resolve(data_read);
                } else {
                    resolve(null);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

const firebaseDB = {
    writeData,
    updateData,
    deleteData,
    readData
}
  


export default firebaseDB;