const {FlightService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;
const {SuccessResponse , ErrorResponse} = require("../utills/common") ;

async function createFlight(req , res){
    try {
        console.log("inside flight controller") ;
        const Flight = await FlightService.createFlight({
            flightNumber:req.body.flightNumber ,
            airplaneId:req.body.airplaneId ,
            departureAirportId:req.body.departureAirportId ,
            arrivalAirportId:req.body.arrivalAirportId ,
            arrivalTime:req.body.arrivalTime ,
            departureTime:req.body.departureTime ,
            price:req.body.price ,
            boardingGate:req.body.boardingGate ,
            totalSeats:req.body.totalSeats ,
        })
        // console.log("inside try block of flight controller") ;
        SuccessResponse.message = "successfully creted a flight " ;
        SuccessResponse.data = Flight ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        // console.log("inside catch block of flight controller") ;
        ErrorResponse.data = 0 ; 
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse) ;
    }
}
async function getAllFlights(req , res){
    try {
        const flights = await FlightService.getAllFlights(req.query) ;
        // console.log("inside flight controller , req query is -----> " , req.query) ;
        SuccessResponse.message = "successfully an airport " ;
        SuccessResponse.data = flights ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        console.log("error in getAllFlights in flight controller is ------> " + error) ;
        ErrorResponse.data = 0 ; 
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse) ;
    }
}


async function getFlights(req  ,res){
    try {
        const Flight = await FlightService.getFlights() ;
        // console.log("inside Flight controller") ;
        SuccessResponse.data = Flight ;
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

async function getFlight(req , res){
    try {
        const Flight = await FlightService.getFlight(req.params.id) ;
        SuccessResponse.data = Flight ;
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

async function destroyFlight(req, res){
    try {
        // console.log("Flight id which have to be deleted - " + req.params.id) ;
        const Flight = await FlightService.destroyFlight(req.params.id) ;
        // console.log("successfully deleted ") ;
        console.log("response in Flight controller ---> " + Flight) ;  
        SuccessResponse.data = Flight ;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse) ;
    } catch (error) {
        // console.log("inside catch block of Flight controller--> "+ 0)
        ErrorResponse.error = error ;
        ErrorResponse.data = 0 ;
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse) ;
    }
}

async function updateFlight(req, res){
    try {
        const Flight = FlightService.updateFlight({
            modelNumber : req.body.modelNumber ,
            capacity : req.body.capacity ,
        } , req.params.id) ;
        SuccessResponse.data = Flight ;
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
    //         throw new AppError("Flight you requested to update is not in database " , error.statusCode) ;
    //     }
    //     throw new AppError("not able to update the Flight you want to update " , StatusCodes.NOT_FOUND) ;
    // }

}

module.exports = {
    createFlight,
    getFlights ,
    getFlight ,
    destroyFlight ,
    updateFlight ,
    getAllFlights ,
}