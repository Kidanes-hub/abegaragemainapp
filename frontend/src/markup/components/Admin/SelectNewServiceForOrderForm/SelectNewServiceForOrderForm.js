import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ServiceService from "../../../../services/service.service";
import CustomerService from "../../../../services/customer.service";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";

const SelectServiceForOrderForm = () => {
  const [orderData, setOrderData] = useState({
    service_description: "",
    price: "",
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
  });

  const [customer, setCustomer] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  const vehicle_id = window.location.pathname.split("/")[7];

  const customer_id = window.location.pathname.split("/")[5];

  // States to store form data
  const [service_description, setServiceDescription] = useState("");
  const [price, setPrice] = useState("");

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
  if (employee) {
    token = employee.employee_token;
  }

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedServices = [...services];
    updatedServices[index].checked = !updatedServices[index].checked;
    setServices(updatedServices);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    let valid = true;

    // Form validation...
    if (valid) {
      try {
        const orderData = {
          service_description,
          price,
        };

        const newOrder = await orderService.createOrder(
          orderData,
          loggedInEmployeeToken
        );
        const data = await newOrder.json();

        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      }
    }
  };

  useEffect(() => {
    const vehicle = vehicleService.getSingleVehicle(vehicle_id);
    vehicle
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data.data[0]);
        console.log(data.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (customer_id) {
      // Ensure customer_id is not empty
      const customer = CustomerService.getCustomerById(
        customer_id,
        loggedInEmployeeToken
      );
      customer
        .then((response) => response.json())
        .then((data) => {
          setCustomer(data.data[0]);
          console.log(data);
        });
    }
  }, [customer_id]);

  useEffect(() => {
    // Call the getAllServices function
    const allServices = ServiceService.getAllServices(token);
    allServices
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          console.log(data.data);
          // Add 'checked' property to each service
          const servicesWithChecked = data.data.map((service) => ({
            ...service,
            checked: false,
          }));
          setServices(servicesWithChecked);
        }
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
                  {services.map((common_service, index) => (
                    <tr key={common_service.service_id}>
                      <td>{common_service.service_name}</td>
                      <td>{common_service.service_description}</td>

                      <td>{employee.company_role_name}</td>

                      <td></td>
                      <td>
                        <input
                          type="checkbox"
                          checked={common_service.checked || false}
                          onChange={() => handleCheckboxChange(index)}
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
                        <form
                        // onSubmit={handleSubmit}
                        >
                          <div className="row clearfix">
                            <div className="form-group col-md-12">
                              <textarea
                                // onChange={(e) =>
                                //   setServiceDescription(e.target.value)
                                // }
                                // value={service_description}
                                type="text"
                                name=" service_description"
                                placeholder="Service description"
                              />
                              <br />
                              <input
                                type="text"
                                name="price"
                                // onChange={(e) => setPrice(e.target.value)}
                                // value={price}
                                placeholder="price"
                                required
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <button
                                className="theme-btn btn-style-one"
                                type="submit"
                                data-loading-text="Please wait..."
                              >
                                <span>Submit Order</span>
                              </button>
                            </div>
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
