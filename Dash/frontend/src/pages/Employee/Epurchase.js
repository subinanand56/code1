import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Table } from "react-bootstrap";

const Epurchase = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const loggedInEmpName = localStorage.getItem("eid");
    axios
      .get(`https://test.lestora.com/purchasedetails/${loggedInEmpName}`)
      .then((response) => {
        setPurchaseRequests(response.data.purchases);
      })
      .catch((error) => {

        console.error("Error fetching purchase details:", error);
        toast.error("Failed to fetch purchase details");
      });
  }, []);
  return (
    <div className="container mt-4">
      <h5 className="text-center mb-4">Purchase Requests Status</h5>
      <Table striped bordered  responsive>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Product Name</th>
            <th>Company Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {purchaseRequests.reverse().map((request, index) => (
            <tr key={index}>
              <td>{request.branch}</td>
              <td>{request.productName}</td>
              <td>{request.companyName}</td>
              <td>{request.accepted ? "Accepted" : "Not Accepted"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Epurchase;
