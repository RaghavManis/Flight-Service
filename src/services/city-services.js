// do you know what services do actually ..... repository me to logic likha hota hai use operate to yha se krte hain 
const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require("../utills/error/app-error");

// creating an object of the AirplaneRepository class
const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        // console.log(error) ;
        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            // console.log(error); 
            // Iterate over the errors array and collect messages
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            // console.log(explanation);  // this will give you the all details of error which is stored in the above explanation
            // Throwing a BadRequest error with the collected messages
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        // Throwing a generic Internal Server Error if the error is not a validation error
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    console.log(id) ;
    try {
        const city = await cityRepository.destroy(id) ;
        return city ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("city you requested for remove from database , is not present in the database" , StatusCodes.NOT_FOUND) ;
        }
        throw new AppError("can't delete the requested airplane" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function updateCity(id , data){
    try {
        const city = await cityRepository.update(id, data) ;
        return city ;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("city you want to update is not present in the datbase" ,error.statusCode) ;
        }
        throw new AppError("unable to update city" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}
module.exports={
    createCity,
    destroyCity,
    updateCity
}