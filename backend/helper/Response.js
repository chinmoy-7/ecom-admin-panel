const throwError=(req,res,code,data)=>{
    return res.send({
        status:code,
        message:data
    })
}

const success=(req,res,data)=>{
    return res.send({
        status:200,
        data
    })
}

module.exports={throwError,success}