import { ObjectId } from "mongoose";

export interface IRentalHouse{
    location:string;
    description:string;
    rentAmount:number; 
    bedrooms:number,
    images:Array<string>;
    landlordId:ObjectId
}