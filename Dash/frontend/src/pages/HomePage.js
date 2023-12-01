import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image from "../assets/download (10).jpg";
const HomePage = () => {
  const navigate = useNavigate();

  const renderImage = (url) => {
    return url ? <Card.Img variant="top" src={url} /> : null;
  };

  const handleRedirect = () => {
    navigate("/login");
  };
  return (
    <Layout>
      <div className="mt-3">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/rh5EmQQHqN7LVqvVZLFyAn-1200-80.jpg" />
                <Card.Body>
                  <Card.Title>Iarth receives laser-beam message from 10 million miles away in new NASA experiment - Livescience.com</Card.Title>
                  <Card.Text>
                  Fast communications could speed up science on the asteroid mission.
                  </Card.Text>
                  <Button variant="primary"  onClick={() =>
                      window.open(
                        "https://www.space.com/nasa-psyche-asteroid-mission-laser-test-deep-space",
                        "_blank"
                      )
                    }>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://images.moneycontrol.com/static-mcnews/2023/11/market_volatile-6-770x433.jpg" />
                <Card.Body>
                  <Card.Title>The Department of Science & Technology plays a pivotal role in promotion of science & technology in the country.</Card.Title>
                  <Card.Text>
                  Reflection of Earthquake Source Process in the Ionosphere could pave way for deciphering earthquake precursors using space based observations - Department Of Science & Technology
                  </Card.Text>
                  <Button variant="primary" onClick={() =>
                      window.open(
                        "https://dst.gov.in/reflection-earthquake-source-process-ionosphere-could-pave-way-deciphering-earthquake-precursors",
                        "_blank"
                      )
                    }>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://static.tnn.in/thumb/msid-105447855,thumbsize-1701606,width-1280,height-720,resizemode-75/105447855.jpg" />
                <Card.Body>
                  <Card.Title>Blow For MS Dhoni-led CSK As Star All-Rounder Pulls Out Of IPL 2024 - Times Now</Card.Title>
                  <Card.Text>
                  Chennai Super Kings all-rounder Ben Stokes has pulled out of IPL 2024. Even though he only played two matches in IPL 2023, Stokes is a big-match player and Chennai would have backed him in the long run. MS Dhoni-led CSK clinched the IPL 2023 title with a win
                  </Card.Text>
                  <Button variant="primary"  onClick={() =>
                      window.open(
                        "https://www.timesnownews.com/sports/cricket/blow-for-ms-dhoni-led-csk-as-star-all-rounder-pulls-out-of-ipl-2024-article-105447869",
                        "_blank"
                      )
                    }>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://static.toiimg.com/thumb/msid-105446234,width-1070,height-580,imgsize-65578,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" />
                <Card.Body>
                  <Card.Title>Rohit Sharma doesn't need to be taught to score hundreds: Ravichandran Ashwin backs skipper - IndiaTimes</Card.Title>
                  <Card.Text>
                  Cricket News: Ravichandran Ashwin said Rohit Sharma \"doesn't need to be taught to score hundreds\", backing his captain to the hilt after his failure to convert a bl
                  </Card.Text>
                  <Button variant="primary" onClick={() =>
                      window.open(
                        "https://timesofindia.indiatimes.com/sports/cricket/icc-world-cup/news/rohit-sharma-doesnt-need-to-be-taught-to-score-hundreds-ravichandran-ashwin-backs-skipper/articleshow/105446226.cms",
                        "_blank"
                      )
                    }>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src={image}  />
                <Card.Body>
                  <Card.Title>India Business</Card.Title>
                  <Card.Text>
                    India Business News:factory in India, which will take its
                    cumulative investments in the country to
                  </Card.Text>
                  <Button variant="primary"  onClick={handleRedirect}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            
             
            </Col>
            <Col md={8}>
             

              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://www.hindustantimes.com/ht-img/img/2023/11/23/1600x900/PTI11-19-2023-000634B-0_1700728747273_1700728822598.jpg" />
                <Card.Body>
                  <Card.Title>India vs Australia Live Score, 1st T20I: SKY makes debut as IND captain - Hindustan Times</Card.Title>
                  <Card.Text>
                    India vs Australia Live Score 1st T20I: Follow here LIVE
                    SCORE and LATEST UPDATES of IND vs AUS cricket match, in
                    Vishakapatnam.
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      window.open(
                        "https://www.hindustantimes.com/cricket/india-vs-australia-live-score-t20-series-2023-today-23-november-ind-vs-aus-1st-t20-match-in-aca-vdca-cricket-stadium-101700728645374.html",
                        "_blank"
                      )
                    }
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://static.toiimg.com/thumb/msid-105448089,width-1070,height-580,imgsize-43090,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" />
                <Card.Body>
                  <Card.Title> When PM encourages you after loss</Card.Title>
                  <Card.Text>
                 it raises your confidence': Mohammed Shami - IndiaTimes On Prime Minister Narendra Modi's meeting with Team India following their loss to Australia in the ICC World Cup final, Indian pacer Mohammed Shami sa
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      window.open(
                        "https://timesofindia.indiatimes.com/sports/cricket/icc-world-cup/news/when-pm-encourages-you-after-loss-it-raises-your-confidence-mohammed-shami/articleshow/105447993.cms",
                        "_blank"
                      )
                    }
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://c.ndtvimg.com/2023-11/mv2kp34o_palestinians-flee-north-gaza-afp_625x300_23_November_23.jpeg?ver-20231128.06" />
                <Card.Body>
                  <Card.Title>Hamas Has Lost Control Over North Gaza\": Israel's Message For Gazans - NDTV</Card.Title>
                  <Card.Text>
                  Hamas has lost its control over northern Gaza, Israeli forces claimed today amid a delay in a truce deal that will halt the brutal war with Hamas for four days and allow the release of hostages.
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      window.open(
                        "https://www.ndtv.com/world-news/hamas-has-lost-control-over-north-gaza-israels-message-for-gazans-4599873",
                        "_blank"
                      )
                    }
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: "100%" }}>
                <Card.Img variant="top" src="https://www.livemint.com/lm-img/img/2023/11/23/1600x900/Rahul_Gandhi_1700739004345_1700739004565.jpg" />
                <Card.Body>
                  <Card.Title>Election Commission issues notice to Rahul Gandhi over ‘panauti’, ‘pickpocket’ jibes against PM Modi | Mint - Mint</Card.Title>
                  <Card.Text>
                  Election Commission issues notice to Rahul Gandhi on his ‘panauti’, ‘pickpocket’ jibes at PM Modi
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      window.open(
                        "https://www.livemint.com/news/india/election-commission-issues-notice-to-rahul-gandhi-on-his-panauti-pickpocket-jibes-at-pm-modi-11700737682774.html",
                        "_blank"
                      )
                    }
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default HomePage;
