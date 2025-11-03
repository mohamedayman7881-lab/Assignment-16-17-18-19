"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const utils_1 = require("../utils");
const isValid = (schema) => {
    return (req, res, next) => {
        // validate data >> against schema (dinamic)
        let data = { ...req.body, ...req.params, ...req.query }; // to validate any type of req
        const result = schema.safeParse(data); // safeParse >> return result >> (success & data) | (success & error)
        if (!result.success) {
            // type of result.error is arr of object so custmize on it
            const errMessages = result.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            }));
            // let errMessagesString = JSON.stringify(errMessages); // convert to string to can send it as message
            throw new utils_1.BadRequestException("validtion error", errMessages); // send to BadRequestException message err and arr of object to err details
        }
        next();
    };
};
exports.isValid = isValid;
