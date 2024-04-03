// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Link } from "react-router-dom";

// Create the servivesList component
const ServiceListTable = () => {
  // Create all the states we need to store services data
  const [serviceList, setServiceList] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  const handleDelete = async (id) => {
    try {
      const response = await serviceService.deleteService(id, token);
      if (response.status === 200) {
        window.location.reload();
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    // Call the getAllServices function
    const serviceList = serviceService.getAllServices(
      // service_id,
      token
    );
    serviceList
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
          setServiceList(data.data);
          console.log(data.data); // Shows all data in the serviceListtable on the console
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
              {/* <h2>{apiErrorMessage}</h2> */}
              <h2>No service found</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Services we provide</h2>
                <p>
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end odf the day, going foreward,
                  a new normal that has evolved from the generation X is on the
                  runway heading towards a streamlined cloud solution.
                </p>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Service Description</th>
                    <th>Edit-Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceList.map((common_services) => (
                    <tr key={common_services.service_id}>
                      <td>{common_services.service_name} </td>
                      <td>{common_services.service_description}</td>
                      <Link
                        to={`/admin/edit-service/${common_services.service_id}`}
                      >
                        {" "}
                        <FaEdit />{" "}
                      </Link>{" "}
                      <button
                        onClick={() => handleDelete(common_services.service_id)}
                      >
                        {" "}
                        ---
                        <FaTrash />
                      </button>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </>
      )}
    </>
  );
};

// Export the ServicesList component
export default ServiceListTable;
