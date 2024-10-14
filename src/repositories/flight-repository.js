const crudRepository = require("./crud-repository") ;
const {Flight , Airplane , Airport , City} = require("../models") ;

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
      
}

module.exports = FlightRepository ;