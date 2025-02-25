import styled from "@emotion/styled";
import React from "react";
import Card from "./Card";
import Text from "../../../components/Paragraph";
import walletIcon from "../../../assets/icons/wallet.svg";
import SizedBox from "../../../components/SizedBox";
import Button from "../../../components/Button";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoggOutInvestments: React.FC<IProps> = () => {
  return (
    <Root>
      <Card
        justifyContent="center"
        alignItems="center"
        style={{ padding: "38px 0px" }}
      >
        <img src={walletIcon} alt="wallet" style={{ height: 56, width: 56 }} />
        <SizedBox height={8} />
        <Text type="secondary" fitContent>
          Connect your wallet to see deposits
        </Text>
      </Card>
      <SizedBox height={16} />
      <Button fixed >
        Connect Wallet
      </Button>
    </Root>
  );
};
export default LoggOutInvestments;
