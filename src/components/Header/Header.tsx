import styled from "@emotion/styled";
import logo from "@src/assets/icons/logo.svg";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Anchor } from "../Anchor";
import Button from "../Button";
import { Column, Row } from "../Flex";
import Banner from "./Banner";
import Wallet from "../Wallet";
import telegramIcon from "@src/assets/icons/telegram.svg";

export const ROUTES: { [key: string]: { title: string; link: string; icon?: string; default?: boolean; targetBlank?: boolean } } = {
  CHAT: { title: "Chat", link: "/chat", default: true },
  EARN: { title: "Earn", link: "/earn" },
  PORTFOLIO: { title: "Portfolio", link: "/portfolio" },
  HELP: { title: "Need help?", link: "https://t.me/lineupFinance", icon: telegramIcon, targetBlank: true },
};

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  height: 64px;
  align-items: center;
  max-width: calc(1160px + 32px);
  width: 100%;
  justify-content: space-between;
  color: white;
  background: #1f1e25;
  border-bottom: 1px solid #3b3b46;
  @media (min-width: 768px) {
    padding: 24px;
    border-bottom: 1px solid transparent;
    background: transparent;
    height: 80px;
  }
`;

// const Logo = styled.img`
//   height: 24px;
//   @media (min-width: 768px) {
//     height: 32px;
//   }
// `;

const MenuWrapperDesktop = styled(Row)`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: none;

  & > * {
    margin-right: 8px;
  }

  &:last-of-type {
    margin-right: 0;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

const MenuItem = styled(Button)<{ selected?: boolean }>`
  height: 32px;
  background: ${({ selected }) => (selected ? "#3B3B46" : "transparent")};

  :hover {
    background: #3b3b46;
  }
`;


const menuItems = Object.values(ROUTES).map((route) => ({
  title: route.title,
  link: route.link,
  routes: [route.link, route.default ? "/" : ""],
  icon: route.icon,
  targetBlank: route.targetBlank,
}));

const Header: React.FC = () => {
  const location = useLocation();
  const [bannerClosed, setBannerClosed] = useState(false);

  return (
    <Column crossAxisSize="max" alignItems="center">
      <Banner closed={bannerClosed} setClosed={setBannerClosed} />
      <Root>
        <Anchor href="https://lineup.finance" > 
          <img src={logo} alt="lineupFinance" />
        </Anchor>
        
        <MenuWrapperDesktop>
          {menuItems.map((item, i) => (
            <Link to={item.link} target={item.targetBlank ? "_blank" : undefined} key={i}>
              <MenuItem selected={item.routes.includes(location.pathname)}>
                {item.icon && <img style={{ width: 20, height: 20 , marginRight: 4 }} src={item.icon} alt={item.title} />}
                {item.title}
              </MenuItem>
            </Link>
          ))}
        </MenuWrapperDesktop>
    
         <Wallet />
      </Root>
    </Column>
  );
};

export default Header;
