import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import CustomersVehicleList from '../../components/Admin/CustomersVehicleListForm/CustomersVehicleList'

function NewCustomerOrder() {
  return (
    <div>
      
      
      <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
          <CustomersVehicleList />
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default NewCustomerOrder
