import {
  Model,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  UpdateQuery,
} from "mongoose";

// create class to AbstractRepository to write all of DB services and controle it >> and use my class not mongoose service
// make the AbstractRepository class abstract to can not any one take inctanse from it
export class AbstractRepository<T> {
  // make class generic >> to use it with any model
  // take model as parameter (make it protected to use it in sub classes) >> to use it in DBService
  constructor(protected model: Model<T>) {} // Model is a Generic type >> so must pass the model type >> and send it T to make it dinamic

  // create method
  async create(item: Partial<T>) {
    // send Partial to create only some fields
    const doc = new this.model(item);
    return await doc.save();
  }

  //exist method
  async exist(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    // RootFilterQuery and ProjectionType is a generic types >> so must pass the model type >> and send it T to make it dinamic
    return await this.model.findOne(filter, projection, options); // send the filter and projection as parameters to findOne method
  }

  // get one method
  async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    // RootFilterQuery and ProjectionType is a generic types >> so must pass the model type >> and send it T to make it dinamic
    return await this.model.findOne(filter, projection, options); // send the filter and projection as parameters to findOne method
  }

  // update one method
  async update(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions<T>
  ) {
    // use Partial to update only some fields
    return await this.model.updateOne(filter, update, options);
  }

  // delete one method
  async delete(filter: RootFilterQuery<T>) {
    return await this.model.deleteOne(filter);
  }

  // get all method
  async getAll(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    return await this.model.find(filter, projection, options);
  }
}
