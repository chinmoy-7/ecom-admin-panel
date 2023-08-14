const { signupController,loginController } = require("../controller/User")

const userRouter = require("express").Router()


userRouter.post("/signup",signupController)
userRouter.post("/login",loginController)



module.exports=userRouter