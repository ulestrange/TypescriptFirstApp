import HttpException from "../common/httpException";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  response.status(status).send(error);
};

// adapted from https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/#Implement-Express-Error-Handling