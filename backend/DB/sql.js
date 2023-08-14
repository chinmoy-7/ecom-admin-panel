const {createPool}=require("mysql")
const Sequelize= require("sequelize")


// const pool = createPool({
//     host:"ecom-dbs.cfppwdzdi0jb.eu-north-1.rds.amazonaws.com",
//     password:"chinmoy123",
//     user:"admin",
//     database:"ecom",
//     connectionLimit:10
// })
const sequelize = new Sequelize('ecom','admin','chinmoy123',{
    host:"ecom-dbs.cfppwdzdi0jb.eu-north-1.rds.amazonaws.com",
    dialect:'mysql'
})
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
module.exports=sequelize