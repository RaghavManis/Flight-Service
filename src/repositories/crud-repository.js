const { StatusCodes } = require("http-status-codes");
const {Logger} = require("../config") ;
const AppError = require("../utills/error/app-error");


class crudrepository{
    constructor(model){
        this.model = model ;
    }

    async create(data){ // data will be in object form 
            const response = await this.model.create(data) ;
            return response ;
    }

    async destroy(data){ 
            const response = await this.model.destroy({
                where:{
                    id:data ,
                }
            }) ;
            if(!response){
                throw new AppError("data you are requested to delete is not in the database" , StatusCodes.NOT_FOUND) ;
            }
            return response ;
    }

    async get(id){ 
            const response = await this.model.findByPk(id) ;
            if(!response){
                throw new AppError("data you are looking for is not in the database" , StatusCodes.NOT_FOUND) ;
            }
            return response ;
    } 
    
    async getAll(){ // data will be in object form 
            const response = await this.model.findAll() ;
            return response ;
    }
    
    async update(data , id){
            const response = await this.model.update(data , {
                where:{
                    id:id ,
                }
            })
            return response ;
    }
}

module.exports = crudrepository ;