import React from "react";
import styled from "styled-components";
import AdminCards from "../AdminCards/AdminCards";
import Tables from "../Tables";
import ExpenseTable from "../ExpenseTable";
import PurchaseTable from "../PurchaseTable";

const AdminMaindash = () => {
  return (
    <AdminMaindashContainer>
      <div className="MainDash">
        <h5>Dashboard</h5>
        <ScrollableContent>
          <AdminCards/>
          <Tables />
          <ExpenseTable/>
          <PurchaseTable/>
        </ScrollableContent>
      </div>
    </AdminMaindashContainer>
  );
};
const AdminMaindashContainer = styled.div`
  .MainDash {
    padding-top: 1rem;   
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  @media screen and (max-width: 1200px) {
    .MainDash {
      justify-content: flex-start;
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    .MainDash {
      align-items: center;
    }
  }
  @media screen and (max-width: 678px) {
    .MainDash {
      align-items: center;
      margin-left: 22px;
    }
  }
  @media screen and (max-width: 578px) {
    .MainDash {
      align-items: center;
      margin-left: 26px;
    }
  }
  @media screen and (max-width: 568px) {
    .MainDash {
      align-items: center;
      margin-left: 28px;
    }
  }
  @media screen and (max-width:  548px) {
    .MainDash {
      align-items: center;
      margin-left: 60px;
    }
  }
  @media screen and (max-width:  432px) {
    .MainDash {
      align-items: center;
      margin-left: 80px;
    }
  }
 
  @media screen and (max-width:  388px) {
    .MainDash {
      align-items: center;
      margin-left: 80px;
    }
  }
  @media screen and (max-width:  358px) {
    .MainDash {
      align-items: center;
      margin-left: 60px;
    }
  }
  @media screen and (max-width:  344px) {
    .MainDash {
      align-items: center;
      margin-left: 80px;
    }
  }
  @media screen and (max-width:  330px) {
    .MainDash {
      align-items: center;
      margin-left: 90px;
    }
  }
`;

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
export default AdminMaindash;
