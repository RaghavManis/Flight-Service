const { StatusCodes}=  require("http-status-codes") ;

const info = (req ,res)=>{
    return res.status(StatusCodes.OK).json({
        success:true ,
        message:"Basic api is running from localhost 3000",
        error:{} ,
        data:{}
    })
}

module.exports = {info}