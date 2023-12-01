import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://test.lestora.com/login", loginData);
  
      if (response.data.success) {
        toast.success("Login successful");
 
        const userRole = response.data.role;     
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('branch', response.data.branch);
        localStorage.setItem('eid',response.data.eid);;
        
        if (userRole === 'admin') {
          navigate('/admin-dashboard');
        } else if (userRole === 'employee') {
          navigate('/employee-dashboard');
        } else if (userRole === 'manager') {
          navigate('/manager-dashboard');
        } 
        else {
          navigate('/register');
          toast.error("Role not recognized");
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };
  
  




  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <LoginContainer>
      <div className="Admin-Dashboard">
        <div className="App-Glass">
          <div className="d-flex align-items-center justify-content-center">
            <Card
              style={{
                width: "300px",
                borderRadius: "15px",
                border: "2px solid rgba(0, 0, 0, 0.125)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>
                  

                  <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input">
                    
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      required
                      />
                      <div
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: "20px" }}
                  >
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  .password-input {
    display: flex;
    align-items: center;
  }

  .password-toggle {
    cursor: pointer;
  }
  .Admin-Dashboard {
    background: linear-gradient(
      106.37deg,
      #b0e0e6 29.63%,
      #87ceeb 51.55%,
      #f3c6f1 90.85%
    );
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
  }
  .App-Glass {
    display: grid;
    height: 97%;
    width: 97%;
    background: var(--glass);
    border-radius: 2rem;
    gap: 16px;

    overflow: hidden;
  }
`;
export default Login;
