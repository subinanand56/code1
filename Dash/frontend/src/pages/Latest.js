import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Card, Button, Col, Row, Container } from "react-bootstrap";

const Latest = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=caf9271140a44997b465a3280bbfdd4e"
        );
        setLatestNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching business news:", error);
      }
    };

    fetchBusinessNews();
  }, []);

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=caf9271140a44997b465a3280bbfdd4e"
        );
        setEntertainmentNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching business news:", error);
      }
    };

    fetchBusinessNews();
  }, []);

  const renderImage = (url) => {
    return url ? <Card.Img variant="top" src={url} /> : null;
  };

  return (
    <Layout>
      <div className="mt-3">
        <Container>
        <Row>
          <Col md={4} className="mb-4">
            {latestNews.map((newsItem, index) => (
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
            {entertainmentNews.map((newsItem, index) => (
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

export default Latest;
