import BaseApi from "./BaseApi.js";

export default class {
    static async getAllProducts(listId) {
        return await BaseApi.prodApi.get(`/${listId}/product`);
    }
}