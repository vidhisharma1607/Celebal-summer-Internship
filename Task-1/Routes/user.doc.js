const getDetails = {
  tags: ["Student"],
  description: "Function that can only be done by student ",
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
      description: "STUDENT DOES not EXISTS",
      schema: {
        type: "string",
      },
    },
  },
};

const studentLogin = {
  tags: ["Student"],
  description: "Student can Login",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentID: {
              type: "string",
              description: "enter student Id provided by admin",
              example: "S01",
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
      description: "STUDENT DOESNT EXISTS",
      schema: {
        type: "string",
      },
    },
  },
};
//u[dating the details of student]
const studentUpdate = {
  tags: ["Student"],
  description:
    "Student can update after logging in and checking token in header",
  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example:
        " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtMDEiLCJpYXQiOjE2NTY4NDk5OTgsImV4cCI6MTY1Njg1NzE5OH0.0a-o1Sq70mKPLf-PCDveMl5B9Ac2Sr2eBWTKaHasP3Q",
      required: "true",
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              description: "Enter firstname",
              example: "john",
            },
            lastName: {
              type: "string",
              description: "Enter lastname",
              example: "singh",
            },
            familyBackground: {
              type: "string",
              description: "Enter family background",
              example: "middle class",
            },
            Mobile: {
              type: "string",
              description: "enter phone number",
              example: "775552520",
            },
            degreeCourse: {
              type: "string",
              description: "Enter degreeCourse name you applied for",
              example: "Btech in Civil",
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
              firstName: {
                type: "string",
                description: "enter firstname",
                example: "john",
              },
              lastName: {
                type: "string",
                description: "enter lastname",
                example: "singh",
              },
              familyBackground: {
                type: "string",
                description: "enter family background",
                example: "middle class",
              },
              Mobile: {
                type: "string",
                description: "enter phone number of any parent",
                example: "788878900",
              },
              degreeCourse: {
                type: "string",
                description: "ENTER degreeCourse name you applied for",
                example: "Btech in Mechanical",
              },
            },
          },
        },
      },
    },

    404: {
      description: "STUDENT DOESNT EXISTS",
      schema: {
        type: "string",
      },
    },
  },
};
//filering the contentbby student
const getFilteredResults = {
  tags: ["Student"],
  description:
    "STudent can update after logging in and checking token in header",
  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example: "type the token here",
      required: "true",
    },
    {
      in: "query",
      name: "OOPs",
      description: "will display OOPS marks out of 100",
    },
    {
      in: "query",
      name: "Mechanics",
      description: "will display Mechanics marks out of 100",
    },
    {
      in: "query",
      name: "Civil",
      description: "will display civil marks out of 100",
    },
    {
      in: "query",
      name: "totalMarks",
      description: " total marks to be displayed",
    },
  ],

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              OOPs: {
                type: "string",
                description: "get maths marks out of 100",
                example: "",
              },
              Mechanics: {
                type: "string",
                description: "get science marks out of 100",
                example: "",
              },
              Civil: {
                type: "string",
                description: "get geography marks out of 100",
                example: "",
              },
              totalMarks: {
                type: "string",
                description: "get total marks out of 300",
                example: "",
              },
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

const userRouteDocs = {
  "/me": {
    get: getDetails,
  },

  "/student/login": {
    post: studentLogin,
  },

  "/student/update": {
    put: studentUpdate,
  },

  "/student/results": {
    get: getFilteredResults,
  },
};

module.exports = userRouteDocs;
