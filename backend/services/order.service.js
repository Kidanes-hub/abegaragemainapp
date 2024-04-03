// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the crypto module from node_modules
const crypto = require("crypto");

// Function to generate order hash
function generateOrderHash(order) {
  const orderData = JSON.stringify(order);
  const hash = crypto.createHash("sha256").update(orderData).digest("hex");
  return hash;
}

async function checkIfCustomerExists(customer_id) {
  const query = "SELECT * FROM customer_identifier WHERE customer_id = ?";
  const rows = await conn.query(query, [customer_id]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

async function createOrder(order) {
  let createdOrder = {};
  try {
    // Generate order hash
    const orderHash = generateOrderHash(order);
    console.log("orderHash", orderHash);

    // Insert order details into orders table
    const query1 = `INSERT INTO orders (employee_id, customer_id, vehicle_id,  active_order, order_hash) VALUES (?, ?, ?, ?, ?)`;
    const rows1 = await conn.query(query1, [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      // order.order_date,
      1, // Assuming active_order is set to 1 for new orders
      orderHash,
    ]);

    if (rows1.affectedRows !== 1) {
      return false;
    }
    // Get the auto generated customer_id
    const order_id = rows1.insertId;

    // Insert order status into order_status table
    const query2 =
      "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
    const rows2 = await conn.query(query2, [
      order_id,
      1, // Assuming initial order status is set to 1
    ]);

    // Insert order services into order_services table
    const query3 =
      "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";
    for (const service of order.order_services) {
      const rows3 = await conn.query(query3, [
        order_id,
        service.service_id,
        service.service_completed,
      ]);
    }

    // Insert order info into order_info table
    const query4 = `INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (?, ?, ?, ?)`;
    const rows4 = await conn.query(query4, [
      order_id,
      order.order_total_price,
      // order.estimated_completion_date,
      // order.completion_date,
      order.additional_request,
      // order.notes_for_internal_use,
      // order.notes_for_customer,
      order.additional_requests_completed,
    ]);

    createdOrder = {
      order_id: order_id,
    };
  } catch (error) {
    console.log(error);
  }
  return createdOrder;
}

// Get all orders
async function getAllOrders(orders) {
  const query =
    "SELECT * FROM orders INNER JOIN order_info INNER JOIN order_services INNER JOIN order_status ON orders.order_id = order_info.order_id  ORDER BY orders.order_id DESC LIMIT 10";
  const rows = await conn.query(query);
  return rows;
}

// Get single order
async function getOrderById(orderId) {
  const query =
    "SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id  WHERE orders.order_id = ?";
  const rows = await conn.query(query, [orderId]);
  return rows;
}

async function updateOrder(orderId, order) {
  try {
    // Update order details in orders table
    const query1 =
      "UPDATE orders SET employee_id = ?, customer_id = ?, vehicle_id = ?, active_order = ? WHERE order_id = ?";
    await conn.query(query1, [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      order.active_order,
      orderId, // Added order_id for WHERE condition
    ]);

    // Update order info in order_info table
    const query2 =
      "UPDATE order_info SET order_total_price = ?, completion_date = ?, additional_request = ?, notes_for_internal_use = ?, notes_for_customer = ?, additional_requests_completed = ? WHERE order_id = ?";
    await conn.query(query2, [
      order.order_total_price,
      order.completion_date,
      order.additional_request,
      order.notes_for_internal_use,
      order.notes_for_customer,
      order.additional_requests_completed,
      orderId, // Added order_id for WHERE condition
    ]);

    // Update order services in order_services table
    if (order.order_services && order.order_services.length > 0) {
      for (const service of order.order_services) {
        const query3 =
          "UPDATE order_services SET service_completed = ? WHERE order_id = ? AND service_id = ?";
        await conn.query(query3, [
          service.service_completed,
          orderId,
          service.service_id,
        ]);
      }
    }

    // Update order status in order_status table
    const query4 =
      "UPDATE order_status SET order_status = ? WHERE order_id = ?";
    await conn.query(query4, [
      order.order_status,
      orderId, // Added order_id for WHERE condition
    ]);

    return "Order updated successfully";
  } catch (error) {
    throw error;
  }
}

module.exports = {
  checkIfCustomerExists,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
};
