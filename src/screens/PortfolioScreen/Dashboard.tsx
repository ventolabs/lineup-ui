import styled from "@emotion/styled";
import React from "react";
import SizedBox from "../../components/SizedBox";
import Investments from "./Investments";
import TotalValue from "./TotalValue";
const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 16px ;
  box-sizing: border-box;
  @media (min-width: 768px) {
    padding: 0 24px 16px 24px;
  }
`;


const Dashboard: React.FC = () => (
  <Root>
  <TotalValue />
  <SizedBox height={40} />
  <Investments />
</Root>
);
export default Dashboard;
