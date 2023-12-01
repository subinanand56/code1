import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
import { Button, Table, Card, Row, Col } from "react-bootstrap";
import AddBranchForm from "./AddBranchForm";
import { Modal } from "antd";

const BranchForm = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  useEffect(() => {
    fetchBranches();
  }, []); 

  const fetchBranches = async () => {
    try {
      const response = await axios.get("https://test.lestora.com/getbranch");
      setBranches(response.data); 
    } catch (error) {
      console.error("Error fetching branches: ", error);
      
    }
  };
  const handleRowClick = (branch) => {
    if (selectedBranch === branch) {
      setSelectedBranch(null);
    } else {
      setSelectedBranch(branch);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data }  = await axios.post("https://test.lestora.com/branch", {
        name,
      });
      window.location.reload();
      if (data?.success) {
        toast.success(`${name} is created`);
        setName(""); 
        fetchBranches();
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add branch");
      console.error("Error adding branch: ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://test.lestora.com/updatebranch/${selected?.bid}`, {
        name: updatedName,
      });
      if (response.data?.success) {
        toast.success("Branch updated successfully");
        setVisible(false);
        fetchBranches();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update branch");
      console.error("Error updating branch: ", error);
    }
  };
  
  const handleDelete = async (branchId) => {
    if (!branchId) {
      console.error('Branch ID is undefined');
      return;
    }
    try {
      const response = await axios.delete(`https://test.lestora.com/deletebranch/${branchId}`);
      if (response.data?.success) {
        toast.success("Branch deleted successfully");
        fetchBranches();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete branch");
      console.error("Error deleting branch: ", error);
    }
  };
  return (
    <BranchFormContainer>
      <Row className="mt-5 justify-content-center">
        <Col md={12} lg={6} className="mb-5">
          <Card>
            <Card.Body>
            <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <AddBranchForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
              <div className="p-3">
                <h5 className="text-center ">Add New Branches</h5>
                <AddBranchForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={6}>
          <Card>
            <Card.Body>
              <h5 className="text-center pt-3">Branches</h5>

              <CustomTable responsive hover>
                <thead>
                  <tr>
                    <th>Branch Name</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                    {branches.map((branch, index) => (
                      <tr key={index} onClick={() => handleRowClick(branch)}>
                        <td>{branch?.name}</td>
                        <td>
                          {selectedBranch === branch && (
                            <>
                              <Button
                                variant="primary ms-2"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(branch.name);
                                  setSelected(branch);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger ms-2 "
                                onClick={() => {
                                  handleDelete(branch.bid);
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </CustomTable>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </BranchFormContainer>
  );
};

const BranchFormContainer = styled.div``;

const CustomTable = styled(Table)`
  background-color: #ffa500;
  border-radius: 20px;
  cursor: pointer;
`;

export default BranchForm;
