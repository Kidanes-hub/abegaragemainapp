const express = require("express");
const serviceService = require("../services/service.service");

async function createService(req, res, next) {
  try {
    // Check if service exists already in the database
    const serviceExists = await serviceService.checkIfServiceExists(
      req.body.service_name
    );

    if (serviceExists) {
      return res.status(400).json({
        error: "This service name is already taken.",
      });
    } else {
      const newService = req.body;
      // Create the service
      const createdService = await serviceService.createService(newService);
      if (!createdService) {
        return res.status(400).json({
          error: "Failed to add the new service",
        });
      } else {
        return res.status(200).json({
          status: "true",
          data: "Service added successfully!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

// Get all services
async function getAllServices(req, res, next) {
  try {
    const services = await serviceService.getAllServices();
    if (!services) {
      return res.status(400).json({ message: "Failed to fetch services" });
    } else {
      return res.status(200).json({
        status: "success",
        data: services,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get single service by service_id
async function getServiceById(req, res, next) {
  try {
    const serviceId = req.params.id;
    const service = await serviceService.getServiceById(serviceId);

    if (!service || service.error) {
      return res
        .status(404)
        .json({ message: "No service found with the provided ID." }); 
    } else {
      return res.status(200).json({
        status: true,
        data: service,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// Update service info 
async function updateService(req, res, next) {
  try {
    const serviceData = req.body;

    // const serviceId = req.params.service_id
    const service = await  serviceService.updateService(serviceData);

    if(!service) {
      return res.status(404).json({ message: 'The service was not updated.'});
    }else{
      return res.status(200).json({ 
        message: "true", 
        data: service })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


// Delete service by id
async function deleteService(req, res, next) {
  try {
    const serviceId = req.params.id;
    const result = await serviceService.deleteServiceById(serviceId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};
