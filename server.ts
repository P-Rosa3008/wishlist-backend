import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const HttpError = require("./models/http-error.ts");

const preferencesRoutes = require("./routes/preferences-routes");
const usersRoutes = require("./routes/users-routes");

const server = express();

server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
server.use(bodyParser.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

server.use("/api/preferences", preferencesRoutes);
server.use("/api/users", usersRoutes);

server.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

server.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://admin:Pedrorosa30081999@cluster.arumyay.mongodb.net/knowyourgame?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(8080 || process.env.PORT); //change this
  })
  .catch((err: any) => {
    console.log(err);
  });
