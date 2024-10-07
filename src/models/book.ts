import { ObjectId } from "mongodb";
import Joi from 'joi';


type category = "PUBLISH" | "MEAP";

export interface Book {
    id?: ObjectId;
    catNumber: number;
    title: string;
    pageCount: number;
     publishedDate: Date;
    thumbnailUrl: string;
    shortDescription:  string;
    longDescription : string;
    status: string;
    authors: string[];
    categories: [];
    extra: string;
}


