const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.home);
router.get("/create", productController.createList);
router.get("/list", productController.getList);
router.get("/:id", productController.getProduct);
router.put('/:id/update',productController.updateProduct)
router.delete('/:id/delete',productController.deleteProduct)

module.exports = router;
