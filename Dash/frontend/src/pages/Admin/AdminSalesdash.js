import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Adminsales from "./Adminsales";

const AdminSalesdash = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const role = localStorage.getItem('role');
      const token = localStorage.getItem('token');
    
        if (role === "admin" && token) {
          navigate("/adminsales");
        } else {
          navigate("/");
        }
      }, []);

  return (
    <AdminContainer>
    <div className="Admin-Dashboard">
        <div className="App-Glass">
          <AdminSidebar />
          <ScrollableContent>
         <Adminsales/>
          </ScrollableContent>
          
        </div>
      </div>
    </AdminContainer>
  )
}
const AdminContainer =styled.div`
.Admin-Dashboard {
    background: linear-gradient(
      106.37deg,
      #b0e0e6 29.63%,
      #87ceeb 51.55%,
      #f3c6f1 90.85%
    );
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
  }
  .App-Glass {
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
    .App-Glass {
      grid-template-columns: 5rem auto ;
      overflow-y: scroll;
    }
  }

  @media screen and (max-width: 768px) {
    .App-Glass {
      grid-template-columns: 0rem auto;
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
    background-color: var(--your-scrollbar-color); 
  }
  &::-webkit-scrollbar-track {
    background: transparent; 
  }
`;
export default AdminSalesdash