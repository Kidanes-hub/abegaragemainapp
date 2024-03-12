import React from "react";
import EditAdminServiceForm from "../../../components/Admin/EditServiceForm/EditAdminServiceForm.js";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu.js";

function EditAdminSrvice(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditAdminServiceForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAdminSrvice;
