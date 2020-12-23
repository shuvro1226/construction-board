import axios from 'axios';

// config for VERO API portal
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "http://api.baubuddy.de/dev/index.php/";

// config for firebase
const proxyurl = "";
const url = "https://construction-board-default-rtdb.firebaseio.com/";

const instance = axios.create({
    baseURL: proxyurl + url
});

export default instance;