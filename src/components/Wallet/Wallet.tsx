import Button from "../Button";
import LoggedInAccountInfo from "./LoggedInAccountInfo";
import styled from "@emotion/styled";
import { usePrivy } from "@privy-io/react-auth";
import React from "react";

interface IProps {}

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
`;

const Wallet: React.FC<IProps> = () => {
  const { user, login } = usePrivy();
  const address = user?.wallet?.address;
  return (
    <Root>
      {address == null ? (
        <Button
          style={{ maxWidth: 170 }}
          size="medium"
          onClick={login}
          fixed
        >
          Connect wallet
        </Button>
      ) : (
        <LoggedInAccountInfo />
      )}
    </Root>
  );
};
export default Wallet;
