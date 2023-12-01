import React from 'react';
import styled from 'styled-components';
import CompactCard from '../AdminCard/AdminCard';


const AdminCards = () => {
  return (
    <AdminCardsContainer>
      <div className="Cards">
        <div className="parentContainer">
          <CompactCard/>
        </div>
      </div>
    </AdminCardsContainer>
  );
};

const AdminCardsContainer = styled.div`
  .Cards {
    display: flex;
    gap: 10px;
  }
  .parentContainer {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    .Cards {
      width: 90%;
      flex-direction: column;
      gap: 60px;
      margin-bottom: 60px;
    }
    .parentContainer {
      height: 9rem;
    }
  }
  @media screen and (max-width: 425px) {
    .Cards {
      width: 80%;
      flex-direction: column;
      gap: 60px;
      margin-bottom: 60px;
    }
    .parentContainer {
      height: 9rem;
    }
  }
`;

export default AdminCards;
