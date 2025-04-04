import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ComingSoonOverlay from "./components/ComingSoonOverlay";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ROUTES } from "./components/Header/Header";
import ChatScreen from "./screens/ChatScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import RankingScreen from "./screens/RankingScreen";
import { usePrivy } from "@privy-io/react-auth";
import { useStores } from "./stores";

const App: React.FunctionComponent = () => {
  const { user } = usePrivy();
  const { userStore } = useStores();
  useEffect(() => {
    if (user) userStore.user = user;
  }, [user]);
  return (
    <Root>
      <Header />
      <Content>
        <Routes key={location.pathname} location={location}>
          <Route path={ROUTES.CHAT.link} element={<ChatScreen />} />
          <Route
            path={ROUTES.EARN.link}
            element={
              <ComingSoonOverlay>
                <RankingScreen />
              </ComingSoonOverlay>
            }
          />
          <Route
            path={ROUTES.PORTFOLIO.link}
            element={
              <ComingSoonOverlay>
                <PortfolioScreen />
              </ComingSoonOverlay>
            }
          />
          <Route path="*" element={<ChatScreen />} />
        </Routes>
      </Content>
      <Footer />
    </Root>
  );
};

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

export default App;
