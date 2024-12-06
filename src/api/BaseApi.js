import axios from "axios";

const baseAddress = 'http://hihit.sytes.net';
// const baseAddress = import.meta.env.BASE_API_URL;


const loginAddress = `${baseAddress}/api/login`;
const groupAddress = `${baseAddress}/api/group`;
const listAddress = `${baseAddress}/api/list`;
const prodAddress = `${baseAddress}/api/list`;
const inviteAddress = `${baseAddress}/api/invite`;
const groupImagesAddress = `${baseAddress}/api/group`;


const loginApi = axios.create({
    baseURL: loginAddress,
});

const groupApi = axios.create({
    baseURL: groupAddress,
});

const listApi = axios.create({
    baseURL: listAddress,
});

const prodApi = axios.create({
    baseURL: prodAddress,
});

const inviteApi = axios.create({
    baseURL: inviteAddress,
});

const groupImagesApi = axios.create({
    baseURL: groupImagesAddress,
});

function addToken() {
    [groupApi, listApi, loginApi, prodApi].forEach(api => {
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
    prodApi,
    inviteApi,
    groupImagesApi,
    addToken
}
