const {AirportRepository} = require("../repositories");
const {StatusCodes} = require("http-status-codes") ;
const AppError = require("../utills/error/app-error") ;

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data) ;
        console.log("inside try block of airport services ") ;
        return airport ;       
    } catch (error) {
        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });   
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        // Throwing a generic Internal Server Error if the error is not a validation error
        throw new AppError('Cannot create a new airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll() ;
        console.log("inside airport services ") ;
        return airports ;
    } catch (error) {
        throw new AppError('Cannot fetch details off all airports ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id) ;
        return airport ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("the airport you requested is not present in the databse " , error.statusCode);
        }
        throw new AppError("can't fetch the details of required airport" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function destroyAirport(data){
    try {
        // console.log("id inside the airport service is : " + data)  
        const airport = await airportRepository.destroy(data) ;
        // console.log("response in airport service inside try block ---> "+airport);
        return airport ;
    }catch (error) {    
        if(error.statusCode == StatusCodes.NOT_FOUND){
            // console.log("response in airport service inside try block ---> "+0);
            // console.log("inside the airport service. ");  
            throw new AppError("airport you want to update is not present in database " , StatusCodes.NOT_FOUND) ;
        }
        throw new AppError("can't update the airport you requested to update " , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function updateAirport(data , id){
    try {
        const airport = await airportRepository.update(data , id) ;
        return airport ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("airport you want to update is not present in database " , error.statusCode) ;
        }
        throw new AppError("can't update the airport you requested to update " , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

module.exports = {
    createAirport ,
    getAirports ,
    getAirport ,
    destroyAirport ,
    updateAirport ,
}