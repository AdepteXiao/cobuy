import BaseApi from "./BaseApi.js";

export default class {
    static async getAllLists(group_id) {
        return await BaseApi.listApi.get(`?group_id=${group_id}`);
    }

    static async getOneList(list_id) {
        return await BaseApi.listApi.get(`/${list_id}`);
    }
}