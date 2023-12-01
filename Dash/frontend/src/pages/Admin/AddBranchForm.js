import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from "styled-components";

const AddBranchForm = ({ handleSubmit, value, setValue }) => {
    return (
      <AddContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter new branch"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
    
          <Button variant="primary" type="submit">
            Create New Branch
          </Button>
        </Form>
        </AddContainer>
      );
    };

    const AddContainer = styled.div``
export default AddBranchForm