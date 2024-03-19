// Imoport the query function from the db.config.js file
const conn = require("../config/db.config");

// Create a function to check if vehicle exists in database or not
async function existingVehicle(serial_number) {
  const query = "SELECT * FROM customer_vehicle_info  WHERE vehicle_serial = ?";
  const rows = await conn.query(query, [serial_number]);
  if (rows.length > 0) return true;
  else return false;
}

// Create the add vehicle function
async function addVehicle(vehicle) {
  try {
    // Insert the data into customer_vehicle_info table
    const query =
      "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const rows = await conn.query(query, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the vehicle id from the insert
    const vehicle_id = rows.insertId;
    // Return the vehicle object
    return { vehicle_id, ...vehicle };
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Write  afunction  that will get all vehicles for a specific user
async function getVehiclesByCustomerId(customerID) {
  const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ? ";
  const rows = await conn.query(query, [customerID]);
  if (rows.length === 0) {
    return false;
  }

  // console.log("From line 50", rows);

  return rows;
}

// Get sungle service by id
async function getVehicleById(vehicleId) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
  const rows = await conn.query(query, [vehicleId]);
  return rows;
}

//  Update vehicle
async function updateVehicle(vehicle, vehicle_id) {
  try {
    console.log(vehicle_id)
    const query =
      "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ?, customer_id = ? WHERE vehicle_id = ?";
    const rows = await conn.query(query, [
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
      vehicle.customer_id,
      vehicle_id
     
    ]);
    

    if (rows.affectedRows !== 1) {
      return false;
    }
    
    // Return the updated vehicle object
    return vehicle;
  } catch (error) {
    console.log(error);
    return false;
  }
}



// Export the vehicle service functions
module.exports = {
  existingVehicle,
  addVehicle,
  getVehiclesByCustomerId,
  getVehicleById,
  updateVehicle,
};
