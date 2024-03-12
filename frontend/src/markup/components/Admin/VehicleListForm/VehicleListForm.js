// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import vehicleService from "../../../../services/vehicle.service";

// Create the vehicleList component
const VehicleListForm = ({ customer_id }) => {
  const [vehicleList, setVehicleList] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  let token = null; // To store the token

  useEffect(() => {
    // Call the getAllEmployees function
    const vehicleList = vehicleService.getSingleVehicle(customer_id, token);
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

  // const ColoredLine = ({ color }) => (
  //   <hr
  //     style={{
  //       color: color,
  //       backgroundColor: color,
  //       height: 5,
  //     }}
  //   />
  // );


  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              {/* <h2>{apiErrorMessage}</h2> */}
              <h2>No vehicle found</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              {/* <ColoredLine color="red" /> */}
              <div className="contact-title">{/* <h2>Vehicles</h2> */}</div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Vehicle Id</th>
                    <th>Vehicle year</th>
                    <th>Vehicle make</th>
                    <th>Vehicle model</th>
                    <th>Vehicle type</th>
                    <th>Vehicle mileage</th>
                    <th>Vehicle tag</th>
                    <th>Vehicle serial</th>
                    <th>Vehicle color</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleList.map((vehicle) => (
                    <tr key={vehicle.vehicle_id}>
                      <td>{vehicle.vehicle_id}</td>
                      <td>{vehicle.vehicle_year}</td>
                      <td>{vehicle.vehicle_make}</td>
                      <td>{vehicle.vehicle_model}</td>
                      <td>{vehicle.vehicle_type}</td>
                      <td>{vehicle.vehicle_mileage}</td>
                      <td>{vehicle.vehicle_tag}</td>
                      <td>{vehicle.vehicle_serial}</td>
                      <td>{vehicle.vehicle_color}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* <ColoredLine color="red" /> */}
          </section>
        </>
      )}
    </>
  );
};

// Export the EmployeesList component
export default VehicleListForm;
