const express = require("express");
const Student = require("../models/User");
const Marksheet = require("../models/Marksheet");
const router = express();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const JWT = require("jsonwebtoken");

//signup form for admin
exports.signup = (req, res) => {
  let { adminID, firstName, lastName, email } = req.body;
  let admin = new Admin({
    adminID,
    firstName,
    lastName,
    email,
  });
  admin
    .save()
    .then(() => {
      console.log("Admin successfully added");
      res.status(200).send(admin);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send("Error: something went wrong");
    });
};

//login form for admin
exports.login = (req, res) => {
  let { adminID } = req.body;
  Admin.findOne({ adminID: adminID })
    .then((admin) => {
      console.info(`Adminid: ${adminID} found`);
      if (adminID === admin.adminID) {
        const token = JWT.sign(
          {
            adminID: admin.adminID,
          },
          "CELEBAL",
          {
            expiresIn: "2h",
          }
        );
        console.info("Succesfully logged In");
        return res.status(200).send(token);
      }
      console.warn("Admin not found");
      return res.status(404).send("admin notfound");
    })
    .catch((error) => {
      console.error(`email: ${adminID}not found`);
      return res.status(404).send(`email: ${email} does not exist`);
    });
};

//adding student in the database through loggedin admin
exports.addStudent = (req, res) => {
  let {
    studentID,
    firstName,
    lastName,
    familyBackground,
    Mobile,
    degreeCourse,
  } = req.body;
  let student = new Student({
    studentID,
    firstName,
    lastName,
    familyBackground,
    Mobile,
    degreeCourse,
  });
  student
    .save()
    .then(() => {
      console.log("User successfully added");
      res.status(200).send(student.studentID);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send("Error: user not found");
    });
};

//adding marks to the student
exports.fillMarksOfStudent = (req, res) => {
  let { studentID, OOPs, Mechanics, Civil } = req.body;
  let totalMarks = Number(OOPs) + Number(Mechanics) + Number(Civil);
  let marksheet = new Marksheet({
    studentID,
    OOPs,
    Mechanics,
    Civil,
    totalMarks,
  });
  marksheet
    .save()
    .then(() => {
      res.status(200).send(marksheet);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Error:could not add marks in the database");
    });
};

//updating student details that was created
exports.updateStudent = (req, res) => {
  let { studentID } = req.params.studentID;
  let { OOPs, Mechanics, Civil } = req.body;
  let totalMarks = Number(OOPs) + Number(Mechanics) + Number(Civil);
  Marksheet.updateOne(
    { studentID: studentID },
    { $set: { OOPs, Mechanics, Civil, totalMarks } }
  )
    .then((updateDetails) => {
      if (
        updateDetails.modifiedCount >= 1 &&
        updateDetails.matchedCount >= 1 &&
        updateDetails.upsertedCount >= 0
      ) {
        console.info("student details updated!😀");
        return res.status(200).send("Student details updated😁");
      }
      console.error(` ${studentID} Id not found`);
      return res.status(404).send("Student not found");
    })
    .catch((error) => {
      console.error(`Error found while updating student with Id ${studentID}`);
      return res.status(500).send("Error: something went wrong");
    });
};

//deleting details of the student

exports.deleteStudentDetails = (req, res, next) => {
  let { studentID } = req.params.studentID;
  Student.deleteOne({ studentID })
    .then(() => {
      console.log(`details deleted`);
      return next();
    })
    .catch(() => {
      console.error("Error found");
      return res.status(500).send("error: something went wronh while deleting");
    });
};

//deleting student record
exports.deleteStudentMarksheet = (req, res) => {
  let { studentID } = req.params.studentID;
  Marksheet.deleteOne({ studentID: studentID })
    .then(() => {
      console.log(`Marksheet deleted`);
      return res.status(200).send("Student record is deleted");
    })
    .catch(() => {
      console.error(error);
      return res.status(500).send("Error: something went wrong!");
    });
};
