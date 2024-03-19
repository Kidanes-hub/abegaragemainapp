import React, { useState } from "react";
import ServiceListTable from "../ServiceListTable/ServiceListTable";
import serviceService from "../../../../services/service.service";
import { Link, useNavigate } from "react-router-dom";

function AddServicesForm(props) {
  const [serviceName, setServiceName] = useState("");
  const [serviceDecription, setServiceDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  let serviceData = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    serviceData = {
      service_name: serviceName,
      service_description: serviceDecription,
    };

    try {
      if (!serviceName || !serviceDecription) {
        // alert('Please fill out all fields');

        setErrorMessage("Please fill out all fields.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        const service = await serviceService.addService(serviceData);
        console.log(service);

        if (service.status === 500) {
          setServerError(service.statusText);
        }
      }
    } catch (error) {
      setServerError(error.message);
    }
    console.log(serverError);
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <ServiceListTable />
        <div className="contact-title">
          <h2>Add a new service</h2>
        </div>
        <p>{serverError}</p>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {errorMessage && (
                        <div className="validation-error" role="alert">
                          {errorMessage}
                        </div>
                      )}
                      <input
                        onChange={(e) => setServiceName(e.target.value)}
                        value={serviceName}
                        type="text"
                        name="service name"
                        placeholder="Service Name"
                      />
                      <br />
                      <textarea
                        onChange={(e) => setServiceDescription(e.target.value)}
                        value={serviceDecription}
                        type="text"
                        name="description"
                        placeholder="Service Description"
                      />
                    </div>

                    
                    <div className="form-group col-md-12">
                      <button
                        onClick={handleSubmit}
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span> Add service</span>
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

export default AddServicesForm;
