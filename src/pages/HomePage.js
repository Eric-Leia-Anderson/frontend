import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BudgetForm from '../components/BudgetForm';
//to do
//0. Use typescript and what other dude made,
//has plenty of authorization stuff, just needs different urls
//2. Make backend match the urls and data needed
//3. Backend and front end connection for session https://www.geeksforgeeks.org/spring-security-login-page-with-react/
     //https://www.geeksforgeeks.org/spring-boot-session-management/
     //JWT for user session?
     //This is how you guse localstorage: localStorage.setItem('token', data.token); and
     //headers: {
     // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //},
//2. connect signup to backend, have username on homepage, force login/signup from home page using typescript if not logged in
// and remove nav bar options
//one has a home page with login/register and goes to dashboard(recurring, spending, transactions, )
//one has homepage that has 
//3. Profile page, preferences
//3. Budget tables and controller, categories? Savings goals?
//4. Transactions connection using other branch
//5. Set income?
//fetch transactions by month at first?
//change fetching of transactions by date range?
//have welcome for specific user at top
//here I do: {location.state.nameOfData} if exists, otherwise don't
const HomePage = () => {
  return (
    <div>
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

    <BudgetForm/>
    </div>
  );
};

export default HomePage;
