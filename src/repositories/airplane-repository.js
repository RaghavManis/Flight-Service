const CrudRepository = require("./crud-repository") ;
const {Airplane} = require("../models") ;

class AirplaneRepository extends CrudRepository {
    constructor(){
        // console.log("inside airplane repo") ;
        // console.log(typeof Airplane) ;
        super(Airplane) ;
    }
}

module.exports = AirplaneRepository ; 