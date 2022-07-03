const Student = require("../models/User");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const Marksheet = require("../models/Marksheet");

//logging in student id that was circulated by admin
exports.login = (req, res) => {
  let { studentID } = req.body;
  Student.findOne({ studentID: studentID }) //to match the id
    .then((student) => {
      console.info(`studentID: ${studentID} matched`);
      if (studentID === student.studentID) {
        const token = JWT.sign(
          {
            studentID: student.studentID,
          },
          "Celebal_Technology",
          {
            expiresIn: "2h",
          }
        );
        console.info("logged in Suceefully");
        return res.status(200).send(token);
      }
      console.warn("Incorrect student Id");
      return res.status(401).send("please enter correct student Id");
    }) //when there is some connectivity issue
    .catch((error) => {
      console.error(` ${studentID} Id not found`);
      return res.status(404).send(`StudentID: ${studentID} not found`);
    });
};

//sending the details of the student

exports.studentDetails = (req, res, next) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal_Technology");
  let studentID = decodedToken.studentID;

  Student.findOne({ studentID: studentID })
    .then((student) => {
      if (student) {
        console.info(` ${studentID} matched with Details`);

        res.locals.student = student;

        return next(); //necessary to add
      }

      console.log(`Student id: ${studentID} did not matched with Details`);
      return res.status(404).send("no details found");
    })
    .catch(() => {
      console.error("Someting bad Happen");
      return res.status(500).send("Error: Something went wrong ");
    });
};

exports.studentMarksheet = (req, res) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal_Technology");
  let studentID = decodedToken.studentID;

  Marksheet.findOne({ studentID: studentID })
    .then((marksheet) => {
      if (marksheet) {
        console.info(`id: ${studentID} matched with marksheet`);
        let { student } = res.locals;
        return res.status(200).send([student, marksheet]);
      }

      console.log(` id: ${studentID} not matched with marksheet`);
      return res.status(404).send("Error: Not found");
    })
    .catch(() => {
      console.error("error: something went wrong");
      return res.status(500).send("error: something went wrong");
    });
};

//exporting getStudent details
exports.getStudentResult = (req, res) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal_Technology");
  let studentID = decodedToken.studentID;
  let q = Object.keys(req.query);
  q1 = q[0];
  var object = q.reduce((obj, item) => Object.assign(obj, { [item]: 1 }), {});
  let newObj = { _id: 0, ...object };
  projection = newObj;
  console.log(projection);
  Marksheet.findOne({ studentID: studentID }, projection)
    .then((student) => {
      {
        return res.status(200).send(student);
      }
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

//updating student details and getting iyt
exports.getUpdateStudentDetails = (req, res) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal_Technology");
  let studentID = decodedToken.studentID;
  let { firstName, lastName, familyBackground, Mobile, degreeCourse } =
    req.body;

  Student.updateOne(
    { studentID: studentID },
    { $set: { firstName, lastName, familyBackground, Mobile, degreeCourse } }
  )
    .then(() => {
      console.info("details updated sucessfully");
      return res
        .status(200)
        .send({ firstName, lastName, familyBackground, Mobile, degreeCourse });
    })
    .catch(() => {
      console.info("Error");
      return res.status(500).send("Error: something went wrong");
    });
};
