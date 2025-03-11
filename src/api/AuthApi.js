import BaseApi from "./BaseApi.js";

export default class {
    static async login(email, password) {
        localStorage.removeItem('auth_token');
        return await BaseApi.authApi.post("/login", {
            email,
            password
        });
    }

    static async register(name, email, password) {
        return await BaseApi.authApi.post("/register", {
            name,
            email,
            password
        });
    }
}
