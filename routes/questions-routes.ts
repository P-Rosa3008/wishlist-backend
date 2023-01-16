import express from "express";
const questionsControllers = require("../controllers/questions-controller");

const routes = express.Router();

routes.get("/", questionsControllers.getQuestions);

module.exports = routes;
