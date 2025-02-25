import styled from "@emotion/styled";
import React from "react";
import Divider from "../../../components/Divider";
import { Column, Row } from "../../../components/Flex";
import Paragraph from "../../../components/Paragraph";
import SizedBox from "../../../components/SizedBox";
import BN from "../../../utils/BN";
import Card from "./Card";

export interface IToken {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  startPrice?: number;
  description?: string;
  logo: string;
  category?: string[];
}


export type TInvestment = {
  stakedAmount: BN;
  strategy: string;
  apy: BN;
  token: IToken;
};


interface IProps {
  invest: TInvestment;
}

const Status = styled.div<{ secondary?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 12px;
  color: ${({ secondary }) => (secondary ? "#ffffff" : "#7ce34f")};
  background: ${({ secondary }) => (secondary ? "#3B3B46" : "#2a352a")};
  border-radius: 14px;
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > * {
    text-align: left;
    margin-bottom: 16px;
    width: 100%;
  }
  & > :last-child {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > * {
      text-align: center;
      margin-bottom: 0;
      width: fit-content;
      margin-right: 24px;
    }
    & > :last-child {
      margin-bottom: 0;
    }
  }
`;

const TextButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #767eff;
  transition: 0.4s;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;
  box-shadow: none;
  padding: 0;
  :hover {
    color: #fff;
  }
  :disabled {
    color: #747489;
    cursor: not-allowed;
  }
`;

const DepositCard: React.FC<IProps> = ({ invest }) => {
  const data: Array<{ name: string; value: string }> = React.useMemo(
    () => [
      { name: "Asset", value: invest.token.name },
      { name: "APY", value: `${invest.apy.toFormat(2)} %` },
      {
        name: "Amount",
        value: `${BN.formatUnits(
          invest.stakedAmount,
          invest.token.decimals
        ).toFormat(2)} ${invest.token.symbol}`,
      },
      { name: "Strategy", value: invest.strategy },
    ],
    [invest]
  );
  return (
    <Card style={{ marginBottom: 16 }}>
      <Row alignItems="center">
        <Paragraph size="big" fitContent weight={600}>
          {invest.token.name} Deposit
        </Paragraph>
        <SizedBox width={16} />
        <Status>Alpha</Status>
      </Row>
      <SizedBox height={24} />
      <Info>
        {data.map(({ name, value }) => (
          <Column crossAxisSize="max" key={value}>
            <Paragraph type="secondary" size="medium">
              {name}
            </Paragraph>
            <Paragraph>{value}</Paragraph>
          </Column>
        ))}
      </Info>
      <SizedBox height={24} />
      <Divider />
      <SizedBox height={14} />
      <ActionsWrapper>
        <TextButton >Deposit again</TextButton>
        <TextButton >Withdraw all</TextButton>
      </ActionsWrapper>
    </Card>
  );
};
export default DepositCard;
