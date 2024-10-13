const express = require("express") ;
const router = express.Router() ;
const airplaneRoutes = require("./airplane-routes") ;
const cityRoutes = require("./city-routes") ;
const airportRoutes = require("./airport-routes") ;
const flightRoutes = require("./flight-routes") ;
const {infoController} = require("../../controllers") ;

// console.log("inside index of v1") ;

router.use("/flights" , flightRoutes ) ;
router.use("/airports" , airportRoutes) ;
router.use("/airplanes" , airplaneRoutes) ;
router.use('/cities' , cityRoutes) ;
router.get("/info" ,infoController.info);
module.exports = router ; 