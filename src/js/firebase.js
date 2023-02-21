import firebaseDB from './firebaseDB';
import firebaseAuth from './firebaseAuth';

const auth = firebaseAuth.auth;
const getUser = () => firebaseAuth.getUserProfile();
const login = () => firebaseAuth.login();
const logout = () => firebaseAuth.logout();
const readData = (path) => firebaseDB.readData(path);
const writeData = (path, data) => firebaseDB.writeData(path, data);
const updateData = (path, data) => firebaseDB.updateData(path, data);
const deleteData = (path) => firebaseDB.deleteData(path);
const isUserUnicamp = () => firebaseAuth.isUserUnicamp();
const getUserCredential = () => firebaseAuth.getUserCredential();

//integrate firebase functions
const Firebase = {    
    auth,
    getUser,
    login,
    logout,
    readData,
    writeData,
    updateData,
    deleteData,
    isUserUnicamp,
    getUserCredential,
}

export default Firebase;