import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";

const AdminPurchase = () => {
  const [branches, setBranches] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [purchaseRequests, setPurchaseRequests] = useState([
    {
      productName: "",
      companyName: "",
      price: "",
      date: "",
    },
  ]);
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get("https://test.lestora.com/getbranch");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches: ", error);
    }
  };

  const handleAddPurchaseRequest = () => {
    setPurchaseRequests([
      ...purchaseRequests,
      {
        productName: "",
        companyName: "",
        price: "",
        date: "",
      },
    ]);
  };

  const handlePurchaseRequestInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPurchaseRequests = [...purchaseRequests];
    if (name === "date") {
      updatedPurchaseRequests[index][name] = value;
    } else {
      updatedPurchaseRequests[index][name] = value;
    }
    setPurchaseRequests(updatedPurchaseRequests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const promises = purchaseRequests.map(async (purchase) => {
        const response = await axios.post(`http://localhost:8081/purchase`, {
          productName: purchase.productName,
          companyName: purchase.companyName,
          price: purchase.price,
          date: purchase.date || currentDate,
          branch: selectedBranch,
          accepted: true,
        });
        return response.data;
      });
      
      const responses = await Promise.all(promises);
      const success = responses.every((res) => res.success);
      window.location.reload();
      if (success) {
        window.location.reload();
        toast.success("Sales added successfully");
        setPurchaseRequests([
          {
            productName: "",
            companyName: "",
            price: "",
            date: "",
          },
        ]);
        setSelectedBranch("");
      } else {
        toast.error("Failed to add sales");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Unable to connect to the API server");
    }
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  return (
    <Container>
      <h5 className="text-center pt-5">Purchase</h5>
      <Form onSubmit={handleSubmit}>
        {purchaseRequests.map((request, index) => (
          <div key={index}>
            <Row>
              <Col md={6}>
                <Form.Group controlId={`branch-${index}`}>
                  <Form.Label>Branch:</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    required
                  >
                    <option value="">Select a Branch</option>
                    {branches.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {branch.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId={`productName-${index}`}>
                  <Form.Label>Product Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={request.productName}
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="productName"
                    required
                  />
                </Form.Group>

                <Form.Group controlId={`date-${index}`}>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={request.date || currentDate}
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="date"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId={`companyName-${index}`}>
                  <Form.Label>Company Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={request.companyName}
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="companyName"
                    required
                  />
                </Form.Group>
                <Form.Group controlId={`price-${index}`}>
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="text"
                    value={request.price}
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="price"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}

        <div className="text-center pt-3">
          <Button
            variant="primary"
            onClick={handleAddPurchaseRequest}
            className="m-2"
          >
            Add More
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminPurchase;
