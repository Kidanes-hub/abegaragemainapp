import React, { useState, useEffect } from "react";
import { FaEdit, FaHandPointer } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CustomerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Table } from "react-bootstrap";
import vehicleService from "../../../../services/vehicle.service";
import VehicleListForm from "../VehicleListForm/VehicleListForm";

function CustomersVehicleList() {
  const [orderData, setOrderData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
  });
  const [vehicleList, setVehicleList] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  let token = null; // To store the token

  const customer_id = window.location.pathname.split("/")[5];

  const navigate = useNavigate();

  // Errors
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [phoneNumberRequired, setPhoneNumberRequired] = useState("");

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const [singleCustomerData, setSingleCustomerData] = useState({});

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
          setSingleCustomerData(data.data);
          console.log(data);
          if (data.data[0]) {
            setOrderData(data.data[0]);
          }
        });
    }
  }, [customer_id]);

  useEffect(() => {
    // Call the getAllVehicles function
    const vehicleList = vehicleService.getCustomerById(customer_id, token);
    vehicleList
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
          setVehicleList(data.data);
          console.log(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create a new order</h2>
        </div>
        <div className="text">
          <h5>
            <b>
              {orderData.customer_first_name} {orderData.customer_last_name}{" "}
            </b>
          </h5>
          <p> Email: {singleCustomerData[0]?.customer_email} </p>
          <p>Phone Number: {singleCustomerData[0]?.customer_phone_number} </p>
          <p>
            Active customer:
            {singleCustomerData[0]?.active_customer == 1 ? "Yes" : "No"}{" "}
          </p>
          <p>
            Edit customer info:{" "}
            <Link to={`/admin/edit-customer/${customer_id}`}>
              <FaEdit />
            </Link>
          </p>
        </div>

        {/* <VehicleListForm customer_id={customer_id} /> */}
        <section className="contact-section">
          <div className="auto-container">
            <h4>
              {" "}
              <b>Choose a vehicle - </b>
            </h4>
            <div className="contact-title">{/* <h2>Vehicles</h2> */}</div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Vehicle Id</th>
                  <th>Year</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Tag</th>
                  <th>Serial</th>
                  <th>Color</th>
                  <th>Mileage</th>
                  <th>Choose</th>
                </tr>
              </thead>
              <tbody>
                {vehicleList.map((vehicle) => (
                  <tr key={vehicle.customer_id}>
                    <td>{vehicle.vehicle_id}</td>
                    <td>{vehicle.vehicle_year}</td>
                    <td>{vehicle.vehicle_make}</td>
                    <td>{vehicle.vehicle_model}</td>
                    <td>{vehicle.vehicle_tag}</td>
                    <td>{vehicle.vehicle_serial}</td>
                    <td>{vehicle.vehicle_color}</td>
                    <td>{vehicle.vehicle_mileage}</td>
                    <Link to={`order/${vehicle.vehicle_id}`}>
                      <FaHandPointer />{" "}
                    </Link>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </div>
    </section>
  );
}

export default CustomersVehicleList;
