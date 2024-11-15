import express, { Router } from "express";
import {
  getGradeHistories,
  getGradesForClass,
  getGradesForStudent,
  createGradeHistory,
  updateGradeHistory,
  getGradeHistoryByID,
} from "../controllers/gradeHistories";

const router: Router = express.Router();

router.get("/", getGradeHistories);

router.get("/:id", getGradeHistoryByID);

router.get("/class/:id", getGradesForClass);

router.get("/student/:id", getGradesForStudent);

router.post("/", createGradeHistory);

router.put("/:id", updateGradeHistory);

export default router;
