import styled from "@emotion/styled";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ROUTES } from "./components/Header/Header";
import ChatScreen from "./screens/ChatScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import RankingScreen from "./screens/RankingScreen";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  min-height: 100vh;
  align-items: center;

  & > * {
    width: 100%; 
  }
`;

const Content = styled.div`
  display: flex;
  min-height: calc(100vh - 194px - 80px);
  margin: auto;
  @media (min-width: 768px) {
    min-height: calc(100vh - 210px - 64px);
    max-width: calc(1160px + 32px);
    width: 100%;
    margin: auto;
    box-sizing: border-box;
  }
`;

const App: React.FunctionComponent = () => {
  const location = useLocation();
   
  return (
    <Root>
      <Header />
      <Content>
        <Routes key={location.pathname} location={location}>
          <Route path={ROUTES.CHAT.link} element={<ChatScreen />} />
          <Route path={ROUTES.EARN.link} element={<RankingScreen />} />
          <Route path={ROUTES.PORTFOLIO.link} element={<PortfolioScreen />} />
          <Route path="*" element={<ChatScreen />} />
        </Routes>
      </Content>
      <Footer />
    </Root>
  );
};

export default App;
