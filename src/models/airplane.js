'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // @Component
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight , {
        foreignKey : "airplaneId" ,
        onDelete:"CASCADE" ,
      })
      this.hasMany(models.Seats , {
        foreignKey : "airplaneId" , 
        sourceKey : "id" ,
        onDelete : "CASCADE"
      })
    }
  }    
  Airplane.init({
    modelNumber:{
      type: DataTypes.STRING ,
      allowNull:false ,
      validate:{
        isAlphanumeric:true ,
      }
    } ,
    capacity:{
      type: DataTypes.INTEGER ,
      defaultValue:0 ,
      validate:{
        max:1000 ,
      }
    } 
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};