import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    role: "",
    password: "",
    address: "",
  });
  const [branches, setBranches] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://test.lestora.com/getbranch')
      .then(response => {
        setBranches(response.data);
      })
      .catch(error => {
        console.error("Error fetching branches:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...data,
        branch: data.branch, 
      };
      const response = await axios.post('http://localhost:8081/register',  formData);
      
      console.log("Registration successful:", response.data);
      toast.success("Registration successful");   
      window.location.reload();
    } catch (error) {
      
      console.error("Registration error:", error);
      toast.error("Registration failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <RegisterContainer>
      <div
        className="d-flex justify-content-center align-items-center mt-4"
        style={{ height: "90vh" }}
      >
        <Card
          style={{
            width: "300px",
            borderRadius: "15px",
            border: "2px solid rgba(0, 0, 0, 0.125)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Card.Body>
            <Card.Title className="text-center">Register Employee</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={data.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicBranch">
                <Form.Label>Select Branch:</Form.Label>
                <Form.Control
                  as="select"
                  name="branch"
                  value={data.branch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a branch</option>
                  {branches.map(branch => (
                    <option key={branch.bid} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="password-input">
                  <Form.Control
                  name="password"
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                  />
                  <div
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicPhones">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone number"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  required
                />
              </Form.Group>

              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "20px" }}
              >
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  .password-input {
    display: flex;
    align-items: center;
  }

  .password-toggle {
    cursor: pointer;
  }
`;

export default Register;
