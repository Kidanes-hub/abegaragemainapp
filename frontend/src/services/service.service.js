// Import url from the env
const api_url = process.env.REACT_APP_API_URL;

// Function to check if a vehicle with the given serial number already exists
export const checkExistingService = async (service_id) => {
  try {
    const response = await fetch(`/api/service?service_id=${service_id}`);
    const data = await response.json();
    return !!data; // Convert to boolean value
  } catch (error) {
    console.error("Error checking existing vehicle:", error);
    throw error;
  }
};

// Function to add new vehicles to the database
const addService = async (serviceData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  };
  // console.log(requestOptions);
  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
};

// A function to send get request to get all employees
const getAllServices = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
};

// Write a function to edit customer
const updateService = async (
  serviceData,
  service_id,
  loggedInEmployeeToken
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(serviceData),
  };
  const response = await fetch(
    `${api_url}/api/service/edit/${service_id}`,
    requestOptions
  );
  return response;
};


const getServiceById = async (service_id, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await fetch(
    `${api_url}/api/service/${service_id}`,

    requestOptions
  );
  console.log(response);
  return response;
};

const deleteService  = async (serviceId, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/service/${serviceId}`,

    requestOptions
  );
  console.log(response);
  return response;
};


// Export all functions
export default {
  addService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,
};
