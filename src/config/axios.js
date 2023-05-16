import axios from 'axios';

const usuarioAxios = axios.create({
    baseURL: 'http://35.226.249.121'
    // baseURL: 'http://localhost:5000'
})

export default usuarioAxios;