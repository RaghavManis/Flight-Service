const {FlightRepository} = require("../repositories");
const {StatusCodes} = require("http-status-codes") ;
const AppError = require("../utills/error/app-error") ;
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data){
    try { 
        console.log("inside try block of flight service")
        const flight = await flightRepository.create(data) ;
        return flight ;       
    } catch (error) {
        console.log("inside catch block of flight service")
        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });   
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        console.log("inside catch block of flight service but error is not sequelizeValidationError") ;
        // Throwing a generic Internal Server Error if the error is not a validation error
        console.log("main error is here ----------->" ,error) ;
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAllFlights(query){
    const customFilter ={} ;// whatever the variables you are going to create in customFilter it must be same as what you declared in models,because this customFilter object will be compare to same variables in flight repository 
    let sortFilter = [] ;
    // const tripEndingTime = "23:59:59" ;
    const tripEndingTime = " 23:59:59" ; // can you tell me what is the difference between this two lines ........................................................................................................there is a space before starting the time in correct code
    if(query.trips){
        [departureAirportId , arrivalAirportId] = query.trips.split("-") ;
        customFilter.departureAirportId = departureAirportId ;
        customFilter.arrivalAirportId = arrivalAirportId ;
    }
    // check that both departure and arrival airport should not be same  ;
    if(query.price){
        [minPrice , maxPrice] = query.price.split("-") ;
        customFilter.price = {
            [Op.between] : [(minPrice == undefined ? 0 : minPrice) , (maxPrice == undefined ? 20000 : maxPrice)] ,
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers ,
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between] : [query.tripDate , query.tripDate + tripEndingTime] ,
        }
    }
    if(query.sort){
        const params = query.sort.split(',') ; 
        const sortFilters = params.map((param)=>{ return param.split("_")}) ; 
        // const sortFilters = params.map((param)=> param.split("_")) ;  // use any one of above 

        sortFilter = sortFilters ;
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter , sortFilter) ;
        return flights ;
    } catch (error) {
        console.log("error in getAllFlight in flight service is --->" + error ) ;
        throw new AppError('Cannot get flights for provided data', StatusCodes.BAD_REQUEST);
    }
}

async function getFlights(){
    try {
        const flights = await flightRepository.getAll() ;
        console.log("inside flight services ") ;
        console.log(flights) ;
        return flights ;
    } catch (error) {
        throw new AppError('Cannot fetch details off all flights ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id) ;
        return flight ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("the flight you requested is not present in the databse " , error.statusCode);
        }
        throw new AppError("can't fetch the details of required flight" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function destroyFlight(data){
    try {
        // console.log("id inside the flight service is : " + data)  
        const flight = await flightRepository.destroy(data) ;
        console.log("response in flight service inside try block ---> "+flight);
        return flight ;
    }catch (error) {    
        if(error.statusCode == StatusCodes.NOT_FOUND){
            console.log("response in flight service inside try block ---> "+0);
            // console.log("inside the flight service. ");  
            throw new AppError("flight you want to update is not present in database " , StatusCodes.NOT_FOUND) ;
        }
        throw new AppError("can't update the flight you requested to update " , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function updateFlight(data , id){
    try {
        const flight = await flightRepository.update(data , id) ;
        return flight ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("flight you want to update is not present in database " , error.statusCode) ;
        }
        throw new AppError("can't update the flight you requested to update " , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

module.exports = {
    createFlight ,
    getFlights ,
    getFlight ,
    destroyFlight ,
    updateFlight ,
    getAllFlights
}