const express = require("express");
const router = express.Router();

const Manager = require("../controllers/cart.manager");
const manager = new Manager();

router.get("/:id/productos", (req, res) => {
  let result = manager.findProductsByIdCart(req.params.id);
  if (!result) {
    return res.send({ error: "cart was not found" });
  }
  res.send(result);
});

router.post("/", (req, res) => {
  if (!req.body.products) {
    return res.send({ error: "data is required" });
  }
  let result = manager.create({
    timestamp: Date.now(),
    products: req.body.products,
  });
  res.send(result);
});

router.post("/:id/productos", (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.code ||
    !req.body.stock ||
    !req.body.price ||
    !req.body.thumbnail
  ) {
    return res.send({ error: "data is required" });
  }
  let result = manager.createProduct(req.params.id, req.body);
  if (!result) {
    return res.send({ error: "cart was not found" });
  }
  res.send(result);
});

router.delete("/:id", (req, res) => {
  let result = manager.delete(req.params.id);
  res.send(result);
});

router.delete("/:id/productos/:productId", (req, res) => {
  let result = manager.deleteProduct(req.params.id, req.params.productId);
  if (!result) {
    return res.send({ error: "cart was not found" });
  }
  res.send(result);
});

module.exports = router;
