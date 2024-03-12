// Import the express module
const express = require('express');
// call the router method from express to create the router
const router = express.Router();
// Import the vehicle controller
const serviceController = require('../controllers/service.controller')
// Import middleweare
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add vehicle request on post 
router.post('/api/service', serviceController.createService);
// create a route that handles to get single vehicle by customer_id
router.get('/api/services', serviceController.getAllServices)
// Get service by service_id
router.get("/api/service/:id", serviceController.getServiceById);
// Update service by id 
router.put("/api/service/edit/:service_id", 
// authMiddleware,
serviceController.updateService);
// Delete service by id
// Create a route to handle the delete service request
router.delete("/api/service/:id", serviceController.deleteService);
// export the router
module.exports = router;
