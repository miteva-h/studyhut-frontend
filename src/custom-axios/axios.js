import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem("JWT")
    }
})

export default instance;