const ordersServices = require("../services/orders");

const getOrders = async(req, res) => {
    const orders = await ordersServices.getOrders();
    console.log(orders);
    res.json({ msg: "matenme" });
}

module.exports = {
    getOrders
}