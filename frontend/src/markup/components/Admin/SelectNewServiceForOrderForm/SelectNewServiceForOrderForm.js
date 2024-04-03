import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ServiceService from "../../../../services/service.service";
import CustomerService from "../../../../services/customer.service";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";

const SelectServiceForOrderForm = () => {
 

  const navigate = useNavigate();

  const [customer, setCustomer] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  const customer_id = window.location.pathname.split("/")[5];
  const vehicle_id = window.location.pathname.split("/")[7];


  const [orderData, setOrderData] = useState({
    additional_request: "",
    order_total_price: "",
    order_description: "Oil change",
    active_order: 1,
    order_completed: 0,
    order_status: 0,
    additional_requests_completed: 0,
  });

  const [price, setPrice] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // Create all the states we need to store employee's data
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  let token = null; // To store the token
  let employee_id = null;
  console.log(employee);

  // console.log(employee_id);

  if (employee) {
    employee_id = employee.employee_id;
    token = employee.employee_token;
  }

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle checkbox change
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleServiceSelection = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      const isSelected = prevSelectedServices.some(
        (service) => service.service_id === serviceId
      );
      if (isSelected) {
        return prevSelectedServices.filter(
          (service) => service.service_id !== serviceId
        );
      } else {
        return [
          ...prevSelectedServices,
          { service_id: serviceId, service_completed: 0 },
        ];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!orderData.additional_request) {
      setServiceDescription("please enter service description");
      valid = false;
    }
    if (!orderData.order_total_price) {
      setPrice("please enter price");
      valid = false;
    }
    if (!valid) {
      return;
    }
    try {
      const res = await orderService.createOrder(
        employee_id,
        customer_id,
        vehicle_id,
        token,
        { ...orderData, order_services: selectedServices }
      );
      console.log(res)

      // toast.success(res.message, {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // });
      // console.log(res);
      navigate("/admin/orders");

      // console.log(res);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.message,
      //   {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // });
    }
  };

  

 
  useEffect(() => {
    if (customer_id) {
      // Ensure customer_id is not empty
      const customer = CustomerService. getCustomerById(
        customer_id,
        loggedInEmployeeToken
      );
      customer
        .then((response) => response.json())
        .then((data) => {
          setCustomer(data.data[0]);
          // console.log(data);
        });
    }
  }, []);

  useEffect(() => {
    const vehicle = vehicleService.getSingleVehicle(vehicle_id);
    vehicle
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data.data[0]);
        // console.log(data.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Call the getAllServices function
    const allServices = ServiceService.getAllServices(token);
    allServices
      .then((res) => {
        // if (!res.ok) {
        //   setApiError(true);
        //   if (res.status === 401) {
        //     setApiErrorMessage("Please login again");
        //   } else if (res.status === 403) {
        //     setApiErrorMessage("You are not authorized to view this page");
        //   } else {
        //     setApiErrorMessage("Please try again later");
        //   }
        // }
        return res.json();
      })
      .then((data) => {
        setServices(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Create a new order</h2>
              </div>

              <div className="text">
                <b>
                  Customer: {customer.customer_first_name}{" "}
                  {customer.customer_last_name}
                </b>
                <p>Email:{customer.customer_email}</p>
                <p>Phone Number:{customer.customer_phone_number}</p>
                <p>
                  Active customer:{customer?.active_customer ? "Yes" : "No"}
                </p>
                <p>
                  Edit customer info:{" "}
                  <Link to={`/admin/edit-customer/${customer.customer_id}`}>
                    <FaEdit />{" "}
                  </Link>{" "}
                </p>
              </div>

              <div className="text">
                <b>{vehicle.vehicle_make}</b>
                <p>Vehicle color: {vehicle.vehicle_color}</p>
                <p>Vehicle tag: {vehicle.vehicle_tag}</p>
                <p>Vehicle year: {vehicle.vehicle_year}</p>
                <p>Vehicle mileage: {vehicle.vehicle_mileage}</p>
                <p>Vehicle serial: {vehicle.vehicle_serial}</p>
                <p>
                  Edit Vehicle info:
                  <Link>
                    <FaEdit />{" "}
                  </Link>{" "}
                </p>
              </div>
              <b>Choose services</b>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Service Description</th>
                  </tr>
                </thead>
                <tbody>
                  {services?.map((common_service, index) => (
                    <tr key={common_service.service_id}>
                      <td>{common_service.service_name}</td>
                      <td>{common_service.service_description}</td>

                      <td>{employee.company_role_name}</td>

                      <td></td>
                      <td>
                        <input
                          type="checkbox"
                          name="service_id"
                          onChange={() =>
                            toggleServiceSelection(common_service.service_id)
                          }
                          checked={selectedServices.some(
                            (service) =>
                              service.service_id === common_service.service_id
                          )}
                          className=" h-5 w-5"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>Additional requests</h2>
                </div>
                <div className="row clearfix">
                  <div className="form-column col-lg-7">
                    <div className="inner-column">
                      <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                          {/* Service description input */}
                          <div className="form-group col-md-12">
                            <textarea
                              onChange={handleChange}
                              value={orderData.additional_request}
                              type="text"
                              name="additional_request"
                              placeholder="Service description"
                              required
                            />
                          </div>
                          {/* Price input */}
                          <div className="form-group col-md-12">
                            <input
                              type="text"
                              name="order_total_price"
                              onChange={handleChange}
                              value={orderData.order_total_price}
                              placeholder="Price"
                              required
                            />
                          </div>
                          {/* Submit button */}
                          <div className="form-group col-md-12">
                            <button
                              className="theme-btn btn-style-one"
                              type="submit"
                              disabled={success} // Disable button if submission is successful
                            >
                              <span>Submit Order</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default SelectServiceForOrderForm;
