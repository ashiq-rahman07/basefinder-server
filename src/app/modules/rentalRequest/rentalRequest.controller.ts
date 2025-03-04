import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalRequestServices } from "./rentalRequest.service";

const createRentalRequest = catchAsync(async (req, res) => {
    const result = await RentalRequestServices.createRentalRequest(req.body);
  
    sendResponse(res, {
      success: true,
      message: 'Rental Request created successfully',
      statusCode: 201,
      data: result,
    });
  });
  
const getAllRentalRequest  = catchAsync(async (req, res) => {
    const result = await RentalRequestServices.getAllRentalRequest(req.query);
  
    sendResponse(res, {
      success: true,
      message: 'Rental Request retrive successfully',
      statusCode: 201,
      data: result,
    });
  });
const getRenTalRequestById  = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await RentalRequestServices.getRenTalRequestById(id);
  
    sendResponse(res, {
      success: true,
      message: 'Rental Request retrive successfully',
      statusCode: 201,
      data: result,
    });
  });
  
const updateRenTalRequestById  = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await RentalRequestServices.updateRenTalRequestById(id,req.body);
  
    sendResponse(res, {
      success: true,
      message: 'Rental Request updated successfully',
      statusCode: 201,
      data: result,
    });
  });
const deleteRenTalRequestById  = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await RentalRequestServices.deleteRenTalRequestById(id);
  
    sendResponse(res, {
      success: true,
      message: 'Rental Request deleted successfully',
      statusCode: 201,
      data: result,
    });
  });
  

  export const RentalRequestController = {
    createRentalRequest,
    getAllRentalRequest,
    getRenTalRequestById,
    updateRenTalRequestById,
    deleteRenTalRequestById
}