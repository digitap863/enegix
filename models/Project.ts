import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProject extends Document {
  projectCode: string;
  category: "MEDICAL" | "FUEL&OIL" | "LABORATORY" | "LPG";
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
        values: ["MEDICAL", "FUEL&OIL", "LABORATORY", "LPG"],
        message: "{VALUE} is not a valid project category",
      },
    },
    year: {
      type: Number,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times in Next.js development server
const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
