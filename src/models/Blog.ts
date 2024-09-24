import mongoose, { Schema, model, models, Document, ObjectId } from "mongoose";
import { UserType } from "./User";
import { CommentType } from "./Comment";
export interface BlogType extends Document {
  _id: ObjectId;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  thumbnailPublicId: string;
  postedBy: UserType | ObjectId;
  description: string;
  date: Date;
  comments: CommentType[];
}

export const blogSchema: Schema<BlogType> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    content: {
      type: String,
      required: [true, "Blog content is required."],
    },
    thumbnail: {
      type: String,
      required: [true, "Blog image is required."],
    },
    thumbnailPublicId: {
      type: String,
      required: [true, "Blog image public id is required."],
    },
    category: {
      type: String,
      required: [true, "Blog category is required."],
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Blog creation date is required."],
    },
  },
  { timestamps: true }
);

const Blog =
  (models.Blog as mongoose.Model<BlogType>) ||
  model<BlogType>("Blog", blogSchema);

export default Blog;
