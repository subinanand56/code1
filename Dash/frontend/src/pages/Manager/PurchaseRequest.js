import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Modal } from "antd";

const PurchaseRequests = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPurchaseImage, setSelectedPurchaseImage] = useState(null);

  const fetchPurchase = async (branch) => {
    try {
      const response = await axios.get(
        `https://test.lestora.com/getallrqst?branch=${branch}`
      );
      setPurchaseRequests(response.data);
    
    } catch (error) {
      console.error("Error fetching purchase requests: ", error);
    }
  };

  useEffect(() => {
    const branch = localStorage.getItem("branch");
    if (branch) {
      setSelectedBranch(branch);
      fetchPurchase(branch);
    }
  }, []);

  const handleModal = (imageUrl) => {
    if (imageUrl) {
      
      setSelectedPurchaseImage(`https://test.lestora.com/images/${imageUrl}`);
      setIsModalVisible(true); 
    } else {
      toast.error("Image not available");
    }
  };
  const closeModal = () => {
    setSelectedPurchaseImage(null);
    setIsModalVisible(false);
  };
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      
      const updatedStatus = !currentStatus;
      const response = await axios.put(
        `https://test.lestora.com/updatestatus/${id}`,
        {
          accepted: updatedStatus, 
        }
      );
  
      if (response.status === 200) {
        
        fetchPurchase(selectedBranch);
        toast.success(response.data.message || "Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status: ", error);
      toast.error("Failed to update status");
    }
  };
  
  return (
    <div className="container mt-4">
      <h5 className="text-center mb-4">Purchase Requests</h5>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Brch</th>
            <th>Prdt Nme</th>
            <th>Cmpny Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
            <th>Img</th>
          </tr>
        </thead>
        <tbody>
          {purchaseRequests.reverse().map((request) => (
            <tr key={request.id}>
              <td>{selectedBranch}</td>
              <td>{request.productName}</td>
              <td>{request.companyName}</td>
              <td>{request.price}</td>
              <td>{request.accepted === 1 ? "Accepted" : "Not Accepted"}</td>
              <td>
                <Button
                  variant={request.accepted ? "danger" : "success"}
                  onClick={() =>
                    handleUpdateStatus(request.id,request.accepted)
                  }
                >
                  {request.accepted ? "Reject" : "Accept"}
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleModal(request.image)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {selectedPurchaseImage && (
          <div className="image-modal text-center mt-4">
            <img
              src={selectedPurchaseImage}
              alt="Selected"
              className="selected-image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </Modal>
      
    </div>
  );
};

export default PurchaseRequests;
