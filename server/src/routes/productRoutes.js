const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const { verifyToken, requireCompany } = require("..//middlewares/auth/authMiddleware");

// PROTECTED ROUTES:

// add product
router.post("/", verifyToken, requireCompany, productController.addProduct);
// add variant
router.post("/:id/variant", verifyToken, requireCompany, productController.addVariant);

// delete product
router.delete("/:id", verifyToken, requireCompany, productController.deleteProduct);
// delete variant
router.delete("/:id/variant/:variantId", verifyToken, requireCompany, productController.deleteVariant);

// update variant
router.put("/:id/variant/:variantId", verifyToken, requireCompany, productController.updateVariant);
// update prod. Name
router.put("/:id/name", verifyToken, requireCompany, productController.updateProductName);
// update prod. Category
router.put("/:id/category", verifyToken, requireCompany, productController.updateProductCategory);


// PUBLIC ROUTES:

// get products filtred
router.get("/", productController.getProducts);

module.exports = router;
