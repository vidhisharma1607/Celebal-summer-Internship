const express = require("express");
const router = express();
const mongoose = require("mongoose");
const Admin = require("../models/User");
const tokenMiddleware = require("../middleware/isEmailCorrect");
const AdminController = require("../Controller/AdminController");

router.post("/admin/signup",AdminController.signup);
router.post("/admin/addStudent",tokenMiddleware.isTokenValid, AdminController.addStudent);
router.post("/admin/login",AdminController.login);
router.post("/admin/uploadMarks",tokenMiddleware.isTokenValid, AdminController.fillMarksOfStudent);
router.put("/admin/students/:studentID",tokenMiddleware.isTokenValid, AdminController.updateStudent);
router.delete("/admin/students/:studentID",tokenMiddleware.isTokenValid,AdminController.deleteStudentDetails,AdminController.deleteStudentMarksheet);

module.exports = router;