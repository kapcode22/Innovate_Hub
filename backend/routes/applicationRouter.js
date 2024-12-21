import express, { Router } from "express";
import {postApplication,projectheadGetAllProjects,projectseekerGetAllApplication,projectseekerDeleteApplication,} from "../controllers/applicationController.js"
const router =express.Router();
import { isAuthorized } from "../middlewares/auth.js";
router.get("/projectseeker/getall",isAuthorized,projectseekerGetAllApplication);
router.get("/projecthead/getall",isAuthorized,projectheadGetAllProjects)
router.delete("/delete/:id",isAuthorized,projectseekerDeleteApplication)
router.post("/post",isAuthorized,postApplication)
export default router;