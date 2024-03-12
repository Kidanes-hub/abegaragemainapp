import React from "react";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddServicesForm from "../../components/Admin/AddServicesForm/AddServicesForm";

function AddServices(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddServicesForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddServices;
