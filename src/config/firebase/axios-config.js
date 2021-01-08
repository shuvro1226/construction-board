import axios from 'axios';

const authInstance = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/"
});

const dbInstance = axios.create({
    baseURL: "https://construction-board-default-rtdb.firebaseio.com/"
});

export {
    authInstance,
    dbInstance
};