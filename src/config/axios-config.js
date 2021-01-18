import axios from 'axios';

// config for VERO API portal
const proxyurl = "https://frozen-lake-54373.herokuapp.com/"; //"https://cors-anywhere.herokuapp.com/";
const url = "http://api.baubuddy.de/int/index.php/";

// config for firebase
// const proxyurl = "";
// const url = "https://construction-board-default-rtdb.firebaseio.com/";

const instance = axios.create({
    baseURL: proxyurl + url
});

export default instance;