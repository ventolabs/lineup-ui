import styled from "@emotion/styled";
import React from "react";
import Text from "../../../components/Paragraph";
import SizedBox from "../../../components/SizedBox";
import Button from "../../../components/Button";
import Card from "./Card";
import { Link } from "react-router-dom";
import DepositCard from "./DepositCard";
import plusIcon  from "@src/assets/icons/plus.svg";
import noResultIcon  from "@src/assets/icons/noResult.svg";
import BN from "../../../utils/BN";
import { ROUTES } from "../../../components/Header/Header";
interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotificationCard = styled(Card)<{ padding?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 16px;
  padding: ${({ padding }) => padding ?? 38}px !important;
`;

const investments = [
  {
    stakedAmount: new BN(100),
    strategy: "Ethereum Yield Optimizer",
    apy: new BN(10),
    token: { assetId: "0x1234567890123456789012345678901234567890", name: "ETH", symbol: "ETH", decimals: 18, logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1747033579" },
  },
  {
    stakedAmount: new BN(100), 
    strategy: "ETH Staking Pool",
    apy: new BN(10),
    token: { assetId: "0x1234567890123456789012345678901234567890", name: "ETH", symbol: "ETH", decimals: 18, logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1747033579" },
  },
];
const LoggInInvestments: React.FC<IProps> = () => {
  return (
    <Root>
      {[1].length === 0 ? (
        <NotificationCard padding={28}>
          <img src={noResultIcon} alt="noResult" />
          <SizedBox height={8} />
          <Text type="secondary">
            You don’t have any deposits yet.
            <br />
            Press the “Invest” button below to invest.
          </Text>
        </NotificationCard>
      ) : (
        investments.map((i, key) => (
          <DepositCard invest={i} key={key} />
        ))
      )}
      <Link to={ROUTES.EARN.link}>
        <Button fixed>
          <img src={plusIcon} alt="plus" />
          <SizedBox width={8} />
          Invest
        </Button>
      </Link>
    </Root>
  );
};
export default LoggInInvestments;
