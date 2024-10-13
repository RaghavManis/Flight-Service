const {StatusCodes} = require("http-status-codes") ;
const {ErrorResponse} = require("../utills/common") ;
const AppError = require("../utills/error/app-error");
function validateCreateRequest(req , res , next){
    if(!req.body.name){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct name" , StatusCodes.BAD_REQUEST) ;
        console.log("invalid airport name") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    if(!req.body.code){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct code" , StatusCodes.BAD_REQUEST) ;
        console.log("invalid airport code") ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    // if(!req.body.address){
    //     ErrorResponse.message = "something wrong in the request body" ;
    //     ErrorResponse.error = new AppError("you don't have given correct address" , StatusCodes.BAD_REQUEST) ;
    //     console.log("invalid airport address") ;
    //     return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json(ErrorResponse) ;
    // }
    if(!req.body.cityId){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct cityId" , StatusCodes.BAD_REQUEST) ;
        console.log("invalid airport cityId") ;
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse) ;
    }
    console.log("inside airport middleware") ;
    next() ;
}


module.exports = {
    validateCreateRequest ,
}