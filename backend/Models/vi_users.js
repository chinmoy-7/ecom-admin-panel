const {DataTypes} = require("sequelize")
const sequelize = require("../DB/sql")

const users = sequelize.define('vi_users',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    is_admin:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
},
{
    tableName:"vi_users",
    timestamps:true
}
)

sequelize.sync()

module.exports = users