import React from "react";

// Import the AddCustomerForm component

import AdminMenu from "../../../../components/Admin/AdminMenu/AdminMenu.js";
import EditEmployeeForm from "../../../../components/Admin/EditEmployeeForm/EditEmployeeForm.js";

function EditEmployee(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditEmployeeForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
