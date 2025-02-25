import styled from "@emotion/styled";
import React from "react";
import Paragraph from "./Paragraph";
import Wallet from "@src/assets/icons/wallet.svg";
import SizedBox from "./SizedBox";
import Button from "./Button";
import { usePrivy } from "@privy-io/react-auth";

interface IProps {
  children: React.ReactNode;
  justButton?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IsConnectedWallet: React.FC<IProps> = ({children, justButton = false}) => {
  const { authenticated,  login } = usePrivy();

  return authenticated ? children : (justButton ? <Button fixed onClick={() => login()}>Connect Wallet</Button> :
    <Root>
        <img src={Wallet} style={{ height: 56, width: 56 }} />
        <SizedBox height={8} />
        <Paragraph type="secondary" fitContent>
          Connect your wallet to see deposits
        </Paragraph>
      <SizedBox height={16} />
      <Button fixed onClick={() => login()}>
        Connect Wallet
      </Button>  
    </Root>
  );
};
export default IsConnectedWallet;
