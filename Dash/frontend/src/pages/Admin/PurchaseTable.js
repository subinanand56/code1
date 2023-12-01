import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import styled from "styled-components";

const PurchaseTable = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [purchaseData, setPurchaseData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchBranches();
    setDefaultDateRange();
  }, []);

  const setDefaultDateRange = () => {
    const currentDate = new Date();
    const defaultFromDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const defaultToDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    setFromDate(defaultFromDate.toISOString().split("T")[0]);
    setToDate(defaultToDate.toISOString().split("T")[0]);
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
    if (selectedBranch === "all") {
      handleDateRangeSelect();
    } else {
      fetchPurchaseData(selectedBranch);
    }
  }, [selectedBranch, fromDate, toDate]);

  const filterPurchaseByDate = (data) => {
    const fromDateValue = fromDate ? new Date(fromDate) : null;
    const toDateValue = toDate ? new Date(toDate) : null;

    const filteredPurchaseData = data.filter((purchase) => {
      const purchaseDate = new Date(purchase.date);
      purchaseDate.setHours(0, 0, 0, 0);

      if (fromDateValue && toDateValue) {
        return purchaseDate >= fromDateValue && purchaseDate <= toDateValue;
      } else {
        return true;
      }
    });

    return filteredPurchaseData;
  };

  const handleDateRangeSelect = async () => {
    try {
      const response = await axios.get(`https://test.lestora.com/getpurchases`);
      const filteredData = filterPurchaseByDate(response.data);
      setPurchaseData(filteredData);
    } catch (error) {
      console.error("Error fetching purchase data: ", error);
      setPurchaseData([]);
    }
  };

  const fetchPurchaseData = async (branchId) => {
    try {
      const response = await axios.get(
        `https://test.lestora.com/getpurchases?branch=${branchId}`
      );
      const filteredData = filterPurchaseByDate(response.data);
      setPurchaseData(filteredData);
    } catch (error) {
      console.error("Error fetching purchase data: ", error);
      setPurchaseData([]);
    }
  };

  const calculateTotalAmount = () => {
    return purchaseData.reduce((total, purchase) => total + purchase.price, 0);
  };
  const downloadInvoice = () => {
    const headers = [
      'Branch',
      'Product Name',
      'Company Name',
      'Price'
    ];

    const csvRows = [
      headers.join(','),
      ...purchaseData.map((purchase) => {
        return [
          purchase.branch,
          purchase.productName,
          purchase.companyName,
          purchase.price
        ].join(',');
      }),
      ['', '', 'Total Purchase Amount:', calculateTotalAmount()],
    ];

    const csvContent = csvRows.join('\n');

    const fileName = `Invoice_${fromDate}_to_${toDate}_${selectedBranch === 'all' ? 'All_Branches' : selectedBranch}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    saveAs(blob, fileName);
  };
  return (
    <TableContainer>
      <div className="Table">
      <div>
        <h5>Purchase</h5>
        <div  className="mb-1">
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
        <div className="mb-1">
            <Button variant="primary" onClick={downloadInvoice}>
              Download
            </Button>
          </div>
      </div>

          <div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Product Name</th>
                  <th>Company Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {purchaseData.map((purchase, index) => (
                  <tr key={index}>
                    <td>{purchase.branch}</td>
                    <td>{purchase.productName}</td>
                    <td>{purchase.companyName}</td>
                    <td>{purchase.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3">
                    <strong>Total Purchase Amount:</strong>
                  </td>
                  <td colSpan="3">{calculateTotalAmount()}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      
    </TableContainer>
  );
};

const TableContainer = styled.div`
  @media screen and (max-width: 768px) {
    .Table {
      margin-top: 6rem;
    }
  }
`;
export default PurchaseTable;
