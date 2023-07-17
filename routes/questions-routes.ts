import express from "express";
const preferencesControllers = require("../controllers/preferences-controller");

const routes = express.Router();

routes.get("/", preferencesControllers.getQuestions);

module.exports = routes;
