import styled from "@emotion/styled";
import React from "react";
import Text from "../../components/Paragraph";
import SizedBox from "../../components/SizedBox";
import LoggOutInvestments from "./Investments/LoggOutInvestments";
import LoggInInvestments from "./Investments/LoggInInvestments";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const IS_WALLET_CONNECTED = true;

const Investments: React.FC<IProps> = () => {
  return (
    <Root>
      <Text weight={600} size="title">
        My Investments
      </Text>
      <SizedBox height={16} />
      {!IS_WALLET_CONNECTED ? (
        <LoggOutInvestments />
      ) : (
        <LoggInInvestments />
      )}
    </Root>
  );
};
export default Investments;
