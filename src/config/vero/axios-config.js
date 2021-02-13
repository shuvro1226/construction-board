import axios from 'axios';
import apiConstants from './constants';

// config for VERO API portal
const url = apiConstants.API_DEV;

const instance = axios.create({
    baseURL: url
});

export default instance;