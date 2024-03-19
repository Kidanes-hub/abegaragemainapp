import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { format } from "date-fns";
import { useAuth } from "../../../../Contexts/AuthContext";
import customerService from "../../../../services/customer.service";
import { FaSearch, FaHandPointer } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewOrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await customerService.searchCustomer(token, searchQuery);
        } else {
          response = await customerService.getAllCustomers(token);
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data.data);
        setTotalPages(data.totalPages);
        if (page > data.totalPages) {
          setPage(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setApiError(true);
        setApiErrorMessage("Something went wrong");
      }
    };
    fetchData();
  }, [token, page, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Create a new order</h2>
              <div className="search-bar">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search for a customer using first name, last name, email address or phonenumber"
                  className="extended-placeholder-input"
                />
                <Button
                  className="theme-btn- btn-style-one extended-search-button "
                  onClick={handleSearch}
                >
                  <FaSearch />
                </Button>
              </div>
            </div>
            {searchQuery && (
              <Table striped bordered hover>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        <div>
                          <Link
                            to={`/admin/order/vehicle/customer/${customer.customer_id}`}
                          >
                            <FaHandPointer />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <div className="form-group col-md-12">
              <Link to={"/admin/add-customer"}>
                {" "}
                <button
                  className="theme-btn btn-style-one"
                  type="submit"
                  data-loading-text="Please wait..."
                >
                  <span> Add customer</span>
                </button>{" "}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default NewOrderForm;
