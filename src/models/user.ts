import { ObjectId } from "mongodb";

// export default class User {
//     constructor(public name: string, public phone: string, public id?: ObjectId) {}
// }

export default interface User {
    name: string;
    phonenumber: string;
    email: string;
    id?: ObjectId;
}