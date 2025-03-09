import { ObjectId } from "mongoose";

export interface IRentalHouse{
    location:string;
    category:ObjectId
    description:string;
    rentAmount:number; 
    bedrooms:number,
    images:Array<string>;
    landlordUser:ObjectId;
    isAvailable:boolean
}