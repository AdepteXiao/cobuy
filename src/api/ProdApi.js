import BaseApi from "./BaseApi.js";

export default class {
    static async getAllProducts(listId) {
        return await BaseApi.prodApi.get(`/${listId}/product`);
    }

    static async createProduct(listId, name) {
        return await BaseApi.prodApi.post(`/${listId}/product`,  {
            name
        });
    }

    static async deleteProduct(listId, productId) {
        return await BaseApi.prodApi.delete(`/${listId}/product/${productId}`);
    }
}