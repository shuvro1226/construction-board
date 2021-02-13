import axios from 'axios';
import apiConstants from './constants';

const authInstance = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/"
});

const dbInstance = axios.create({
    baseURL: apiConstants.FIREBASE_ENDPOINT
});

export {
    authInstance,
    dbInstance
};