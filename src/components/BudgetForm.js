import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';  // Make sure to import the CSS file
//bakcend needs budget controller and tables, so can keep this info
//categories?
//connect this to backend to keep budget
//do a monthly budget, so restart on 1st of month
const BudgetForm = () => {
  const [budgetName, setBudgetName] = useState('');
  const [price, setPrice] = useState('');
  const [budgetItems, setBudgetItems] = useState([]);
  const [totalBudget, setTotalBudget] = useState('');
  
  // Calculate remaining budget
  const calculateRemainingBudget = () => {
    const totalSpent = budgetItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return totalBudget ? parseFloat(totalBudget) - totalSpent : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budgetName && price) {
      setBudgetItems([
        ...budgetItems,
        { name: budgetName, price: parseFloat(price).toFixed(2) },
      ]);
      setBudgetName('');
      setPrice('');
    }
  };

  const remainingBudget = calculateRemainingBudget();

  return (
    <Container className="mt-5">
      <div className="budget-form-container">
        <h2>Add Item to Budget</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBudgetName">
                <Form.Label>Item</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Food"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 25.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          {/* Input field for total budget */}
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="formTotalBudget">
                <Form.Label>Total Budget</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter total budget"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <div className='text-end'>
            <Button variant="primary" type="submit" className="mt-3">
              Add Budget Item
            </Button>
          </div>
        </Form>
      </div>

      {/* Display the remaining budget */}
      {totalBudget && (
        <div className="mt-4 text-middle">
          <h4 style ={{
            color: remainingBudget >= 0 ? '#2dc653': '#d90429',
          }}>
            Budget Left: ${calculateRemainingBudget().toFixed(2)}
          </h4>
        </div>
      )}

      {/* Displaying the list of submitted budget items */}
      {budgetItems.length > 0 && (
        <div className="budget-items-list">
          <h3>Total Items</h3>
          <ListGroup>
            {budgetItems.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.name}: ${item.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

    </Container>
  );
};

export default BudgetForm;
