const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.addProduct);
router.post("/:id/variant", productController.addVariant);

router.delete("/:id", productController.deleteProduct);
router.delete("/:id/variant/:variantId", productController.deleteVariant);

router.put("/:id/variant/:variantId", productController.updateVariant);
router.put("/:id/name", productController.updateProductName);

router.get("/", productController.getProducts);

module.exports = router;
