const {AirplaneRepository} = require("../repositories");
const {StatusCodes} = require("http-status-codes") ;
const AppError = require("../utills/error/app-error") ;

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data) ;
        return airplane ;       
    } catch (error) {
        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });   
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        // Throwing a generic Internal Server Error if the error is not a validation error
        throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll() ;
        console.log("inside airplane services ") ;
        console.log(airplanes) ;
        return airplanes ;
    } catch (error) {
        throw new AppError('Cannot fetch details off all airplanes ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id) ;
        return airplane ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("the airplane you requested is not present in the databse " , error.statusCode);
        }
        throw new AppError("can't fetch the details of required airplane" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function destroyAirplane(data){
    try {
        // console.log("id inside the airplane service is : " + data)  
        const airplane = await airplaneRepository.destroy(data) ;
        console.log("response in airplane service inside try block ---> "+airplane);
        return airplane ;
    }catch (error) {    
        if(error.statusCode == StatusCodes.NOT_FOUND){
            console.log("response in airplane service inside try block ---> "+0);
            // console.log("inside the airplane service. ");  
            throw new AppError("airplane you want to update is not present in database " , StatusCodes.NOT_FOUND) ;
        }
        throw new AppError("can't update the airplane you requested to update " , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function updateAirplane(data , id){
    try {
        const airplane = await airplaneRepository.update(data , id) ;
        return airplane ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("airplane you want to update is not present in database " , error.statusCode) ;
        }
        throw new AppError("can't update the airplane you requested to update " , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

module.exports = {
    createAirplane ,
    getAirplanes ,
    getAirplane ,
    destroyAirplane ,
    updateAirplane ,
}