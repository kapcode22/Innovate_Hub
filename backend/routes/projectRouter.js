import express, { Router } from "express";
import {getAllProjects, postProject,getSingleProject, getmyProjects, updateProject, deleteProject} from '../controllers/projectController.js'
import { isAuthorized } from "../middlewares/auth.js";
const router =express.Router();
router.get("/getall",getAllProjects);
router.post("/post",isAuthorized,postProject);
router.get("/getmyprojects",isAuthorized,getmyProjects);
router.put("/update/:id",isAuthorized,updateProject);
router.delete("/delete/:id",isAuthorized,deleteProject);
router.get("/:id",isAuthorized,getSingleProject);
export default router;