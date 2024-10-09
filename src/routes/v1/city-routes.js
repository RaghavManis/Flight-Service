const express = require('express') ;
const {CityController} = require('../../controllers') ;
const router = express.Router() ;
const {CityMiddleware} = require('../../middlewares') ;

// /api/v1/cities POST request
router.post('/' , CityMiddleware.validateCreateRequest ,CityController.createCity) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder
// router.post('/' ,CityMiddleware.validateRequest , CityController.createCity) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// /api/v1/cities/id delete request
router.delete('/:id' , CityController.destroyCity) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// /api/v1/cities/id put request
router.put('/:id' , CityController.updateCity) ;

module.exports = router ;