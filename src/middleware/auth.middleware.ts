import { Request, Response, NextFunction } from "express";
import { verify as jwtVerify } from 'jsonwebtoken'


export const authenticateKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(401).json({ message: "Unauthorized: API key is missing" });
    return;
  }
  next();
};


export const validJWTProvided = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

      const authHeader = req.headers?.authorization;

      if (!authHeader || !authHeader?.startsWith('Bearer')) {
        console.log('no header ' + authHeader)
            res.status(401).send();
            return;
      }

     
      const token: string | undefined = authHeader.split(' ')[1];

      if (!token) { 
        res.status(401).send();
        return;
      }
      const secret = process.env.JWTSECRET || "not very secret";
    

      try{
        console.log(token);
        const payload = jwtVerify(token, secret);
        res.locals.payload = payload;
        next();
            

        } catch (err) {
           res.status(403).send();
           return;
        }
    };


