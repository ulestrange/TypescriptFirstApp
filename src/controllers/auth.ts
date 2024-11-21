import { Request, Response } from 'express';
import { usersCollection } from "../database";
import * as argon2 from 'argon2';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import { User } from '../models/user';

export const handleLogin = async (req: Request, res: Response) => {


    const email = req.body?.email
    
    const password = req.body?.password
  
    if (!email || !password) {
       res
        .status(400)
        .json({ message: 'Email and password are required' });
        return;
    }
      const user = await usersCollection.findOne({
        email: email.toLowerCase(),
      })
  
      const dummyPassword = 'dummy_password';
      const dummyHash = await argon2.hash(dummyPassword);
    
      // Use the user's hash if found, otherwise use the dummy hash
      
     let userPasswordHash;

      if (user && user.hashedPassword){
       userPasswordHash =  user.hashedPassword;
      }
      else{
         userPasswordHash = dummyHash;
      }
    
      // check password

        const isPasswordValid = await argon2.verify(userPasswordHash, password);
    
    
        // If password is invalid, return unauthorized
        if (!isPasswordValid) {
         res.status(401).json({
            message: 'Invalid email or password!'
          });
          return;
        }

        res.status(201).send({ accessToken: createAccessToken(user) });


      // res.status(201).send({ accessToken: await createJwt(user) })
      }


const createAccessToken = (user: User | null) : string  => {

    const secret = process.env.JWTSECRET || "not very secret";
    const expiresTime = process.env.JWTEXPIRES || 1800;
    console.log(expiresTime);
    const payload =
    {
        email: user?.email,
    }
    const token = jwtSign(payload, secret, {expiresIn : expiresTime }); 

    return token;

}

  