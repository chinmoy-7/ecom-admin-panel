const { success, throwError }=  require("../helper/Response");
const vi_user = require("../Models/vi_users")
const {Sequelize}= require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signupController = async (req, res) => {
  try {
    const { name, password, secretKey,email } = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(await bcrypt.compare(password,hashedPassword))
    let is_admin=0,user;
    const checkUser=await vi_user.findOne({
        where:{
            email:email
        }
    })
    if(checkUser==null){
    if (secretKey) {
       user = {
        name,
        password:hashedPassword,
        secretKey,
        is_admin:1,
        email
      };
    } else {
       user = {
        name,
        password:hashedPassword,
        secretKey,
        is_admin,
        email
      };
    }

    const newUser = await vi_user.create(user)
    return success(req, res, newUser);
    }
    return throwError(req,res,404,{message:"User Already Exist"})
  } catch (error) {
    throwError(req, res, 500,error);
  }
};

const loginController = async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password)
        const user = await vi_user.findOne({
            where:{
                email:email
            }
        })
        if(!user){
            return throwError(req,res,404,{message:"No User Found"})
        }
        const checkUser= await bcrypt.compare(password,user.dataValues.password)
        
        if(!checkUser){
            return throwError(req,res,401,{message:"Enter correct credentials"})
        }
        const token = await jwt.sign({user_id:user.dataValues.id,email:user.dataValues.email,is_admin:user.dataValues.is_admin,name:user.dataValues.name},process.env.JWT_KEY)
        const response = {
            token:token
        }
        success(req,res,response)


    } catch (error) {
        throwError(req,res,500,error.message)
    }
}


module.exports={signupController,loginController}
