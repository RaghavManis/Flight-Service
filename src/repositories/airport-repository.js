const crudRepository = require("./crud-repository") ;
const {Airport} = require("../models")

class AirportRepository extends crudRepository{
    constructor(){
        console.log(typeof Airport) ;
        console.log(Airport) ;
        super(Airport) ;
    }
}

module.exports = AirportRepository ;
