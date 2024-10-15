const {StatusCodes} = require("http-status-codes") ;
const {ErrorResponse} = require("../utills/common") ;
const AppError = require("../utills/error/app-error");
const { compareTime } = require("../utills/helper");

function validateCreateRequest(req , res , next){
    let check = compareTime.compareTime(req.body.departureTime , req.body.arrivalTime) ;
    console.log(check) ;
    console.log(req.body.departureTime +  req.body.arrivalTime) ;
    if(!check){
        console.log("inside if block of compare time in flight middleware") ;
        ErrorResponse.data = 0;
        ErrorResponse.message = "flight sheduling is wrong !!" ;
        ErrorResponse.error = new AppError("wrong flight sheduling" , StatusCodes.BAD_REQUEST) ;
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse) ;
    }
 
    if(!req.body.flightNumber){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct flightNumber" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport name") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct airplaneId" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport code") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct departureAirportId" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport address") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct arrivalAirportId" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport cityId") ;
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse) ;
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct arrivalTime" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport name") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct departureTime" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport code") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    if(!req.body.price){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct price" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport address") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    if(!req.body.boardingGate){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct boardingGate" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport cityId") ;
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse) ;
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct totalSeats" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport cityId") ;
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse) ;
    }
    // console.log("inside airport middleware") ;
    next() ;
}

async function validateUpdateSeats(req , res , next){
    if(!req.body.seats){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct no of seats" , StatusCodes.BAD_REQUEST) ;
        // console.log("invalid airport cityId") ;
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse) ;
    }
    next() ;
}

module.exports = {
    validateCreateRequest ,
    validateUpdateSeats ,
}