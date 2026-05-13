import { Router } from "express";
import { createEmployee, deleteEmployees, getEmployees, updateEmployees } from "../controllers/employeeController";
import { protect, protectAdmin } from "../middleware/auth";

const employeesRouter = Router();

employeesRouter.get("/", protect, protectAdmin, getEmployees)
employeesRouter.post("/", protect, protectAdmin, createEmployee)
employeesRouter.put("/:id", protect, protectAdmin, updateEmployees)
employeesRouter.delete("/:id", protect, protectAdmin, deleteEmployees)