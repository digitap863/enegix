import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProject extends Document {
  projectCode: string;
  category: "MEDICAL" | "INDUSTRIAL" | "LABORATORY" | "LPG" | "COMMERCIAL";
  year: number;
  title: string;
  client: string;
  location: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    projectCode: {
      type: String,
      required: [true, "Project code is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["MEDICAL", "INDUSTRIAL", "LABORATORY", "LPG", "COMMERCIAL"],
        message: "{VALUE} is not a valid project category",
      },
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    client: {
      type: String,
      required: [true, "Client is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "/assets/Project/Banner.png",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times in Next.js development server
const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
