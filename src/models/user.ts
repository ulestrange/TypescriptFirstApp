import { ObjectId } from "mongodb";


export interface User {
    name: string;
    phonenumber: string;
    email: string;
    id?: ObjectId;
}