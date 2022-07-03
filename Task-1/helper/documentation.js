const userRouteDocs = require("../Routes/user.doc");
const adminRouteDocs = require("../Routes/admin.doc");
//creating swagger documentation ui base
const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title:
      " CRUD (Create, Read, Update, Delete)operation for student mangement system",
    version: "0.0.1",
    description: "Created by Vidhi Sharma",
  },

  servers: [
    {
      // url: "https://adminstudent1.herokuapp.com/",
      url: "",
      description: "After Completion",
    },
  ],

  tags: [
    {
      name: "Admin",
      description: "Function that can only be done by admin ]",
    },

    {
      name: "Student",
      description: "Function that can only be done by student ",
    },
  ],

  paths: {
    ...userRouteDocs,
    ...adminRouteDocs,
  },
};

module.exports = swaggerDocumentation;
