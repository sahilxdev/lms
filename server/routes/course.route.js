import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, getCreatorCourses } from "../controllers/course.controller.js";


const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").post(isAuthenticated,getCreatorCourses);


export default router;