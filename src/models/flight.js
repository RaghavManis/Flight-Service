'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane , {
        foreignKey:"airplaneId",// i think when target is primary key of the refrenced table then there is no need to mention specificallt target key 
        as : "airplaneDetail",  // we are providing this alias name because flight is associated with airports multiple time so sequelize should not
                                //  be confuse we will use alias (as)
                                // ----> this will apper in the output when yuu execute flight api with filters , 
                                //       if you not mention it here then by default it will come as model name 
      })

      /**   ---> INSTEAD OF DOING THIS , APPLY BELOW CODE 
       *  this.belongsTo(models.Airport , {
       *    foreignKey : "departureAirportId" ,
       *    as : "departureAirport" ,
       *  }) ;
       *  this.belongsTo(models.Airport ,{
       *    foreignKey : "arrivalAirportId" ,
       *    as : "arrivalAirport" ,
       *  })
       * 
       */
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        targetKey: 'code',  // things which you do letter in flight repo when it needed just do it here , and it is obious also to do it here to make things clear 
        as: 'departureAirport', // we are providing this alias name because flight is associated with airports multiple time so sequelize should not be confuse we will use alias (as)
      });
      
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        targetKey: 'code',  // Use 'code' as the target column in Airport
        as: 'arrivalAirport',
      });
      
    }
  }
  Flight.init({
    flightNumber:{
      type:DataTypes.STRING,
      allowNull:false
    } ,
    airplaneId:{
      type:DataTypes.INTEGER,
      allowNull:false
    } ,
    departureAirportId:{
      type:DataTypes.STRING,
      allowNull:false ,
    },
    arrivalAirportId:{
      type:DataTypes.STRING,
      allowNull:false ,
    } ,
    arrivalTime:{
      type:DataTypes.DATE,
      allowNull:false
    } ,
    departureTime:{
      type:DataTypes.DATE,
      allowNull:false
    } ,
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    boardingGate:{
      type:DataTypes.STRING,
      // allowNull:false
    },
    totalSeats:{
      type:DataTypes.INTEGER,
      allowNull:false
    } 
  }, {
    sequelize,
    modelName: 'Flight',
    // freezeTableName: true,
  });
  return Flight;
};