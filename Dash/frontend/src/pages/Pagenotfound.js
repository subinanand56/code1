import React from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagenotfound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  }
  
  return (
    <Layout >
    <div>
    <Container className="h-100">
      <Row className="h-100 justify-content-center ">
        <Col xs={6} md={4} lg={3} xl={2}>
          <div className="text-center">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Button onClick={handleGoBack} variant="primary">
              Go Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
    </Layout>
  )
}

export default Pagenotfound