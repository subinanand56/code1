import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Esidebar from "./Esidebar";
import styled from 'styled-components'
import Epurchase from "./Epurchase";
import SalesForm from "./SalesForm";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (role === "employee" && token) {
      navigate("/employee-dashboard")
    } else {
      navigate("/");
    }
  }, []);

  return (
    <EmployeeDashboardContainer>
      <div className="Admin-Dashboard">
        <div className="App-Glass">
        <Esidebar/>
        <ScrollableContent>
        
        <SalesForm/>
        </ScrollableContent> 
        </div>
      </div>
    </EmployeeDashboardContainer>
    
  );
};
const EmployeeDashboardContainer = styled.div`
.Admin-Dashboard{
  background: linear-gradient(
  106.37deg,
  #B0E0E6 29.63%, 
  #87CEEB 51.55%, 
  #f3c6f1 90.85%  
);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}
.App-Glass{
  display: grid;
  height: 97%;
  width: 97%;
  background: var(--glass);
  border-radius: 2rem;
  gap: 16px;
  grid-template-columns: 11rem auto ;
  overflow: hidden;
}

@media screen and (max-width: 1200px) {
  .App-Glass{
    grid-template-columns: 6% auto;
    overflow-y: scroll;
  } 
}

@media screen and (max-width: 768px) {
    .App-Glass {
    grid-template-columns: 0% auto;
    overflow-y: scroll;
    }
  }
`
const ScrollableContent = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(
      --your-scrollbar-color
    ); /* Set the color for the scrollbar thumb */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* Set the background for the scrollbar track */
  }
`;
export default EmployeeDashboard;
