const {AirplaneService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;
const {SuccessResponse , ErrorResponse} = require("../utills/common") ;
const AppError = require("../utills/error/app-error");
const { application } = require("express");

async function createAirplane(req , res){
    try {
        console.log("model - " + req.body.modelNumber + ",  capacity - "+ req.body.capacity) ;
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber ,
            capacity:req.body.capacity ,
        })
        // console.log(airplane) ;
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
        console.log("inside airplane controller") ;
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
        console.log("airplane id which have to be deleted - " + req.params.id) ;
        const airplane = AirplaneService.destroyAirplane(req.params.id) ;
        console.log("successfully deleted ") ;
        console.log(airplane) ;
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

async function updateAirplane(req, res){
    try {
        const airplane = AirplaneService.updateAirplane({
            modelNumber : req.body.modelNumber ,
            capacity : req.body.capacity ,
        } , req.params.id) ;
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
    // I don't kno why but this code also working as the above code 
    //  catch (error) {
    //     if(error.statusCode == StatusCodes.NOT_FOUND){
    //         throw new AppError("airplane you requested to update is not in database " , error.statusCode) ;
    //     }
    //     throw new AppError("not able to update the airplane you want to update " , StatusCodes.NOT_FOUND) ;
    // }

}

module.exports = {
    createAirplane,
    getAirplanes ,
    getAirplane ,
    destroyAirplane ,
    updateAirplane ,
}