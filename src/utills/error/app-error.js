
class AppError extends Error{
    constructor(message , statusCode){
        super(message) ;
        this.explanation = message ; 
        this.statusCode = statusCode ;
    } ;
}

module.exports = AppError ;

// class AppError extends Error{
//     constructor(message , statusCodes){
//         super(message) ;
//         this.statusCodes=statusCodes ;
//         this.explanation=message ;
//     }
// }

// module.exports = AppError ;