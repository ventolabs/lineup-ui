import styled from "@emotion/styled";
import React, { useState } from "react";
import StarCheckbox from "./StarCheckbox";
import { Column } from "../../components/Flex";
import { Row } from "../../components/Flex";
import Paragraph from "../../components/Paragraph";
import SizedBox from "../../components/SizedBox";

interface IProps {
  data: {
    strategy: string;
    apy: string;
    tvl: string;
    tokens: Array<{ symbol: string; icon: string }>;
  };
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 280px;
  background: #1f1e25;
  border-radius: 8px;
`;

const Coins = styled.div`
  img {
    border-radius: 50%;
    margin-left: -8px;
    border: 1px solid #1f1e25;
  }
`;

const PoolCard: React.FC<IProps> = ({ data }) => {
  const [starChecked, setStarChecked] = useState(false);
  return (
    <Root>
      <Row
        style={{ padding: "16px 24px", boxSizing: "border-box" }}
        justifyContent="space-between"
      >
        <Column>
          <Paragraph>{data.tokens.map(({ symbol }) => symbol).join(" + ")}</Paragraph>
          <Paragraph size="small" style={{ color: "#666DE3" }}>
            {data.strategy}
          </Paragraph>
        </Column>
        <Row alignItems="center" mainAxisSize="fit-content">
          <Coins>
            {data.tokens.map(({ icon, symbol }) => (
              <img src={icon} alt={symbol} style={{ width: "24px", height: "24px" }} />
            ))}
          </Coins>
          <SizedBox width={16} />
          <StarCheckbox checked={starChecked} onChange={setStarChecked} />
        </Row>
      </Row>
      <Row
        style={{
          padding: "16px 24px",
          boxSizing: "border-box",
          borderTop: "1px solid #0B0B0D",
        }}
      >
        <Column style={{ flex: 1 }}>
          <Paragraph size="small" style={{ color: "#747489" }}>
            APY
          </Paragraph>
          <Paragraph>{data.apy}</Paragraph>
        </Column>
        <Column style={{ flex: 1 }}>
          <Paragraph size="small" style={{ color: "#747489" }}>
            TVL
          </Paragraph>
          <Paragraph>{data.tvl}</Paragraph>
        </Column>
      </Row>
    </Root>
  );
};
export default PoolCard;
