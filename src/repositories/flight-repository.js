const crudRepository = require("./crud-repository") ;
const {Flight , Airplane , Airport , City} = require("../models") ;
const db = require("../models") ;
const {Sequelize} = require("sequelize") ;
const {addRowLockOnFlights} = require("./queries") ;
class FlightRepository extends crudRepository{
    constructor(){
        super(Flight) ;
    } 
    /** ------> DOING BELOW CODE IS MORE EASY AND READABLE 
     * 
     *   async getAllFlights(filter , sort ){
     *      const response = await Flight.findAll({
     *          where : filter ,
     *          order : sort , 
     *          include : [
     *              {
     *                  model : Airplane ,
     *                  required : true ,
     *                  as :  "airplaneDetail",
     *              } ,   
     *              {
     *                  model : Airport ,
     *                  required : true ,
     *                  as : "arrivalAirport" ,
     *              } ,
     *              {
     *                  model : Airport ,
     *                  required : true ,
     *                  as : "departureAirport" ,
     *              }
     *                  ]
     *      })
     *      return response ;
     *  }
     */
    async getAllFlights(filter, sort) {
      // console.log("inside getAllFlights filter is -------> "+filter) ;
        const response = await Flight.findAll({
          where: filter,
          order: sort,
          include: [ // INCLUDE --> is use for extracting data of foreign keys in detail from the refrencing table 
                     // (in flight model we have three foreign key departureAirportId , arrivalAirportId , airplaneId , 
                     // so when we will use include then details of pointing deparureAirport , arrivalAirport and airplane will be displaeyed )
            {
              model: Airplane,
              required: true, // if don't use this feature then by default sequelize provide outer join , but we want inner join 
                              // (so , required:true , provide inner join )
              as: 'airplaneDetail',
            },
            {   // HERE IN THIS WE DO ONE MORE LEVEL OF DATA EXTRACTING , DON'T BE CONFUSED
              model: Airport,
              required: true,
              as: 'arrivalAirport',
              foreignKey: 'arrivalAirportId',  // Define explicitly to avoid defaulting to id
              targetKey: 'code',               // Use the 'code' column for the join
              include: {
                model : City , 
                required: true ,
                as : 'cityDetails' ,
                foreignKey : 'cityId' ,
                targetKey : 'id' ,
              }
            },
            {
              model: Airport,
              required: true,
              as: 'departureAirport',
              foreignKey: 'departureAirportId', // Define explicitly to avoid defaulting to id
              targetKey: 'code',                // Use the 'code' column for the join
              include: {
                model : City , 
                required: true ,
                as : 'cityDetails' ,
                foreignKey : 'cityId' ,
                targetKey : 'id' ,
              }
            },
          ],
        });
        return response;
      }
    async updateRemainingSeats(flightId , seats , dec = "true"){
        // listen our model name is in singular but since sequelize take it plural by default so give them plural (bhulva do ) ;
        // await db.sequelize.query(`SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE ;` ) ; // code for applying lock

        // await db.sequelize.query(addRowLockOnFlights(flightId)) ;  // ----> upper raw query is bad practice, (code for applying lock )
        // const flight = await Flight.findByPk(flightId) ;
        // if(dec === "true"){
        //   const response = await flight.decrement("totalSeats" , {by : seats}) ;
        //   return response ;
        // }else if(dec === "false"){
        //   const response = await flight.increment("totalSeats" , {by : seats}) ;
        //   return response ;
        // }


        // let's put this all code in transaction because we need this function when we start/cancel booking 
        const transaction = await db.sequelize.transaction() ;
        try {
          await db.sequelize.query(addRowLockOnFlights(flightId)) ;
          const flight = await Flight.findByPk(flightId) ;
          if(dec == "true"){
            await flight.decrement("totalSeats" , {by : seats} , {transaction}) ;
          }else if (dec == "false"){
            await flight.increment("totalSeats" , {by : seats} , {transaction}) ;
          }
          await transaction.commit() ;
          return flight ;
        } catch (error) {
          transaction.rollback() ;
          throw error ;  
        }
    }
}

module.exports = FlightRepository ;