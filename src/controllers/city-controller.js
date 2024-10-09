const {StatusCodes} = require('http-status-codes') ;
const {CityService} = require('../services') ;
const {SuccessResponse , ErrorResponse} = require('../utills/common') ;
// const AppError = require('../utills/errors/app-error');
// controller me throw nhh krna hai , ye last point hai , yha se response hi return hoga always 
// second thing set the data here which you will pass in the model for creating entry


/**
 * POST : /cities
 * req-body {name : 'city_name'}
 */
async function createCity(req , res){
    try {
        const city = await CityService.createCity({
            name : req.body.name 
        })
        SuccessResponse.data = city ;
        SuccessResponse.message = "successfully created the city" ;
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

async function destroyCity(request , response){
    // console.log(request.params.id) ;
    try {
      const city = await CityService.destroyCity(request.params.id) ;
      SuccessResponse.data = city ;
      SuccessResponse.message = "successfully deleted given city " ;
      return response
                     .status(StatusCodes.OK)
                     .json(SuccessResponse) ;
    } catch (error) {// no need to handle error saperately , since error coming from airplaneService need already contains the details so use that
      ErrorResponse.error=  error ;
      return response
                     .status(error.statusCode)
                     .json(ErrorResponse) ;
    }
  }

   
async function updateCity(req , res){
    try {
      const city = await CityService.updateCity(req.params.id , {
        name:req.body.name
      })
      SuccessResponse.data = city ;
      SuccessResponse.message = "succefully updated city with given city id" ;
      return res
                .status(StatusCodes.OK)
                .json(SuccessResponse) ;
    } catch (error) {// no need to handle error saperately, since error coming from airplaneService need already contains the details so use that
      ErrorResponse.error = error ;
      return res
               .status(error.statusCode)
               .json(ErrorResponse) ;
    }
  }

module.exports = {
    createCity,
    destroyCity,
    updateCity
}