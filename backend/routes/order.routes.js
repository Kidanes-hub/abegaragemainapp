// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the order controller
const ordersController = require("../controllers/order.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add order request on post
router.post("/api/order", 
// [authMiddleware.verifyToken, authMiddleware.isAdmin],
ordersController.createOrder);
// Create  a route to handle the get all orders request on get
router.get('/api/orders',
// [authMiddleware.verifyToken, authMiddleware.isAdmin],  
ordersController.getAllOrders);
// Create a route to handle getting a single order by ID
router.get('/api/order/:order_id', ordersController.getOrderById);
// update order by order-id
router.put('/api/order/edit/:order_id',
// [authMiddleware.verifyToken, authMiddleware.isAdmin] ,
ordersController. updateOrder);

// Export the router
module.exports = router;
