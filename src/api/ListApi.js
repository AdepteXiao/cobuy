import BaseApi from "./BaseApi.js";

export default class {
    static async getAllLists(group_id) {
        return await BaseApi.listApi.get(`?group_id=${group_id}`);
    }

    static async getOneList(list_id) {
        return await BaseApi.listApi.get(`/${list_id}`);
    }

    static async deleteList(list_id) {
        return await BaseApi.listApi.delete(`/${list_id}`);
    }

    static async createList(groupId, name) {
        return await BaseApi.listApi.post(``, {
            name,
            groupId
        });
    }

    static async updateList(list_id, name) {
        return await BaseApi.listApi.put(`/${list_id}`, {
            name
        });
    }
}