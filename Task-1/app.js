const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require("./Routes/UserRoutes");
const adminRoute = require("./Routes/AdminRoutes");

const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./helper/documentation");

const CONNECTION_URL = "mongodb://localhost:27017/celebalTask-1";
require("dotenv").config({ path: "./config.env" });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("cONNECTED with mongoDB");
  })
  .catch(() => {
    console.error("could not conect to mongoDB");
  });

app.use(userRoute);
app.use(adminRoute);

app.use("/documentation", swaggerDoc.serve);
app.use("/documentation", swaggerDoc.setup(swaggerDocumentation));

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`Connected with port number: ${Port}`);
});
