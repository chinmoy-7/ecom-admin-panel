
const {addItemController,getAllItemController,getItemConrtoller,editItemController, deleteProduct}=require("../controller/Product")
const prodRouter = require("express").Router()
const multer = require('multer');
const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({ storage });
const auth = require("../middleware/middle")

prodRouter.post("/add-product",upload.single("image"),auth,addItemController)
prodRouter.get("/get-product",auth,getAllItemController)
prodRouter.delete("/del-product/:id",auth,deleteProduct)
prodRouter.get("/get-product/:id",auth,getItemConrtoller)
prodRouter.put("/update-product",upload.single("image"),auth,editItemController)




module.exports=prodRouter