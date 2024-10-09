const express = require("express") ;
const  router = express.Router() ;
const {AirplaneController} = require("../../controllers") ;
const {AirplaneMiddlewares} = require("../../middlewares") ;

// console.log("inside airplane routes ")

// /api/get/airplanes  POST request
router.post("/" ,AirplaneMiddlewares.validateCreateRequest , AirplaneController.createAirplane) ;

// /api/get/airplanes get request
router.get("/" , AirplaneController.getAirplanes) ;

// /api/get/airplanes:id  get request
router.get("/:id" , AirplaneController.getAirplane) ;

// api/get/airplanes/id delete request 
router.delete("/:id" , AirplaneController.destroyAirplane) ;

// api/get/airplanes/id patch request 
router.patch("/:id" , AirplaneController.updateAirplane) ;

module.exports = router ;

