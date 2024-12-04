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
      }) as User;
  
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

        res.status(201)
        .cookie('refreshToken' , createRefreshToken(user),
         {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true,
          sameSite: 'none'
         })
        .send({ accessToken: createAccessToken(user) });


      }


export const handleRefresh = async (req: Request, res: Response) => {

  const cookie = req.cookies?.refreshToken;

  if (!cookie){
    res.status(401).json('No refresh cookie received');
    return;
  }

  const email = cookie.split(':')[0];
  console.log ('email ' + email);
  const token = cookie.split(':')[1];

  const user = await usersCollection.findOne({email : req.body.email}) as User;

  if (!user) {
    res.status(401).json('Auth failed - userid not valid');
    return}


  const storedToken = getSavedToken(user);

  if (!token || storedToken != token) {
         res.status(401).json('Auth failed - token not found or matched');
        return;
  }


  // here we have a matching refresh token create a new JWT and return.
    
      res.status(201)
      .cookie('refreshToken' , createRefreshToken(user),
      {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true})
      .send({ accessToken: createAccessToken(user) });
      return;
}


export const handleLogout = async (req: Request, res: Response) => {
  console.log('logout received')
  res.status(201)
      .clearCookie('refreshToken')
      .json({"logged out" : "true"});
      return;
}

// These are two duumy functions
// we will not be looking at how to create and cycle refresh tokens 
// in this  module.

const createRefreshToken = (user : User) => {
  return user.email + ':testagain';
}

const getSavedToken = (user : User) => {
  return 'testagain';
}


const createAccessToken = (user: User | null) : string  => {

    const secret = process.env.JWTSECRET || "not very secret";
    const expiresTime = process.env.JWTEXPIRES || 120;
    console.log(expiresTime);
    const payload =
    {
        email: user?.email,
        name: user?.name
    }
    const token = jwtSign(payload, secret, {expiresIn : expiresTime }); 

    return token;
}

// const createRefreshToken = (user: User | null) : string  => {

//   const secret = process.env.REFRESHSECRET || "not very secret";
//   const expiresTime = process.env.REFRESHEXPIRES || 600;
//   console.log(expiresTime);
//   const payload =
//   {
//       email: user?.email
//   }
//   const token = jwtSign(payload, secret, {expiresIn : expiresTime }); 

//   return token;

// }

  