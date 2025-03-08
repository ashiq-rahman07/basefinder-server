import { string } from "zod";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalHouseServices } from "./rentalHouse.service";
import { IImageFiles } from "../../interface/IImageFile";

const createRentalHouse = catchAsync(async (req, res) => {
  const files = req.files
    const result = await RentalHouseServices.createRentalHouse(req.body, files as IImageFiles,);
  
    sendResponse(res, {
      success: true,
      message: 'Rental House created successfully',
      statusCode: 201,
      data: result,
    });
  });
  
const getAllRentalHouse  = catchAsync(async (req, res) => {
    const result = await RentalHouseServices.getAllRentalHouse(req.query);
  
    sendResponse(res, {
      success: true,
      message: 'Rental House retrive successfully',
      statusCode: 201,
      data: result,
    });
  });
const getRenTalHouseById  = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await RentalHouseServices.getRenTalHouseById(id);
  
    sendResponse(res, {
      success: true,
      message: 'Rental House retrive successfully',
      statusCode: 201,
      data: result,
    });
  });
  
const updateRenTalHouseById  = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await RentalHouseServices.updateRenTalHouseById(id,req.body);
  
    sendResponse(res, {
      success: true,
      message: 'Rental House updated successfully',
      statusCode: 201,
      data: result,
    });
  });
const deleteRenTalHouseById  = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await RentalHouseServices.deleteRenTalHouseById(id);
  
    sendResponse(res, {
      success: true,
      message: 'Rental House deleted successfully',
      statusCode: 201,
      data: result,
    });
  });
  

  
export const RentalHouseController = {
    createRentalHouse,
    getAllRentalHouse,
    getRenTalHouseById,
    updateRenTalHouseById,
    deleteRenTalHouseById
}