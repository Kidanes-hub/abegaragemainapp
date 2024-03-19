// Import url from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send a post request to create a new customer
const createOrder = async (orderData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(orderData),
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