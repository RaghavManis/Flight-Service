const {AirplaneService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;
const {SuccessResponse , ErrorResponse} = require("../utills/common") ;
const AppError = require("../utills/error/app-error");
const { application } = require("express");

async function createAirplane(req , res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber ,
            capacity:req.body.capacity ,
        })
        SuccessResponse.data = airplane ;
        return res.status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse) ;
    }
}
async function getAirplanes(req  ,res){
    try {
        const airplane = await AirplaneService.getAirplanes() ;
        SuccessResponse.data = airplane ;
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.data = error ;
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse) ;
    }
}

async function getAirplane(req , res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id) ;
        SuccessResponse.data = airplane ;
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse) ;
    } catch (error) {
        ErrorResponse.error = error ;
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse) ;
    }
}

async function destroyAirplane(req, res){
    try {
        const airplane = AirplaneService.destroyAirplane(req.params.id) ;
        SuccessResponse.data = airplane ;
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse) ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("airplane you requested to remove is not in database " , error.statusCode) ;
        }
        throw new AppError("not able to delete the airplane you want to remove " , StatusCodes.NOT_FOUND) ;
    }
}

module.exports = {
    createAirplane,
    getAirplanes ,
    getAirplane ,
    destroyAirplane ,
}