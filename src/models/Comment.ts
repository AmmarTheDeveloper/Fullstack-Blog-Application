import { ObjectId } from "mongoose";
import { model } from "mongoose";
import { models, Schema } from "mongoose";
import { UserType } from "./User";
import { BlogType } from "./Blog";
import mongoose from "mongoose";

export interface CommentType extends Document {
  _id: ObjectId;
  userId: UserType | ObjectId;
  date: Date;
  likes: (UserType | ObjectId)[];
  comment: string;
  replies?: (ObjectId | CommentType)[];
  blogId: BlogType | ObjectId;
}

const commentSchema: Schema<CommentType> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    replies: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

const Comment =
  (models.Comment as mongoose.Model<CommentType>) ||
  model<CommentType>("Comment", commentSchema);

export default Comment;
