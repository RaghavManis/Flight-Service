const {Op} = require("sequelize") ;

'use strict';

const { or } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("Airplanes" , [
      {
        modelNumber:"vistara24" ,
        capacity: 100 , 
        createdAt:new Date() ,
        updatedAt:new Date()
      } ,
      {
        modelNumber:"vistara29" ,
        capacity: 160 , 
        createdAt:new Date() ,
        updatedAt:new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Airplanes" ,
       {
        [Op.or]: [
                  {modelNumber : "vistara24"} , 
                  {modelNumber : "vistara39"}
                 ]
       }) ;
  }
};
