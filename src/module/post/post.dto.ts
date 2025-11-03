import { IAttachment } from "../../utils";

export interface CreatePostDTO {
  content: string;
  attachments?: any[]; // todo
}

export interface UpdatePostDTO {
  content?: string;
  attachments?: any[]; // todo
}
