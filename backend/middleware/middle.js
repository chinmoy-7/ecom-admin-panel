const { throwError } = require("../helper/Response")
const jwt = require("jsonwebtoken")
const auth = async(req,res,done)=>{
    try {
        const {token}=req.headers

        const check = await jwt.verify(token,process.env.JWT_KEY)

        console.log(check)
        req["user"]=check
        done()

    } catch (error) {
        throwError(req,res,500,error.message)
    }
}

module.exports = auth