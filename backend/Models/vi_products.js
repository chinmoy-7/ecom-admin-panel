const { DataTypes } = require("sequelize");
const sequelize = require("../DB/sql");

const product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement :true,
      // allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        // allowNull:false
    },
    s3_image_name:{
        type:DataTypes.STRING,
        // allowNull:false
    },
    is_deleted:{
        type:DataTypes.INTEGER,
        // allowNull:false
    }
  },
  { tableName: "product"}
);
sequelize.sync()

module.exports = product;
