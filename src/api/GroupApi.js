import BaseApi from "./BaseApi.js";


export default class {
    static async createGroup(name, description) {
        return await BaseApi.groupApi.post("", {
            name,
            description
        });
    }

    static async getAllGroups() {
        return await BaseApi.groupApi.get("");
    }

    static async getOneGroup(id) {
        return await BaseApi.groupApi.get(`/${id}`);
    }

}