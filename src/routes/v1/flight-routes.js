const express = require("express") ;
const  router = express.Router() ;
const {FlightController} = require("../../controllers") ;
const {FlightMiddleware} = require("../../middlewares") ;

// console.log("inside airplane routes ")

// /api/get/airplanes  POST request
router.post("/" ,FlightMiddleware.validateCreateRequest , FlightController.createFlight) ;

// /api/get/airplanes get request
router.get("/" , FlightController.getFlights) ;

// /api/get/airplanes:id  get request
router.get("/:id" , FlightController.getFlight) ;

// api/get/airplanes/id delete request 
router.delete("/:id" , FlightController.destroyFlight) ;

// api/get/airplanes/id patch request 
router.patch("/:id" , FlightController.updateFlight) ;

module.exports = router ;

