import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import styled from "styled-components";

const ExpenseTable = () => {
  const [branches, setBranches] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  useEffect(() => {
    fetchBranches();
    setDefaultDateRange();
  }, []);

  const setDefaultDateRange = () => {
    const currentDate = new Date();
    const defaultFromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultToDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    setFromDate(defaultFromDate.toISOString().split('T')[0]);
    setToDate(defaultToDate.toISOString().split('T')[0]);
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get("https://test.lestora.com/getbranch");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches: ", error);
    }
  };

  useEffect(() => {
    if (selectedBranch === 'all') {
      handleDateRangeSelect();
    } else {
      fetchExpenseData (selectedBranch);
    }
  }, [selectedBranch, fromDate, toDate]);

  const handleDateRangeSelect = async () => {
    try {
      const response = await axios.get(`https://test.lestora.com/getexpenses`);
      setExpensesData(filterExpensesByDate(response.data));
    } catch (error) {
      console.error('Error fetching sales data: ', error);
      toast.error('Failed to fetch sales data');
      setExpensesData([]);
    }
  };

  const fetchExpenseData = async (branchId) => {
    try {
      const response = await axios.get(`https://test.lestora.com/getexpenses?branch=${branchId}`);
      setExpensesData(filterExpensesByDate(response.data));
    } catch (error) {
      console.error('Error fetching expense data: ', error);
      toast.error('Failed to fetch expense data');
      setExpensesData([]);
    }
  };
  const filterExpensesByDate = (data) => {
    const fromDateValue = fromDate ? new Date(fromDate) : null;
    const toDateValue = toDate ? new Date(toDate) : null;
  
    const filteredExpensesData = data.filter((expense) => {
      const expenseDate = new Date(expense.date);
      expenseDate.setHours(0, 0, 0, 0);
  
      if (fromDateValue && toDateValue) {
        return expenseDate >= fromDateValue && expenseDate <= toDateValue;
      } else if (fromDateValue && !toDateValue) {
        return expenseDate >= fromDateValue;
      } else if (!fromDateValue && toDateValue) {
        return expenseDate <= toDateValue;
      } else {
        return true;
      }
    });
  
    return filteredExpensesData;
  };
  
  const calculateTotalAmount = () => {
    return expensesData.reduce((total, expense) => total + expense.price, 0);
  };

  const downloadInvoice = () => {
    const headers = [
      'Branch',
      'Expense Name',
      'Amount'
    ];

    const csvRows = [
      headers.join(','),
      ...expensesData.map((expense) => {
        return [
          expense.branch,
          expense.item,
          expense.price
        ].join(',');
      }),
      ['', '', 'Total Amount:', calculateTotalAmount()],
    ];

    const csvContent = csvRows.join('\n');

    const fileName = `Invoice_${fromDate}_to_${toDate}_${selectedBranch === 'all' ? 'All_Branches' : selectedBranch}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    saveAs(blob, fileName);
  };

  
  return (
    <TableContainer>
    <div className='Table'> 
    <div>
        <h5>Expenses</h5>
        <div className="mb-1">
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="all">All</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.name}
            </option>
          ))}
        </select>
        </div>
        <div className="mb-1">
        <label>
          From:
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>
        </div>
        <div className="mb-1">
        <label>
            To:
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </label>
        </div>
      </div>
      <div className="mb-1">
            <Button variant="primary" onClick={downloadInvoice}>
              Download
            </Button>
          </div>
      <div>
       
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Brnh</th>
              <th>Exp Nme</th>
              <th>Amnt</th>
            </tr>
          </thead>
          <tbody>
          {expensesData.map((expense, index) => (
              <tr key={index}>
                <td>{expense.branch}</td>
                <td>{expense.item}</td>
                <td>{expense.price}</td>
                
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"><strong>Total Amount:</strong></td>
              <td colSpan="3">{calculateTotalAmount()}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
    </TableContainer>
  );
};
const TableContainer = styled.div`

@media screen and (max-width: 768px) {
  .Table{
  margin-top: 6rem;
}
  }
`;
export default ExpenseTable;
