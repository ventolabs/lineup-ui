import styled from "@emotion/styled";
import React from "react";
import Paragraph from "./Paragraph";
import { Row } from "./Flex";
import SizedBox from "./SizedBox";
import telegramIcon  from "@src/assets/icons/telegram.svg";
import twitterIcon  from "@src/assets/icons/twitter.svg";
import githubIcon  from "@src/assets/icons/github.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  width: calc(100% - 32px);
  max-width: calc(1160px + 32px);
  margin: 40px 16px 0;
  text-align: left;

  border-top: 2px #2a2a32 solid;
  padding: 16px;
`;
const Footer: React.FC<IProps> = () => {
  return (
    <Root>
      <Paragraph type="secondary" fitContent>
      Lineup finance, 2025
      </Paragraph>
      <Row mainAxisSize="fit-content">
        <SizedBox width={20} />
        <img 
          src={telegramIcon}
          style={{ minWidth: 21, cursor: "pointer" }}
          onClick={() => window.open("https://t.me/lineupFinance", "_blank")}
        />
        <SizedBox width={12} />
        <img
          src={twitterIcon}
          style={{ minWidth: 21, cursor: "pointer" }}
          onClick={() =>
            window.open("https://twitter.com/lineupFinance", "_blank")
          }
        />  
        <SizedBox width={12} />
        <img
          src={githubIcon}
          style={{ minWidth: 21, cursor: "pointer" }}
          onClick={() =>
            window.open("https://github.com/ventolabs", "_blank")
          }
        />
      </Row>
    </Root>
  );
};
export default Footer;

