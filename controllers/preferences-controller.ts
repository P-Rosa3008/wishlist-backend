import { NextFunction, Request, Response } from "express";

const getDailyAmount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ amount: "200$" });
};

exports.getQuestions = getDailyAmount;
