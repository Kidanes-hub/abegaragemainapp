// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// Import the crypto module from node_modules

async function checkIfServiceExists(serviceName) {
  try {
    const query = "SELECT * FROM common_services WHERE service_name=?";
    const rows = await conn.query(query, [serviceName]);
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error); // log the error for debugging
    throw error; // throw the error to handle it at a higher level
  }
}

// A function to add a new service into the database
async function createService(service) {
  try {
    let createdService = {};
    // Insert service description into the 'common_service' table
    const query =
      "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
    const rows = await conn.query(query, [
      service.service_name,
      service.service_description,
    ]);
    createdService.id = rows.insertId;
    console.log(rows);
    if (rows.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error); // log the error for debugging
    throw error; // throw the error to handle it at a higher level
  }
}

// Get all ervices
async function getAllServices() {
  const query =
    "SELECT * FROM common_services ORDER BY service_id DESC LIMIT 10";
  const rows = await conn.query(query);
  return rows;
}

// Get sungle service by id
async function getServiceById(serviceId) {
  const query = "SELECT * FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [serviceId]);
  return rows;
}

//  Update service
async function updateService(service) {
  const query =
    "UPDATE common_services SET service_name = ?,service_description = ? WHERE service_id = ?";
  await conn.query(query, [
    service.service_name,
    service.service_description,
    service.service_id,
  ]);
  return " Service updated  successfully! ";
}

// Delete service by id
async function deleteServiceById(serviceId) {
  try {
    const query = "DELETE FROM common_services WHERE service_id = ?";
    const result = await conn.query(query, [serviceId]);
    if (result.affectedRows === 0) {
      return { message: "No service found with the provided ID." };
    }
    return { message: "Service deleted successfully." };
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}

// Expoert  functions as object
module.exports = {
  checkIfServiceExists,
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteServiceById,
};
