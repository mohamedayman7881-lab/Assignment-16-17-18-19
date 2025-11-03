// provider is a sub service to use it in multiple services
import { CommentRepository, PostRepository } from "../../../DB";
import { NotFoundException } from "../../error";
import { REACTION } from "../enum";

// provider to add reaction to post or comment >> send repo , id, reaction, userId to provider
export const addReactionProvider = async (
  repo: PostRepository | CommentRepository,
  id: string, // id from params so its a string
  reaction: string, // reaction from body
  userId: string // userId from req.user
) => {
  // check post existance
  const postExist = await repo.exist({ _id: id });
  if (!postExist) throw new NotFoundException("Post not found");
  // check user already reactioned or no
  const userReactionIndex = postExist.reactions.findIndex((reaction) => {
    // find index return index of reaction of -1 if not exist
    return reaction.userId.toString() === userId?.toString(); // use toString to change ObjectId to string // to cant compare ObjectId(adresses)
  });
  // if user not reactioned >> add reaction into DB
  if (userReactionIndex === -1) {
    const postUpdated = await repo.update(
      { _id: id },
      {
        $push: {
          reactions: {
            userId,
            reaction: [undefined, null, ""].includes(reaction) // if reaction is undefined or null or empty string >> add like reaction
              ? REACTION.like
              : reaction,
          },
        },
      }
    );
  }
  // if user want to remove reaction
  else if ([undefined, null, ""].includes(reaction)) {
    repo.update(
      { _id: id },
      { $pull: { reactions: postExist.reactions[userReactionIndex] } }
    );
  }
  // if user reactioned before >> update reaction
  else {
    const postUpdated = await repo.update(
      { _id: id, "reactions.userId": userId }, // when user reactioned before
      { "reactions.$.reaction": reaction } // update reaction
    );
  }
};
