'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /**
       * 
       *   this.belongsTo(models.City,{  // SETTING UP THE DETAILS AT THE JS LEVEL 
       *     foreignKey:'cityId',   // AIRPORT KEY WHICH IS POINTING TIO THE PRIMARY KEY OF CITY 
       *     onDelete:'CASCADE' ,   // ADDING EXTRA FEATURES 
       *   }) ;
       *   this.hasMany(models.Flight , {
       *     foreignKey:"departureAirportId" , // listen at both places (in flights as well as airport model ) we only talking about the foreign key 
       *                                       // but but no where we talk about which key will be refrence by this foreign key , so by default it will
       *                                       // refrence to primary key of airport , which we don't want so we will manually tell the system , s
       *                                       // ee in flight repo in getAllFlight 
       *     onDelete:'CASCADE' ,   // ADDING EXTRA FEATURES 
       *   }) ;
       *   this.hasMany(models.Flight , {
       *     foreignKey : "arrivalAirportId" ,
       *     onDelete:'CASCADE' ,   // ADDING EXTRA FEATURES 
       *   })
       * 
       */
      this.belongsTo(models.City,{  // SETTING UP THE DETAILS AT THE JS LEVEL 
        foreignKey:'cityId',   // AIRPORT KEY WHICH IS POINTING TIO THE PRIMARY KEY OF CITY 
        targetKey : 'id' ,
        as : "cityDetails" 
      }) ;
      this.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',  // Flight's FK
        sourceKey: 'code',    // manually telling that this code column in airport will be primary key for flight model when foreign key in 
                              // flight model is departureAirportId
        onDelete: 'CASCADE',
      });
      
      this.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',    // Flight's FK
        sourceKey: 'code',        // manually telling that this code column in airport will be primary key for flight model when foreign key in 
                                  // flight model is arrivalAirportId
        onDelete: 'CASCADE',
      });
      
    }
  }
  Airport.init({
    name:{
      type:DataTypes.STRING ,
      allowNull:false ,
      unique:true
    } ,
    code:{
      type:DataTypes.STRING ,
      unique:true ,
      allowNull:false,
    } ,
    address:{
      type:DataTypes.STRING ,
      unique:true
    } ,
    cityId:{
      type:DataTypes.INTEGER ,
      allowNull:false, 
    } 
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};