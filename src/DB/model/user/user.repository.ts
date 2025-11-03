import { AbstractRepository } from "../../abstract.repository";
import { IUser } from "../../../utils/common/interface";
import { User } from "./user.model";

// create class to UserRepository extends from AbstractRepository >> to control DB services
// and send to its constructor the model to use it in AbstractRepository and know him that it is a IUser model
export class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User);
  }

  // get all users method
  async getAllUsers() {
    return await this.model.find(); // use model from DBService(base class)
  }
}
