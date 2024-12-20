import GroupApi from "@/api/GroupApi.js";

export default {


    async getGroups() {
        try {
            const response = await GroupApi.getAllGroups();
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}