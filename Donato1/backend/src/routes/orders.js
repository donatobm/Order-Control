const { Router } = require("express");

const { getOrders } = require("../controllers/orders");

const router = Router();

router.post("/", getOrders);

module.exports = router;