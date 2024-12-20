import BaseApi from "./BaseApi.js";


export default class {
    static async updateAva(id, data) {
        return await BaseApi.groupImagesApi.post(`/${id}/setImage`, data, {
            headers: {
            'Content-Type': 'multipart/form-data',
        }})
    }}