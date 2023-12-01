import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
import { Button, Form, Table, Card, Row, Col } from "react-bootstrap";
import { Modal } from "antd";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://test.lestora.com/product", {
        name,
      });
      window.location.reload();
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        fetchProducts();
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      toast.error("Failed to add product. Please try again.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://test.lestora.com/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching branches: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct((prevProduct) => {
      if (prevProduct === product) {
        return null;
      } else {
        return product;
      }
    });
    setSelected(product); 
  };

  const handleDelete = async (productId) => {
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }
    try {
      const response = await axios.delete(
        `https://test.lestora.com/product/${productId}`
      );
      
      if (response.data?.message === "Product deleted successfully") {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(response.data?.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Error deleting product: ", error);
    }
  };
  return (
    <ProductContainer>
      <Row className="mt-5 justify-content-center">
        <Col md={12} lg={6} className="mb-5">
          <Card>
            <Card.Body>
              <h5 className="text-center pt-3">Products</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td onClick={() => handleRowClick(product)}>
                        {product.name}
                      </td>
                      <td onClick={() => handleRowClick(product)}>
                        {selectedProduct === product && (
                          <>
                            
                            <Button
                              variant="danger ms-2"
                              onClick={() => {
                                handleDelete(product.id);
                              }}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={6}>
          <Card>
            <Card.Body className="text-center">
              <h5 className="text-center pt-3"> Add Products</h5>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Enter new product"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ProductContainer>
  );
};

const ProductContainer = styled.div``;

export default ProductForm;
