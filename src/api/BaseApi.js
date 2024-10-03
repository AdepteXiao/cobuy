import axios from "axios";

const baseAddress = import.meta.env.BASE_API_URL;

const loginAddress = `http://hihit.sytes.net/api/login`;

const loginApi = axios.create({
    baseURL: loginAddress,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default {
    loginApi
}
