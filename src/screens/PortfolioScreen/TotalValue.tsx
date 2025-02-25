import styled from "@emotion/styled";
import React from "react";
import Paragraph from "../../components/Paragraph";
import SizedBox from "../../components/SizedBox";
import { Column } from "../../components/Flex";
import centerEllipsis from "../../utils/centerEllipsis";
import { Anchor } from "../../components/Anchor";
import bg from "../../assets/icons/background.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: url(${bg}) bottom right #565cbf;
  background-size: cover;
  padding: 27px 16px;
  border-radius: 16px 16px 0 0;

  @media (min-width: 768px) {
    padding: 24px 32px;
  }
`;
const Bottom = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #1f1e25;
  border-radius: 0 1px 16px 16px;
  @media (min-width: 768px) {
    padding: 24px 32px;
  }
`;
const TvlTitle = styled.div`
  color: #ffffff;
  font-size: 26px;
  line-height: 34px;
  font-weight: 600;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 56px;
  }
`;
const TotalValue: React.FC<IProps> = () => {

  return (
    <Root>
      <Top>
        <Paragraph size="medium">Total Value Locked</Paragraph>
        <SizedBox height={8} />
        <TvlTitle>$420</TvlTitle>
      </Top>
      <SizedBox height={2} />
      <Bottom>
        <Column
          crossAxisSize="max"
          style={{ marginRight: 40 }}
          justifyContent="space-between"
          mainAxisSize="stretch"
        >
          <Paragraph type="secondary">APY</Paragraph>
          <Paragraph size="medium">{42.0} %</Paragraph>
        </Column>
        <Column
          crossAxisSize="max"
          justifyContent="space-between"
          mainAxisSize="stretch"
        >
          <Paragraph type="secondary">Pool</Paragraph>
          <Anchor href={`/`}>
            <Paragraph style={{ textDecoration: "underline" }} size="medium">
              {centerEllipsis("0x1234567890123456789012345678901234567890", 10)}
            </Paragraph>
          </Anchor>
        </Column>
      </Bottom>
    </Root>
  );
};
export default TotalValue;
