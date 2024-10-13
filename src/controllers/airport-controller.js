const {AirportService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;
const {SuccessResponse , ErrorResponse} = require("../utills/common/")

async function createAirport(req , res){
    try {
        const airport = await AirportService.createAirport({
            name : req.body.name , 
            code : req.body.code , 
            address : req.body.address , 
            cityId : req.body.cityId , 
        })
        console.log("insidel try block of airport controller ") ;
        SuccessResponse.data = airport ;
        return res
                 .status(StatusCodes.CREATED)
                 .json(SuccessResponse) ;
    } catch (error) {
        ErrorResponse.error = error ;
        ErrorResponse.data = 0 ; 
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse) ;
    }
}


async function getAirports(req  ,res){
    try {
        const airport = await AirportService.getAirports() ;
        console.log("inside airport controller") ;
        SuccessResponse.data = airport ;
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error ;
        return res
                 .status(error.statusCode) 
                 .json(ErrorResponse) ;   
    }
}

async function getAirport(req , res){
    try {
        const airport = await AirportService.getAirport(req.params.id) ;
        SuccessResponse.data = airport ;
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

async function destroyAirport(req, res){
    try {
        // console.log("airport id which have to be deleted - " + req.params.id) ;
        const airport = await AirportService.destroyAirport(req.params.id) ;
        // console.log("successfully deleted ") ;
        console.log("response in airport controller ---> " + airport) ;  
        SuccessResponse.data = airport ;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse) ;
    } catch (error) {
        // console.log("inside catch block of airport controller--> "+ 0)
        ErrorResponse.error = error ;
        ErrorResponse.data = 0 ;
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse) ;
    }
}

async function updateAirport(req, res){
    try {
        const airport = AirportService.updateAirport({
            modelNumber : req.body.modelNumber ,
            capacity : req.body.capacity ,
        } , req.params.id) ;
        SuccessResponse.data = airport ;
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
    //         throw new AppError("airport you requested to update is not in database " , error.statusCode) ;
    //     }
    //     throw new AppError("not able to update the airport you want to update " , StatusCodes.NOT_FOUND) ;
    // }

}

module.exports = {
    createAirport,
    getAirport ,
    getAirports ,
    destroyAirport ,
    updateAirport ,
}
