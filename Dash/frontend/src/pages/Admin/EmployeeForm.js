import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Card, Table } from "react-bootstrap";
import styled from "styled-components";



const EmployeeForm = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('https://test.lestora.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      });
  }, []);

  
  const handleDelete = (userId) => {
    axios.delete(`https://test.lestora.com/users/${userId}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        toast.success("User deleted successfully");
      })
      .catch(error => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      });
  };

  return (
    <EmployeeFormContainer>
      <div className="mt-5 justify-content-center">
        <h5 className="text-center">Employee List</h5>
        <div>
          
            <Card>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Branch</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
             
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.branch}</td>
                    <td>{user.address}</td>
                    <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </td>
                  </tr>
                ))}
              </tbody>
                
              </Table>
            </Card>
         
        </div>
      </div>
    </EmployeeFormContainer>
  );
};

const EmployeeFormContainer = styled.div`

`
export default EmployeeForm;
