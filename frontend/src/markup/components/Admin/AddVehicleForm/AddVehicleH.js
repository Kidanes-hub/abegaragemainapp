import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsX } from "react-icons/bs"; // Import X icon from react-icons/bs

const AddVehicleH = () => {
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = (e) => {
        // Handle form submission
        e.preventDefault();
        // Implement logic to submit form data
    };

    const handleClose = () => {
        setShowForm(false);
    };

    if (!showForm) {
        return null; // Return null if showForm is false to hide the form
    }

    return (
        <div style={{ position: "relative" }}>
            <button
                onClick={handleClose}
                className="close-button btn btn-link text-danger"
                style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-15px",
                    zIndex: "999",
                }} // Adjusted position to align with the border edge
            >
                <BsX size={30} />
            </button>
            <div
                className="add-vehicle-form"
                style={{
                    border: "2px solid #ccc",
                    padding: "30px", // Increased padding for margin effect
                }}
            >
                <div className="d-flex justify-content-center mb-3">
                    <h2>Add a New Vehicle</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        controlId="vehicleYear"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Year"
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="vehicleMake"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Make"
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="vehicleModel"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Model"
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="vehicleType"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Type"
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="vehicleMileage"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Mileage"
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="vehicleTag"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Tag"
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="vehicleSerial"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Serial"
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="vehicleColor"
                        className="form-group col-md-12"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Vehicle Color"
                            required
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default AddVehicleH;