import React, { useEffect, useState } from "react";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";

function EditAdminServiceForm() {
  const [serviceData, setServiceData] = useState({
    service_name: "", // Initialize service_name here
    service_description: "",
  });

  const service_id = window.location.pathname.split("/")[3];

  // Errors
  const [serviceNameRequired, setServiceNameRequired] = useState("");
  const [serviceDescriptionRequired, setServiceDescreptionRequired] =
    useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setServerError] = useState("");

  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(serviceData);
    // Handle client side validation
    let valid = true; // Flag
    // service_name is required
    if (!serviceData.service_name) {
      setServiceNameRequired("Service name is required");
      valid = false;
    } else {
      setServiceNameRequired("");
    }

    if (!serviceData.service_description) {
      setServiceDescreptionRequired("Service description is required");
      valid = false;
    } else {
      setServiceDescreptionRequired("");
    }

    // if the form is not valid, do Not submit
    if (!valid) {
      return;
    }

    // Send data to the server
    const updateService = serviceService.updateService(
      serviceData,
      service_id,
      loggedInEmployeeToken
    );
    updateService
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
          // Redirect to the service page after 2 seconds
          // For now, just redirect to the home page
          setTimeout(() => {
            window.location.href = "/admin/services";
          }, 2000);
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

  const [singleServiceData, setSingleServiceData] = useState({});
  console.log(singleServiceData);

 useEffect(() => {
  console.log(service_id, "is the service id");
  const service = serviceService.getServiceById(
    service_id,
    loggedInEmployeeToken
  );
  service
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the fetched data here
      setSingleServiceData(data.data);
      setServiceData(data.data[0]);
      console.log(data.data);
    });
}, [service_id]);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
        {singleServiceData && singleServiceData.length > 0 && (
 <div className="contact-title">
 {singleServiceData && singleServiceData.length > 0 && (
   <h2>
     Edit: 
     {singleServiceData[0]?.service_name}{" "}
     
   </h2>
 )}
</div>
)}
          {/* <h5>Service-ID: {serviceData.service_id}</h5> */}
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        onChange={handleChange}
                        value={serviceData.service_name}
                        type="text"
                        name="service_name" // Corrected the name attribute here
                        placeholder="Service Name"
                      />
                      <br />
                      <textarea
                        onChange={handleChange}
                        value={serviceData.service_description}
                        type="text"
                        name="service_description" // Corrected the name attribute here
                        placeholder="Service Description"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>update service</span>
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
  );
}

export default EditAdminServiceForm;
