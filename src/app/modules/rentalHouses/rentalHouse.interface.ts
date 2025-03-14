import { ObjectId } from "mongoose";

export interface IRentalHouse{
    name:string;
    location:string;
    category:ObjectId
    description:string;
    rentAmount:number; 
    bedrooms:number;
    bathrooms:number;
    images:Array<string>;
    landlordUser:ObjectId;
    isAvailable:boolean
}