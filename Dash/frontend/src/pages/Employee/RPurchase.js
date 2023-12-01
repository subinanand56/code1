import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";

const RPurchase = () => {
  const [branches, setBranches] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [purchaseRequests, setPurchaseRequests] = useState([
    {
      productName: "",
      companyName: "",
      price: "",
      image: null,
      date: "",
    },
  ]);
  const [selectedBranch, setSelectedBranch] = useState("");

 
  useEffect(() => {

    const branchFromLocalStorage = localStorage.getItem("branch");
  
    if (branchFromLocalStorage) {
      setSelectedBranch(branchFromLocalStorage);
    }
  }, []);
 



  const handleAddPurchaseRequest = () => {
    setPurchaseRequests([
      ...purchaseRequests,
      {
        productName: "",
        companyName: "",
        price: "",
        image: null,
        date: "",
      },
    ]);
  };

  const handlePurchaseRequestInputChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedPurchaseRequests = [...purchaseRequests];
    if (name === "image") {
      updatedPurchaseRequests[index][name] = files[0];
    } else {
      updatedPurchaseRequests[index][name] = value;
    }
    setPurchaseRequests(updatedPurchaseRequests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeId = localStorage.getItem("eid");
      console.log(employeeId);
      const promises = purchaseRequests.map(async (request) => {
        
        const productData = new FormData();
        productData.append("productName", request.productName);
        productData.append("companyName", request.companyName);
        productData.append("price", request.price);
        productData.append("branch", selectedBranch);
        productData.append("image", request.image);
        productData.append("date", request.date || currentDate);
        productData.append("Eid", employeeId);
        productData.append("accepted", false);
       
        const { data } = await axios.post(
          `https://test.lestora.com/purchaseimage`,
          productData
        );
        
        return data;
      });

      const responses = await Promise.all(promises);

      const success = responses.every((res) => res.success);
      window.location.reload();
      if (success) {
        toast.success("Purchase requests added successfully");
        window.location.reload();
      } else {
        toast.error("Failed to add purchase requests");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Unable to connect to the API server");
    }
  };


  return (
    <Container>
      <h5 className="text-center pt-5">Purchase Request</h5>
      <Form onSubmit={handleSubmit}>
        {purchaseRequests.map((request, index) => (
          <div key={index}>
            <Row>
              <Col md={6}>
                <Form.Group controlId={`branch-${index}`}>
                  <Form.Label>Branch:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedBranch}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId={`productName-${index}`}>
                  <Form.Label>Product Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={request.productName}
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="productName"
                  />
                </Form.Group>

                <Form.Group controlId={`companyName-${index}`}>
                  <Form.Label>Company Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={request.companyName}
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="companyName"
                  />
                </Form.Group>

                <Form.Group controlId={`price-${index}`}>
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    value={request.price}
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="price"
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

                <Form.Group controlId={`image-${index}`}>
                  <Form.Label>Photo:</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handlePurchaseRequestInputChange(index, e)}
                    name="image"
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

export default RPurchase;
