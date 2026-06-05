import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IBlogPost extends Document {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  content: string;
 
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true },
    category: String,
    categoryColor: String,
    title: String,
    content: String,
   
    date: String,
    readTime: String,
    image: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);


const BlogPost = models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
