import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide your project title!"],
        minLength: [3, "Title must contain at least 3 characters"],
        maxLength: [30, "Title cannot exceed 30 characters"], // Corrected typo here
    },
    description: {
        type: String,
        required: [true, "Please provide your project description!"],
        minLength: [3, "Description must contain at least 3 characters"],
        maxLength: [50, "Description cannot exceed 500 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    projectPostedOn: {
        type: Date,
        default: Date.now(),
    },
    postedBy: {
        type: String,
        required: [true, "Please provide the poster's name!"],
        minLength: [3, "Name must contain at least 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
});

// creating project model
export const Project = mongoose.model("Project", projectSchema);
