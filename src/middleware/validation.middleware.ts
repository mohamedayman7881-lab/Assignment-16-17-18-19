import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../utils";

export const isValid = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
      throw new BadRequestException("validtion error", errMessages); // send to BadRequestException message err and arr of object to err details
    }
    next();
  };
};
