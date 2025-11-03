"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const user_model_1 = require("./user.model");
// create class to UserRepository extends from AbstractRepository >> to control DB services
// and send to its constructor the model to use it in AbstractRepository and know him that it is a IUser model
class UserRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(user_model_1.User);
    }
    // get all users method
    async getAllUsers() {
        return await this.model.find(); // use model from DBService(base class)
    }
}
exports.UserRepository = UserRepository;
