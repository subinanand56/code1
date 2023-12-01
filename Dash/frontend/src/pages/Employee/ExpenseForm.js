import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';

const ExpenseForm = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substr(0, 10)
  ); 
  const [expenses, setExpenses] = useState([
    {
      item: "",
      price: "",
      date: "",
    },
  ]);

  useEffect(() => {

    const branchFromLocalStorage = localStorage.getItem("branch");
  
    if (branchFromLocalStorage) {
      setSelectedBranch(branchFromLocalStorage);
    }
  }, []);
 



  const handleAddExpense = () => {
    setExpenses([
      ...expenses,
      {
        item: "",
        price: "",
        date: "",
      },
    ]);
  };

  const handleExpenseInputChange = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = expenses.map(async (expense) => {
        const response = await axios.post("https://test.lestora.com/expense", {
          item: expense.item,
          price: expense.price,
          date: expense.date || currentDate,
          branch: selectedBranch,
        });
        return response.data;
      });
      const responses = await Promise.all(promises);
      const success = responses.every((res) => res.success);
      window.location.reload();
      if (success) {
        
        toast.success("expense added successfully");
        setExpenses([
          ...expenses,
          {
            item: "",
            price: "",
            date: "",
          },
        ]);
        setSelectedBranch("");
        window.location.reload();
      } else {
        toast.error("Failed to add expense");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h5 className="text-center pt-5">Daily Expense Entry</h5>
      <Form onSubmit={handleSubmit}>
        {expenses.map((expense, index) => (
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

                <Form.Group controlId={`item-${index}`}>
                  <Form.Label>Expense Item:</Form.Label>
                  <Form.Control
                    type="text"
                    value={expense.expenseItem}
                    onChange={(e) =>
                      handleExpenseInputChange(index, 'item', e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId={`price-${index}`}>
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
                    type="number"
                    value={expense.amount}
                    onChange={(e) =>
                      handleExpenseInputChange(index, 'price', e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}

        <div className="text-center pt-3">
          <Button variant="primary" onClick={handleAddExpense} className="m-2">
            Add More Expense
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ExpenseForm;
