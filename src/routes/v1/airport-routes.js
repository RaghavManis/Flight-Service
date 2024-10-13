const express = require("express") ;
const  router = express.Router() ;
const {AirportController} = require("../../controllers") ;
const {AirportMiddleware} = require("../../middlewares") ;

// console.log("inside airplane routes ")

// /api/get/airports  POST request
router.post("/" ,AirportMiddleware.validateCreateRequest , AirportController.createAirport) ;

// /api/get/airports get request
router.get("/" , AirportController.getAirports) ;

// /api/get/airports:id  get request
router.get("/:id" , AirportController.getAirport) ;

// api/get/airports/id delete request 
router.delete("/:id" , AirportController.destroyAirport) ;

// api/get/airports/id patch request 
router.patch("/:id" , AirportController.updateAirport) ;

module.exports = router ;

