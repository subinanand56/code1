import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MSidebar from "./MSidebar";
import styled from 'styled-components'
import SalesForm from "../Employee/SalesForm";



const MsalesDash = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const role = localStorage.getItem('role');
      const token = localStorage.getItem('token');
      if (role === "manager" && token) {
        navigate("/msalesdash")
      } else {
        navigate("/");
      }
    }, []);

  return (
    <SalesDashContainer>
      <div className="Admin-Dashboard">
        <div className="App-Glass">
        <MSidebar/>
        <SalesForm/>    
        </div>
      </div>
    </SalesDashContainer>
  )
}

const SalesDashContainer = styled.div`
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
    grid-template-columns: 10% auto;
    overflow-y: scroll;
  }  
}

@media screen and (max-width: 768px) {
  .App-Glass{
    grid-template-columns: 1% auto;
    overflow-y: scroll;
  } 
}
`
export default MsalesDash