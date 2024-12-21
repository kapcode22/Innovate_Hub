import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js';
import { Application } from '../models/applicationSchema.js';
import {Project} from '../models/projectSchema.js'
import cloudinary from "cloudinary";

export const projectheadGetAllProjects = catchAsyncError(async (req, res, next) => {

    const { role } = req.user;
    if (role === "Project Seeker") {
        return next(new ErrorHandler("you can't access it ", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ 'employerID.user': _id });
    res.status(200).json({
        success: true,
        applications,
    });
});

export const projectseekerGetAllApplication = catchAsyncError(async (req, res, next) => {

    const { role } = req.user;
    if (role === "Project Head") {
        return next(new ErrorHandler("you can't access it ", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ 'applicantID.user': _id });
    res.status(200).json({
        success: true,
        applications,
    });
});

export const projectseekerDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Project Head") {
        return next(new ErrorHandler("you can't access it", 400));
    }
    const { id } = req.params; // Changed to req.params.id
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Application not found", 404));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted Successfully",
    });
});

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Project Head") {
        return next(new ErrorHandler("Project Head is not allowed to access this resource", 400));
    }

    if (!req.files || !req.files.resume) {
        return next(new ErrorHandler("Resume file required", 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return next(
        new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }
    const { name, email, phone, coverLetter, projectId } = req.body;
    const applicantID = { user: req.user._id, role: "Project Seeker" };

    if (!projectId) {
        return next(new ErrorHandler("Project not found", 400));
    }

    const projectDetails = await Project.findById(projectId);
    if (!projectDetails) {
        return next(new ErrorHandler("Project not found", 400));
    }

    const employerID = { user: projectDetails.postedBy, role: "Project Head" };

    // Check for missing details
    if (!name || !email || !phone || !coverLetter || !applicantID.user || !employerID.user || !resume) {
        return next(new ErrorHandler("Please fill all details", 400));
    }

    const application = await Application.create({
        name,
        email,
        phone,
        coverLetter,
        applicantID,
        employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "Application Submitted Successfully!",
        application,
    });
});
