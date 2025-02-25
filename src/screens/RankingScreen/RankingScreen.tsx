import styled from "@emotion/styled";
import React from "react";
import Divider from "../../components/Divider";
import { Row } from "../../components/Flex";
import Select from "../../components/Select";
import SizedBox from "../../components/SizedBox";
import SwitchButton from "../../components/SwitchButton";
import PoolsGrid from "./PoolsGrid";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 54px;
  box-sizing: border-box;
  padding: 0 24px;
  width: 100%;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 56px;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-bottom: 16px;
  white-space: nowrap;
`;

const SearchRow = styled(Row)`
  @media (max-width: 780px) {
    display: none;
  }
`;

const RankingScreen: React.FC<IProps> = () => {

  return (
    <Root>
      <Title>Strategy ranking</Title>
      <SearchRow alignItems="center" justifyContent="space-between">
        <Select style={{ minWidth: 320 }}>Select your assets for filter</Select>
      </SearchRow>
      <Divider style={{ marginTop: 32 }} />
      <SearchRow style={{ padding: "16px 0" }}>
        <Select>All chains</Select>
        <SizedBox width={8} />
        <Select>All assets</Select>
        <SizedBox width={8} />
        <SwitchButton />
      </SearchRow>
      <Divider style={{ marginBottom: 32 }} />
      <PoolsGrid />
    </Root>
  );
};
export default RankingScreen;
