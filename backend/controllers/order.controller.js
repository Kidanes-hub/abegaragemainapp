const { json } = require("express");
// Import the order service
const orderService = require('../services/order.service');


// Create the add order controller
async function createOrder(req, res, next) {
  try {
    const orderData = req.body;
    console.log(orderData)
    
    // // Validate required fields
    // if (!orderData.employee_id || !orderData.customer_id || !orderData.vehicle_id || !orderData.order_description || !orderData.estimated_completion_date) {
    //   return res.status(400).json({
    //     error: "Missing required fields. Please provide employee_id, customer_id, vehicle_id, order_description, and estimated_completion_date."
    //   });
    // }

    // Check if customer exists
    const customerExists = await orderService.checkIfCustomerExists(orderData.customer_id);
    if (!customerExists) {
      return res.status(400).json({
        error: "Customer does not exist."
      });
    }

    // Create the order
    const order = await orderService.createOrder(orderData);
    if (!order) {
      return res.status(400).json({
        error: "Failed to create order!"
      });
    }

    res.status(200).json({
      status: "true",
      data: order
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}


// Get all orders
async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();

    if (!orders) {
      return res.status(400).json({ message: "Failed to fetch all orders" });
    } else {
      return res.status(200).json({
        status: "success",
        data: orders,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get a single order by ID
async function getOrderById(req, res, next) {
  try {
    const orderId = req.params.order_id; // Corrected parameter name
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(400).json({ message: "Failed to get order" });
    } else {
      return res.status(200).json({
        status: true,
        data: order,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
}

// Update an Order
async function updateOrder(req, res, next) {
  try {
    const orderData = req.body;
    console.log(orderData)
    const orderId = req.params.order_id; // Corrected parameter name
    const order = await orderService.updateOrder(orderId, orderData); // Corrected function call

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or failed to update" });
    } else {
      return res
        .status(200)
        .json({ message: "Order updated successfully!" });
    }
  } catch (error) {
    console.error(error); // Changed to console.error for better error logging
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
}


// Export the createOrder controller
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder
};
