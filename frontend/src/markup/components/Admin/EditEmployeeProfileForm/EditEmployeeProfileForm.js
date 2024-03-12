import React from "react";

import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function EditEmployeeProfileForm() {
  return (
    <section className="history-section">
      <div className="history-block">
        <div className="content"></div>
      </div>
      <div className="auto-container">
        <div className="history-block">
          <div className="years">info</div>
          <div className="content">
            <h4>Employee: employeeName</h4>
            <div className="text">
              <p>Email: customerEmail</p>
              <p>Phone Number: emplyeePhoneNumber</p>
              <p>Active customer: Yes</p>
              <p>Employee role: admin</p>
              <p>
                Edit employee info: <Link to="admin/edit-employee/:employee_id"> <FaEdit /> </Link> 
              </p>
            </div>
          </div>
        </div>

        <div className="history-block">
          <div className="years">Details</div>
          <div className="content">
            
           
            <Link to="/employee_profile" className="btn btn-primary">
              {" "}
              Back to employee profile
            </Link>
          </div>
        </div>
        <div className="history-block">
          <div className="content"></div>
        </div>
      </div>
    </section>
  );
}

export default EditEmployeeProfileForm;
