import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    category: { type: String, required: true},
    title: { type: String, required: true },
    cover: { type: String, required: true },
    content:{type: String, required: true},
    readTime: {
      value: { type: Number, required: true},
      unit: { type: String, required: true},
    },
    author: { type: Schema.Types.ObjectId, ref: "Author" },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema({
  author: { type: String, required: true},
  text: { type: String, required: true}
}, { 
  timestamps: true 
})

export const BlogModel = model("Blogs", blogSchema);
export const CommentModel = model("Comment", commentSchema)
