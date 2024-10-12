const CrudRepository = require("./crud-repository") ;
const {Airplane} = require("../models") ;
class AirplaneRepository extends CrudRepository {
    constructor(){
        // console.log("inside airplane repo") ;
        super(Airplane) ;
    }
}

module.exports = AirplaneRepository ; 