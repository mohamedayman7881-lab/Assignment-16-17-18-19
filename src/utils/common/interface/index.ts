import { ObjectId } from "mongoose";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../enum";

// attachment interface
export interface IAttachment {
  url: string;
  id: string;
}

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password: string;
  credentialUpdatedAt?: Date;
  phoneNumber?: string;
  role: SYS_ROLE;
  gender: GENDER;
  agent: USER_AGENT;
  otp?: string;
  otpExpiryAt?: Date;
  isVerified?: boolean;
  frindRequests: ObjectId[];
  friends: ObjectId[];
  isBlocked: boolean;
}

// reaction interface
export interface IReaction {
  reaction: REACTION;
  userId: ObjectId;
}

// post interface
export interface IPost {
  _id: ObjectId;
  userId: ObjectId;
  content: string;
  reactions: IReaction[];
  attachments?: IAttachment[];
  isFrozen: boolean;
}

// comment interface
export interface IComment {
  _id: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  parentId: ObjectId | null; // every comment have one parent or null
  content: string;
  attachments?: IAttachment;
  reactions: IReaction[];
  mentions?: ObjectId[];
  isFrozen: boolean;
}

// message interface
export interface IMessage {
  readonly _id: ObjectId;
  content: string;
  sender: ObjectId;
  attachments?: IAttachment[];
  reactions?: IReaction[];
}

// chat interface
export interface IChat {
  readonly _id: ObjectId;
  users: ObjectId[];
  messages: ObjectId[];
}

// customise JwtPayload interface
declare module "jsonwebtoken" {
  interface JwtPayload {
    id: string;
    role: string;
  }
}

// reopen Request interface and add in it user property not use extends becuse can use it in auth middleware (to pass to req informations of user in auth middleware)
declare module "express" {
  // redeclare express module and reopen interface
  interface Request {
    user?: IUser;
  }
}
