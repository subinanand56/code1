import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Card, Button, Col, Row, Container } from "react-bootstrap";

const Sports = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=caf9271140a44997b465a3280bbfdd4e"
        );

        // Update state with fetched news articles
        setSportsNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=caf9271140a44997b465a3280bbfdd4e"
        );

        // Update state with fetched news articles
        setHealthNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const renderImage = (url) => {
    return url ? <Card.Img variant="top" src={url} /> : null;
  };

  return (
    <Layout>
      <div className='mt-3'>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            {healthNews.map((newsItem, index) => (
              <Card key={index} className="mb-4" style={{ width: "100%" }}>
                {renderImage(newsItem.urlToImage)}
                <Card.Body>
                  <Card.Title>{newsItem.title}</Card.Title>
                  <Card.Text>{newsItem.description}</Card.Text>
                  <Button variant="primary" href={newsItem.url} target="_blank">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
          
          <Col md={8}>
            {sportsNews.map((newsItem, index) => (
              <Card key={index} className="mb-4" style={{ width: "100%" }}>
                {renderImage(newsItem.urlToImage)}
                <Card.Body>
                  <Card.Title>{newsItem.title}</Card.Title>
                  <Card.Text>{newsItem.description}</Card.Text>
                  <Button variant="primary" href={newsItem.url} target="_blank">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Sports;
