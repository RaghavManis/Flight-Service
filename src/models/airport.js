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
      this.belongsTo(models.City,{  // SETTING UP THE DETAILS AT THE JS LEVEL 
        foreignKey:'cityId',   // AIRPORT KEY WHICH IS POINTING TIO THE PRIMARY KEY OF CITY 
        onDelete:'CASCADE' ,   // ADDING EXTRA FEATURES 
        // onUpdate:'CASCADE'
      })
    }
  }
  Airport.init({
    name:{
      type:DataTypes.string ,
      allowNull:false ,
      unique:true
    } ,
    code:{
      type:DataTypes.string ,
      unique:true ,
      allowNull:false,
    } ,
    address:{
      type:DataTypes.string ,
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