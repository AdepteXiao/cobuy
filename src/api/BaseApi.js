import axios from "axios";

const baseAddress = 'http://hihit.sytes.net';
// const baseAddress = import.meta.env.BASE_API_URL;


const loginAddress = `${baseAddress}/api/login`;
const groupAddress = `${baseAddress}/api/group`;
const listAddress = `${baseAddress}/api/list`;


const loginApi = axios.create({
    baseURL: loginAddress,
});

const groupApi = axios.create({
    baseURL: groupAddress,
});

const listApi = axios.create({
    baseURL: listAddress,
});

function addToken() {
    [groupApi, listApi, loginApi].forEach(api => {
        api.interceptors.request.use(config => {
            if (localStorage.getItem("auth_token")) {
                config.headers.Authorization = `Bearer ${localStorage.getItem("auth_token")}`;
            }
            // config.headers.Accept ='application/json';
            return config;
        }, error => {
            return Promise.reject(error);
        });
    });
}


export default {
    loginApi,
    groupApi,
    listApi,
    addToken
}
