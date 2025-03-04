
import RentalHouse from "./rentalHose.model";
import { IRentalHouse } from "./rentalHouse.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { RentalHouseSearchableFields } from "./rentalHouse.constant";

const createRentalHouse = async(payload:IRentalHouse)=>{
    const rentalHouse = await RentalHouse.create(payload);
    return rentalHouse;
}

const getAllRentalHouse  = async(query:Record<string,unknown>)=>{
    const RentalHouseQuery = new QueryBuilder(RentalHouse.find(), query)
    .search(RentalHouseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

 const result = await RentalHouseQuery.modelQuery;
 const meta = await RentalHouseQuery.countTotal();
 return {
    result,
    meta,
 };
};

const getRenTalHouseById = async(id:string)=>{
    const rentalHouse = await RentalHouse.findById(id);
    return rentalHouse;
} 
const updateRenTalHouseById = async(id:string,payload:Partial<IRentalHouse>)=>{
    const rentalHouse = await RentalHouse.findByIdAndUpdate(id,payload,{new:true})
    return rentalHouse;
} 
const deleteRenTalHouseById = async(id:string)=>{
    const rentalHouse = await RentalHouse.findByIdAndDelete(id);
    return rentalHouse;
} 
 

export const RentalHouseServices = {
    createRentalHouse,
    getAllRentalHouse,
    getRenTalHouseById,
    updateRenTalHouseById,
    deleteRenTalHouseById
}