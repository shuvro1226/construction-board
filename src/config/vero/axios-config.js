import axios from 'axios';
import * as apiConstants from './constants';

// config for VERO API portal

const instance = axios.create({
    baseURL: apiConstants.PROXY_URL + apiConstants.API_DEV
});

export default instance;