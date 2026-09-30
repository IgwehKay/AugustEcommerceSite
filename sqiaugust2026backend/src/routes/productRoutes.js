const express = require("express");

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const {imageUploads} = require("../utils/multer");


const router = express.Router();

router.route("/createproduct").post(authMiddleware.protectRoute, imageUploads, productController.createNewProduct);

router.route("/getallproduct").get(productController.getAllProducts);

//This route is not protected, used for fectching products to the landing page.
router.route("/getallproducts").get(productController.getAllProducts);
router.route("/getproducts").get(productController.getAllProducts);

router.route("/:id")
.get(authMiddleware.protectRoute, productController.getProductDetails)
.patch(authMiddleware.protectRoute, productController.updateProductDetails)
.delete(authMiddleware.protectRoute, productController.deleteProduct)


module.exports = router;