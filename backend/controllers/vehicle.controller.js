// Import the vehicle service
const vehicleService = require("../services/vehicle.service");

// Create the add vehicle function
async function addVehicle(req, res, next) {
  // Check if vehicle is already in database by checking its serial number
  const existingVehicle = await vehicleService.existingVehicle(
    req.body.vehicle_serial
  );
  if (existingVehicle) {
    return res.status(400).json({
      error: "This serial number has been registered before",
    });
  } else {
    try {
      const vehicleData = req.body;
      // Call the addVehicle method from our service and pass the data
      const vehicle = await vehicleService.addVehicle(vehicleData);
      if (!vehicle) {
        return res.status(400).json({
          error: "Failed to add the vehicle!",
        });
      } else {
        return res.status(200).json({
          status: "true",
          data: vehicle,
        });
      }
    } catch (error) {
      console.log("Error in adding a new vehicle", error);
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  }
}

// Get vehicle by customer id
async function getVehiclesByCustomerId(req, res, next) {
  const customerID = req.params.customer_id;
  console.log(req.params);
  try {
    const vehicle = await vehicleService.getVehiclesByCustomerId(customerID);
    if (!vehicle) {
      res.status(404).json({ message: "No vehicles found for this user." });
    } else {
      res.status(200).json({
        status: "true",
        data: vehicle,
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
}

// Get single vehicle by vehicle_id
async function getVehicleById(req, res, next) {
  try {
    const vehicleId = req.params.id;
    const vehicle = await vehicleService.getVehicleById(vehicleId);

    if (!vehicle || vehicle.error) {
      return res
        .status(404)
        .json({ message: "No vehicle found with the provided ID." });
    } else {
      return res.status(200).json({
        status: true,
        data: vehicle,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// Update service info 
async function updateVehicle(req, res, next) {
  try {
    const vehicleData = req.body;
    const  vehicleId = req.params.vehicle_id
    const updatedVehicle = await vehicleService.updateVehicle(vehicleData, vehicleId);

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'The vehicle was not updated.' });
    }

    return res.status(200).json({ 
      message: "The vehicle was updated successfully.", 
      data: updatedVehicle 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Export the add vehicle function
module.exports = {
  addVehicle,
  getVehiclesByCustomerId,
  getVehicleById,
  updateVehicle
};
