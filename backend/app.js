const express = require("express")
const sequelize =require("./DB/sql")
const {DataTypes} =require("sequelize")
const product =require("./Models/vi_products")
const users =require("./Models/vi_users")
const cors = require("cors")
const userRouter = require("./route/User")
const dotenv= require("dotenv")
const prodRouter=require("./route/Product")

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1",userRouter)
app.use("/api/v1",prodRouter)

app.listen(4000,()=>{
    console.log("Server is up at 4000")
})