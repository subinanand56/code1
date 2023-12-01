import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";

const SalesForm = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [sales, setSales] = useState([
    {
      name: "",
      price: "",
      quantity: "",
      date: "",
      unit: "ton",
    },
  ]);
  useEffect(() => {

    const branchFromLocalStorage = localStorage.getItem("branch");
  
    if (branchFromLocalStorage) {
      setSelectedBranch(branchFromLocalStorage);
    }
  }, []);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://test.lestora.com/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleAddSale = () => {
    setSales([
      ...sales,
      {
        name: "",
        price: "",
        quantity: "",
        date: "",
        unit: "ton",
      },
    ]);
  };

  const handleSaleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSales = [...sales];
    updatedSales[index][name] = value;
    setSales(updatedSales);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = sales.map(async (sale) => {
        const response = await axios.post(`https://test.lestora.com/sales`, {
          name: sale.name,
          price: sale.price,
          quantity: sale.quantity,
          unit: sale.unit,
          branch: selectedBranch,
          date: sale.date || currentDate,
        });
        return response.data;
      });
      const responses = await Promise.all(promises);
      const success = responses.every((res) => res.success);
      window.location.reload();
      if (success) {
        
        toast.success("Sales added successfully");
        setSales([
          {
            name: "",
            price: "",
            quantity: "",
            date: "",
            unit: "ton",
          },
        ]);
        setSelectedBranch("");
        window.location.reload();
      } else {
        toast.error("Failed to add sales");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Unable to connect to the API server");
    }
  };

  return (
    <Container>
      <h5 className="text-center pt-5">Daily Sales Entry</h5>
      <Form onSubmit={handleSubmit}>
        {sales.map((sale, index) => (
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

                <Form.Group controlId={`saleItem-${index}`}>
                  <Form.Label>Sale Product:</Form.Label>
                  <Form.Control
                    as="select"
                    value={sale.name}
                    onChange={(e) => handleSaleInputChange(index, e)}
                    name="name"
                    required
                  >
                    <option value="" disabled>
                      Select a Product
                    </option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId={`quantity-${index}`}>
                  <Form.Label>Quantity:</Form.Label>
                  <Row>
                    <Col md={8}>
                      <Form.Control
                        type="number"
                        value={sale.quantity}
                        onChange={(e) => handleSaleInputChange(index, e)}
                        name="quantity"
                        required
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        as="select"
                        value={sale.quantityUnit}
                        onChange={(e) => handleSaleInputChange(index, e)}
                        name="quantityUnit"
                        required
                      >
                        <option value="ton">ton</option>
                        <option value="kg">kg</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId={`price-${index}`}>
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
                    type="number"
                    value={sale.price}
                    onChange={(e) => handleSaleInputChange(index, e)}
                    name="price"
                    required
                  />
                </Form.Group>

                <Form.Group controlId={`date-${index}`}>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={sale.date || currentDate}
                    onChange={(e) => handleSaleInputChange(index, e)}
                    name="date"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}

        <div className="text-center pt-3 ">
          <Button variant="primary" onClick={handleAddSale} className="m-2">
            Add More Sale
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SalesForm;
