import BaseApi from "./BaseApi.js";

export default class {
    static async getInviteLink(groupId) {
        return await BaseApi.inviteApi.get(`/${groupId}`)
    }

    static async invite(token) {
        return await BaseApi.inviteApi.get(`?token=${token}`)
    }
}
