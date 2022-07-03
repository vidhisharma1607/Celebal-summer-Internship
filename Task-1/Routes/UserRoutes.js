const express = require("express");
const router = express();
const mongoose = require("mongoose");
const Student = require("../models/User");
const tokenMiddleware = require("../middleware/isEmailCorrect");
// const  = require("../middleware/isEmailCorrect");
const UserController = require("../Controller/UserController");

// router.post("/signup",UserController.signup)

router.post("/student/login",UserController.login);
router.get("/me",tokenMiddleware.isTokenValidStudent ,UserController.studentDetails, UserController.studentMarksheet);

router.get("/student/results",tokenMiddleware.isTokenValidStudent,UserController.getStudentResult);
router.put("/student/update",tokenMiddleware.isTokenValidStudent,UserController.getUpdateStudentDetails);

module.exports = router;