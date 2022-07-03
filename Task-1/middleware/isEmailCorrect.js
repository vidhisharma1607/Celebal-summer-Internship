const express = require("express");
const router = express();
const JWT = require("jsonwebtoken");

exports.isEmailCorrect = (req, res, next) => {
  if (
    req.body.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    next(); //always necessary to add or else function will keep on processing stage
  }
  return res.send();
};
//validation of tokenss
exports.isTokenValid = (req, res, next) => {
  try {
    if (!req.headers.token) {
      console.error("token not matched");
      return res.status(403).send("INVALID TOKEN");
    }

    const decodedToken = JWT.verify(req.headers.token, "Celebal_Technology");
    let studentID = decodedToken.studentID;
    if (decodedToken.adminID) {
      res.locals.studentID = studentID;
      return next();
    }
    console.warn("Incorrect TOKEN ENTERED");
    return res.status(417).send("Please Enter valid token");
  } catch (error) {
    console.error("Token validation failed");
    return res.status(401).send("Token INvalid ☹");
  }
};
//validation of tokenss
exports.isTokenValidStudent = (req, res, next) => {
  try {
    if (!req.headers.token) {
      console.error("Token not send");
      return res.status(403).send("INVALID TOKEN");
    }

    const decodedToken = JWT.verify(req.headers.token, "Celebal_Technology");

    if (decodedToken.studentID) {
      return next();
    }
    console.warn("INCORRECT TOKEN ENTERED");
    return res.status(417).send("Please send a valid token");
  } catch (error) {
    console.error("Token validation failed");
    return res.status(401).send("Token Invalid ☹");
  }
};
