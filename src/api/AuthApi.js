import BaseApi from "./BaseApi.js";

export default class {
    static async login(email, password) {
        localStorage.removeItem('auth_token');

        return await BaseApi.loginApi.post("", {
            email,
            password
        });
    }

}