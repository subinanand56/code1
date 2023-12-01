import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import Button from "react-bootstrap/Button";

const Tables = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [salesData, setSalesData] = useState([]);
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
      fetchSalesData(selectedBranch);
    }
  }, [selectedBranch, fromDate, toDate]);

  const fetchSalesData = async (branchId) => {
    try {
      const response = await axios.get(
        `https://test.lestora.com/getsales?branch=${branchId}`
      );
      setSalesData(filterSalesByDate(response.data));
    } catch (error) {
      console.error("Error fetching sales data: ", error);
      toast.error("Failed to fetch sales data");
      setSalesData([]);
    }
  };
  const filterSalesByDate = (data) => {
    const fromDateValue = fromDate ? new Date(fromDate) : null;
    const toDateValue = toDate ? new Date(toDate) : null;

    const filteredSalesData = data.filter((sale) => {
      const saleDate = new Date(sale.date);
      saleDate.setHours(0, 0, 0, 0);

      const isSameFromDate = fromDateValue
        ? saleDate.getTime() === fromDateValue.getTime()
        : false;
      const isSameToDate = toDateValue
        ? saleDate.getTime() === toDateValue.getTime()
        : false;

      if (fromDateValue && toDateValue) {
        return saleDate >= fromDateValue && saleDate <= toDateValue;
      } else if (isSameFromDate || isSameToDate) {
        return true;
      } else if (
        fromDateValue === null &&
        toDateValue === null &&
        isSameFromDate
      ) {
        return true;
      } else {
        return false;
      }
    });

    return filteredSalesData;
  };

  const handleDateRangeSelect = async () => {
    try {
      const response = await axios.get(`https://test.lestora.com/getsales`);
      setSalesData(filterSalesByDate(response.data));
    } catch (error) {
      console.error("Error fetching sales data: ", error);
      toast.error("Failed to fetch sales data");
      setSalesData([]);
    }
  };
  const calculateTotalAmount = () => {
    return salesData.reduce((total, sale) => total + sale.price, 0);
  };

  const downloadInvoice = () => {
    const headers = [
      "Branch Name",
      "Product Name",
      "Price",
      "Quantity",
      "Unit",
    ];

    const csvRows = [
      headers.join(","),
      ...salesData.map((sale) => {
        const branchName =
          selectedBranch === "all"
            ? sale.branch
            : branches.find((branch) => branch._id === selectedBranch)?.name ||
              "";
        const productName = sale.name;

        return [
          branchName,
          productName,
          sale.price,
          sale.quantity,
          sale.unit,
        ].join(",");
      }),
      ["", "", "", "", "", "Total Amount:", calculateTotalAmount()],
    ];

    const csvContent = csvRows.join("\n");

    const fileName = `Invoice_${fromDate}_to_${toDate}_${
      selectedBranch === "all" ? "All_Branches" : selectedBranch
    }.csv`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    saveAs(blob, fileName);
  };

  return (
    <TableContainer>
      <div className="Table">
        <div>
          <h5>Sales</h5>
          <div className="mb-1">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
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
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-1">
            <label>
              To:
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-1">
            <Button variant="primary" onClick={downloadInvoice}>
              Download
            </Button>
          </div>
        </div>
        <div>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Brnh Nme</th>
                <th>Prdt Nme</th>
                <th>Amt</th>
                <th>Qunty</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.branch}</td>
                  <td>{sale.name}</td>
                  <td>{sale.price}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.unit}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <strong>Total Amount:</strong>
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

export default Tables;
