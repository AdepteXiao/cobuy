import axios from "axios";

const baseAddress = 'http://hihit.sytes.net:9987';
// const baseAddress = import.meta.env.BASE_API_URL;


const authAddress = `${baseAddress}/api`;
const groupAddress = `${baseAddress}/api/group`;
const listAddress = `${baseAddress}/api/list`;
const prodAddress = `${baseAddress}/api/list`;
const inviteAddress = `${baseAddress}/api/invite`;
const groupImagesAddress = `${baseAddress}/api/group`;


const authApi = axios.create({
    baseURL: authAddress,
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
    [groupApi, listApi, authApi, prodApi, groupImagesApi].forEach(api => {
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
    authApi,
    groupApi,
    listApi,
    prodApi,
    inviteApi,
    groupImagesApi,
    addToken
}
