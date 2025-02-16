import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={112}>
          <Card className="text-center p-5" style={{ backgroundColor: '#f4f4f4' }}>
            <Card.Body>
              <Card.Title as="h1">Welcome to Your Budgeting App!</Card.Title>
              <Card.Text className="lead">
                Take control of your finances and start saving money today! Our app helps you
                track your spending, set budgets, and plan for your financial future with ease.
              </Card.Text>
              <Card.Text>
                Whether you're saving for a big purchase or just trying to get a handle on your
                monthly expenses, we're here to help you every step of the way.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
