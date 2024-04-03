// Import url from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send a post request to create a new customer
const createOrder = async (employee_id, customer_id, vehicle_id,  loggedInEmployeeToken, orderData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify({ ...orderData, customer_id, employee_id,vehicle_id }), // Include customer_id in the request body
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/order`, requestOptions);
  return response;
};


// Fetch single customer data
async function getCustomerById(id, loggedInEmployeeToken) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);
  console.log(response);
  return response;
} 

// A function to send get request to get all orders
const getAllOrders = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  console.log(response);
  return response;
};


// Export all the functions 
const orderService = {
  createOrder,
  getCustomerById,
  getAllOrders
}

export default orderService; 