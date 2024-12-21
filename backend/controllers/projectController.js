import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js';
import { Project } from '../models/projectSchema.js';
// this is for only Project_Head;
// working
export const getAllProjects=catchAsyncError(async (req,res,next)=>{
    const projects=await Project.find({expired:false});
    res.status(200).json({
        success:true,
        projects,
    });
});

// working 
export const postProject = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "Project Seeker") {
        return next(new ErrorHandler("You can't upload the project", 400));
    }

    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        return next(new ErrorHandler("Please provide full project details", 400));
    }

    const postedBy = req.user._id;

    const project = await Project.create({
        title,
        description,
        category,
        postedBy,
    });

    res.status(201).json({
        success: true,
        message: "Project posted successfully",
        project,
    });
});

// working

export const getmyProjects=catchAsyncError(async (req,res,next)=>{
    console.log("req.user:", req.user);
    if (!req.user) {
        return next(new ErrorHandler("User is not authenticated.", 401));
    }
    const { role, _id: userId } = req.user;
    if(role==="Project Seeker"){
        return next(new ErrorHandler("you can't use this features",400));
    }
    const myprojects=await Project.find({postedBy:userId});
    if (!myprojects || myprojects.length === 0) {
        return next(new ErrorHandler("You have not posted any projects.", 404));
    }
    res.status(200).json({
        success:true,
        myprojects,
    });
});

export const updateProject= catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Project Seeker"){
        return next(new ErrorHandler("you can't update the project",400));
    }
    // for getting id
    const {id}=req.params;
    let project =await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("sorry No result found. Enter Valid Id!",400));
    }
    project=await Project.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        project,
        message:"project updated successfully",
    })
})

export const deleteProject= catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Project Seeker"){
        return next(new ErrorHandler("you can't access this resources",400));
    }
    // for getting id
    const {id}=req.params;
    let project =await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Oops!,No project Found ",404));
    }
    await Project.deleteOne();
    res.status(200).json({
        success:true,
        message:"project deleted successfully",
    });
})

export const getSingleProject = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        return next(new ErrorHandler("Project not found.", 404));
      }
      res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });