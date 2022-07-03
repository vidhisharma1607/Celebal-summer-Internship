const adminCreation = {
  tags: ["Admin"],
  description: "Function that can only be done by admin ",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            adminID: {
              type: "string",
              description: "enter the student Id provided by Admin",
              example: "ADM1",
            },
            firstName: {
              type: "string",
              description: "enter firstname",
              example: "Andrew",
            },
            lastName: {
              type: "string",
              description: "enter lastname",
              example: "Meal",
            },
            email: {
              type: "string",
              description: "type email",
              example: "andrewmeal@gmail.com",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              type: "object",
            },
          },
        },
      },
    },

    404: {
      description: "invalid credentials",
      schema: {
        type: "string",
      },
    },
  },
};

const adminLogin = {
  tags: ["Admin"],
  description: "Function through which admin can logged in",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            adminID: {
              type: "string",
              example: "ADM1",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              token: "",
            },
          },
        },
      },
    },

    404: {
      description: "Invalid credentials",
      schema: {
        type: "string",
      },
    },
  },
};

const studentRegister = {
  tags: ["Admin"],
  description: "Function that can only be done by admin",

  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtMDEiLCJpYXQiOjE2NTY4NDk5OTgsImV4cCI6MTY1Njg1NzE5OH0.0a-o1Sq70mKPLf-PCDveMl5B9Ac2Sr2eBWTKaHasP3Q",
      required: "true",
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentID: {
              type: "string",
              description: "enter studentID",
              example: "S002",
            },
            firstName: {
              type: "string",
              description: "enter firstname",
              example: "michael",
            },
            lastName: {
              type: "string",
              description: "enter lastname",
              example: "lee",
            },
            familyBackground: {
              type: "string",
              description: "enter family background",
              example: "middle class",
            },
            Mobile: {
              type: "number",
              description: "enter mobile number",
              example: "775279999",
            },
            degreeCourse: {
              type: "string",
              description: "enter degreeCourse name you applied for",
              example: "Btech in CSE",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              studentID: "",
            },
          },
        },
      },
    },

    404: {
      description: "USER DOESNT EXISTS",
      schema: {
        type: "string",
      },
    },
  },
};

const studentMarksUpload = {
  tags: ["Admin"],
  description: "Function that can only be done by admin",

  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtMDEiLCJpYXQiOjE2NTY4NDk5OTgsImV4cCI6MTY1Njg1NzE5OH0.0a-o1Sq70mKPLf-PCDveMl5B9Ac2Sr2eBWTKaHasP3Q",
      required: "true",
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",

          properties: {
            studentID: {
              type: "string",
              description: "enter studentID",
              example: "S002",
            },
            OOPs: {
              type: "string",
              description: "enter OOPs marks out of 100",
              example: "80",
            },
            Mechanics: {
              type: "string",
              description: "submit Mechanics marks out of 100",
              example: "95",
            },
            Civil: {
              type: "string",
              description: "submit civil marks out of 100",
              example: "50",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },

    404: {
      description: "USER DOESNT EXISTS",
      schema: {
        type: "string",
      },
    },
  },
};

const updateStudentsMarks = {
  tags: ["Admin"],
};

const deleteStudentRecord = {
  tags: ["Admin"],
  description: "function done by admin to delete student record",

  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtMDEiLCJpYXQiOjE2NTY4NDk5OTgsImV4cCI6MTY1Njg1NzE5OH0.0a-o1Sq70mKPLf-PCDveMl5B9Ac2Sr2eBWTKaHasP3Q",
      required: "true",
    },
    {
      in: "path",
      name: "studentID",
      type: "string",
      required: "true",
    },
  ],

  responses: {
    200: {
      description: "USER DELETED",
      content: {
        "application/json": {
          schema: {
            type: "STRING",
          },
        },
      },
    },

    404: {
      description: "USER not DELETED",
      schema: {
        type: "string",
      },
    },
  },
};

const adminRouteDocs = {
  "/admin/addStudent": {
    post: studentRegister,
  },

  "/admin/login": {
    post: adminLogin,
  },

  "/admin/signup": {
    post: adminCreation,
  },

  "/admin/uploadMarks": {
    post: studentMarksUpload,
  },

  "/admin/students/{id}": {
    put: updateStudentsMarks,
    delete: deleteStudentRecord,
  },
};

module.exports = adminRouteDocs;
