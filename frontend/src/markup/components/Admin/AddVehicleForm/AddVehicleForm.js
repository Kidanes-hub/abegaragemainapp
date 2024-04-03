import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import VehicleService from "../../../../services/vehicle.service";
import CustomerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import VehicleListForm from "../VehicleListForm/VehicleListForm";

function AddVehicleForm() {
  const [customerData, setCustomerData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  const customer_id = window.location.pathname.split("/")[3];
  

  const navigate = useNavigate();

  // Errors
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [phoneNumberRequired, setPhoneNumberRequired] = useState("");
  const [vehicleYearRequired, setVehicleYearRequired] = useState("");
  const [vehicleMakeRequired, setVehicleMakeRequired] = useState("");
  const [vehicleModelRequired, setVehicleModelRequired] = useState("");
  const [vehicleTypeRequired, setVehicleTypeRequired] = useState("");
  const [vehicleMileageRequired, setVehicleMileageRequired] = useState("");
  const [vehicleTagRequired, setVehicleTagRequired] = useState("");
  const [vehicleSerialRequired, setVehicleSerialRequired] = useState("");
  const [vehicleColorRequired, setVehicleColorRequired] = useState("");

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // Create all the states we need to store employee's data
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    // Client-side validations
    if (!customerData.customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!customerData.customer_last_name) {
      setLastNameRequired("Last name is required");
      valid = false;
    } else {
      setLastNameRequired("");
    }

    if (!customerData.customer_phone_number) {
      setPhoneNumberRequired("Phone number is required");
      valid = false;
    } else {
      setPhoneNumberRequired("");
    }

    if (!customerData.vehicle_year) {
      setVehicleYearRequired("Vehicle year is required");
      valid = false;
    } else {
      setVehicleYearRequired("");
    }

    if (!customerData.vehicle_make) {
      setVehicleMakeRequired("Vehicle make is required");
      valid = false;
    } else {
      setVehicleMakeRequired("");
    }

    if (!customerData.vehicle_model) {
      setVehicleModelRequired("Vehicle model is required");
      valid = false;
    } else {
      setVehicleModelRequired("");
    }

    if (!customerData.vehicle_type) {
      setVehicleTypeRequired("Vehicle type is required");
      valid = false;
    } else {
      setVehicleTypeRequired("");
    }

    if (!customerData.vehicle_mileage) {
      setVehicleMileageRequired("Vehicle mileage is required");
      valid = false;
    } else {
      setVehicleMileageRequired("");
    }

    if (!customerData.vehicle_tag) {
      setVehicleTagRequired("Vehicle tag is required");
      valid = false;
    } else {
      setVehicleTagRequired("");
    }

    if (!customerData.vehicle_serial) {
      setVehicleSerialRequired("Vehicle serial is required");
      valid = false;
    } else {
      setVehicleSerialRequired("");
    }

    if (!customerData.vehicle_color) {
      setVehicleColorRequired("Vehicle color is required");
      valid = false;
    } else {
      setVehicleColorRequired("");
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }

    // Send data to server
    const addVehicle = VehicleService.addVehicle(
      customerData,
      customer_id,
      loggedInEmployeeToken
    );
    addVehicle
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
          console.log(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // Redirect to the customers page after 2 seconds        
          setTimeout(() => {
            window.location.href = "/admin/customers";
          }, 2000);
          navigate("/admin/customers");
        }
      })
      // Handle Catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  const [singleCustomerData, setSingleCustomerData] = useState({});

  useEffect(() => {
    console.log(customer_id, "customer_id");

    const customer = CustomerService.getCustomerById(
      customer_id,
      loggedInEmployeeToken
    );
    customer
      .then((response) => response.json())
      .then((data) => {
        setSingleCustomerData(data.data);
        if (data.data[0]) {
          setCustomerData(data.data[0]);
        }
        console.log(data.data);
      });
  }, [customer_id]);
  return (
    <section className="history-section">
      <div className="history-block">
        <div className="content"></div>
      </div>
      <div className="auto-container">
        <div className="history-block">
          <div className="years">info</div>
          <div className="content">
            <h4>
              Customer: {singleCustomerData[0]?.customer_first_name}{" "}
              {singleCustomerData[0]?.customer_last_name}
            </h4>
            <div className="text">
              <p>Email: {singleCustomerData[0]?.customer_email} </p>
              <p>
                Phone Number: {singleCustomerData[0]?.customer_phone_number}{" "}
              </p>
              <p>
                Active customer:
                {singleCustomerData[0]?.active_customer == 1
                  ? "Yes"
                  : "No"}{" "}
              </p>
              <p>
                Edit customer info:{" "}
                <Link to={`/admin/edit-customer/${customer_id}`}>
                  <FaEdit />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="history-block">
          <div className="years">Cars</div>
          <div className="content">
            <h5>
              <b>Vehicles of {singleCustomerData[0]?.customer_first_name}</b>
            </h5>
            <div className="auto-container">
              <div className="csearch"></div>
              <div className="row clearfix">
                <div className="form-column col-lg-7">
                  <div className="inner-column">
                    <div className="contact-form">
                      <form onSubmit={handleSubmit}>
                        <div className="row clearfix">
                          <VehicleListForm customer_id={customer_id} />
                 <h4>Add a new vehicle -</h4>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData?.vehicle_year}
                              type="text"
                              name="vehicle_year"
                              placeholder="vehicle year"
                            />
                            <span className="error">{vehicleYearRequired}</span>
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData.vehicle_make}
                              type="text"
                              name="vehicle_make"
                              placeholder="vehicle make"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData.vehicle_model}
                              type="text"
                              name="vehicle_model"
                              placeholder="vehicle model"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData.vehicle_type}
                              type="text"
                              name="vehicle_type"
                              placeholder="vehicle type"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData.vehicle_mileage}
                              type="text"
                              name="vehicle_mileage"
                              placeholder="vehicle mileage"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData.vehicle_tag}
                              type="text"
                              name="vehicle_tag"
                              placeholder="vehicle tag"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData.vehicle_serial}
                              type="text"
                              name="vehicle_serial"
                              placeholder="vehicle serial"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              onChange={handleChange}
                              value={customerData.vehicle_color}
                              type="text"
                              name="vehicle_color"
                              placeholder="vehicle color"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <button
                              className="theme-btn btn-style-one"
                              type="submit"
                              data-loading-text="Please wait..."
                            >
                              <span>Add Vehicle</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="history-block">
          <div className="years">Orders</div>
          <div className="content">
            <h4>Orders of {singleCustomerData[0]?.customer_first_name}</h4>
            <div className="text">Orders will be displayed here</div>
          </div>
        </div>
        <div className="history-block">
          <div className="content"></div>
        </div>
      </div>
    </section>
  );
}

export default AddVehicleForm;
