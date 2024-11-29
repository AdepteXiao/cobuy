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

    static async deleteGroup(id) {
        return await BaseApi.groupApi.delete(`/${id}`);
    }

    static async updateGroup(id, name) {
        return await BaseApi.groupApi.put(`/${id}`, {
            name
        });
    }
    static async leaveGroup(id) {
        return await BaseApi.groupApi.get(`/${id}/leave`);
    }

    static async kick(id, userId) {
        return await BaseApi.groupApi.post(``, {
            id,
            userId
        })
    }

}