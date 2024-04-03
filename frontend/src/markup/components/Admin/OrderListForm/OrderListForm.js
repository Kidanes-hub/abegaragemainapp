import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import customerService from "../../../../services/customer.service";
import vehicleService from "../../../../services/vehicle.service";
import employeeService from "../../../../services/employee.service";

const OrderListForm = () => {
  const { employee } = useAuth();
  let token = null;
  let employeeFirstName = "";
  if (employee) {
    token = employee.employee_token;
    employeeFirstName = employee.employee_first_name;
  }

  const [orders, setOrders] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [employeeNames, setEmployeeNames] = useState({});
  const [customers, setCustomers] = useState({});
  const [vehicles, setVehicles] = useState({});

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderInfo = await orderService.getAllOrders(token);
        if (!orderInfo.ok) {
          setApiError(true);
          if (orderInfo.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (orderInfo.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
          return;
        }
        const orderData = await orderInfo.json();
        if (orderData.data.length !== 0) {
          setOrders(orderData.data);
          orderData.data.forEach((order) => {
            fetchCustomer(order.customer_id);
            fetchVehicle(order.vehicle_id);
            fetchEmployeeData(order.employee_id);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderData();
  }, [token]);

  const fetchEmployeeData = async (employeeId) => {
    try {
      const employeeInfo = await employeeService.getEmployeeById(
        employeeId,
        token
      );
      const employeeData = await employeeInfo.json();
      const employeeName = employeeData.employee_first_name;
      setEmployeeNames((prevNames) => ({
        ...prevNames,
        [employeeId]: employeeName,
      }));
    } catch (error) {
      console.error(`Error fetching employee data: ${error}`);
    }
  };

  const fetchCustomer = async (customerId) => {
    try {
      const customerInfo = await customerService.getCustomerById(
        customerId,
        token
      );
      const customerData = await customerInfo.json();
      setCustomers((prevCustomers) => ({
        ...prevCustomers,
        [customerId]: customerData.data[0],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVehicle = async (vehicleId) => {
    try {
      const vehicleInfo = await vehicleService.getSingleVehicle(vehicleId);
      const vehicleData = await vehicleInfo.json();
      setVehicles((prevVehicles) => ({
        ...prevVehicles,
        [vehicleId]: vehicleData.data[0],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>No orders found</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Orders</h2>
            </div>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Order Date</th>
                  <th>Received By</th>
                  <th>Order Status</th>
                  <th>View/Edit</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>
                      {customers[order.customer_id]?.customer_first_name}{" "}
                      {customers[order.customer_id]?.customer_last_name}
                      <br />
                      {customers[order.customer_id]?.customer_email} <br />
                      {customers[order.customer_id]?.customer_phone_number}
                    </td>
                    <td>
                      {vehicles[order.vehicle_id]?.vehicle_make} <br />
                      <b />
                      {vehicles[order.vehicle_id]?.vehicle_model}
                    </td>

                    <td>{format(new Date(order.order_date), "MM/dd/yyyy")}</td>
                    <td>{employeeFirstName}</td>
                    {/* <td>{employeeNames[order.employee_id]}</td> */}
                    <td>
                      {order.order_status === 1 ? "In progress" : "Completed"}
                    </td>
                    <td>
                      <Link to={`/admin/edit-order/${order.order_id}`}>
                        <MdOpenInNew />
                        ||
                      </Link>
                      <Link to={`/admin/view-order/${order.order_id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderListForm;
