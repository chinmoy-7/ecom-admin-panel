const {DataTypes}=require("sequelize")
const sequelize = require("../DB/sql")

const test=sequelize.define("testing",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
   { tablename:"testing",
   timestamps:false
    }
)
const fun=async()=>{
await sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
}
fun()
module.exports = test