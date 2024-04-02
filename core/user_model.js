import {getAllUser} from '../api/user_api.js';

export default class UserModel {
    constructor() {
        this.users = [];
    }

    _adpterUserData(user) {
        return {
            nome: `${user.name.first} ${user.name.last}`,
            cidade:  user.location.city,
            login: user.email,
        }
    }

    async fetchAll() {
        try {
            const result = await getAllUser();
            this.users = result.map(user => this._adpterUserData(user));
            return this.users;
        } catch (error) {
            throw new Error(`Erro ao buscar dados: ${error.message}`);
        }
    }
}