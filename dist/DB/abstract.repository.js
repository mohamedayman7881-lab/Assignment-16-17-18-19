"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
// create class to AbstractRepository to write all of DB services and controle it >> and use my class not mongoose service
// make the AbstractRepository class abstract to can not any one take inctanse from it
class AbstractRepository {
    model;
    // make class generic >> to use it with any model
    // take model as parameter (make it protected to use it in sub classes) >> to use it in DBService
    constructor(model) {
        this.model = model;
    } // Model is a Generic type >> so must pass the model type >> and send it T to make it dinamic
    // create method
    async create(item) {
        // send Partial to create only some fields
        const doc = new this.model(item);
        return await doc.save();
    }
    //exist method
    async exist(filter, projection, options) {
        // RootFilterQuery and ProjectionType is a generic types >> so must pass the model type >> and send it T to make it dinamic
        return await this.model.findOne(filter, projection, options); // send the filter and projection as parameters to findOne method
    }
    // get one method
    async getOne(filter, projection, options) {
        // RootFilterQuery and ProjectionType is a generic types >> so must pass the model type >> and send it T to make it dinamic
        return await this.model.findOne(filter, projection, options); // send the filter and projection as parameters to findOne method
    }
    // update one method
    async update(filter, update, options) {
        // use Partial to update only some fields
        return await this.model.updateOne(filter, update, options);
    }
    // delete one method
    async delete(filter) {
        return await this.model.deleteOne(filter);
    }
    // get all method
    async getAll(filter, projection, options) {
        return await this.model.find(filter, projection, options);
    }
}
exports.AbstractRepository = AbstractRepository;
