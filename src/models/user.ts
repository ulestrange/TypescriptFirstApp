import { ObjectId } from "mongodb";
import Joi from "joi";

export interface User {
  name: string;
  phonenumber: string;
  email: string;
  role?: string;
  id?: ObjectId;
  dateJoined?: Date;
  lastUpdated?: Date;
  password?: string;
  hashedPassword?: string;
}

export const ValidateUser = (user: User) => {
  const userJoiSchema = Joi.object<User>({
    name: Joi.string().min(3).required(),
    phonenumber: Joi.string().min(10),
    role: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64).required(),
  });

  return userJoiSchema.validate(user);
};
