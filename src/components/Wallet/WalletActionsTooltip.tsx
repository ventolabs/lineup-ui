import styled from "@emotion/styled";
import copy from "copy-to-clipboard";
import React from "react";
import { toast } from "react-toastify";
import { Anchor } from "../Anchor";
import Divider from "../Divider";
import { Column } from "../Flex";
import Text from "../Paragraph";
import { usePrivy } from "@privy-io/react-auth";

interface IProps {}

const Root = styled(Column)`
  .menu-item {
    padding: 10px 0;
    cursor: pointer;

    :first-of-type {
      padding-top: 0;
    }

    :last-of-type {
      padding-bottom: 0;
    }
  }

  .divider {
    margin: 0 -16px;
    width: calc(100% + 32px);
  }
`;

const WalletActionsTooltip: React.FC<IProps> = () => {
    const {  user, logout } = usePrivy();

  const address = user?.wallet?.address;
  const handleCopyAddress = () => {
    address && copy(address);
    toast.success("Your address was copied");
  };

  return (
    <Root>
      <Text onClick={handleCopyAddress} className="menu-item">
        Copy address
      </Text>
      <Anchor
        style={{ padding: "0 0 10px 0" }}
        href={`https://arbiscan.io/address/${address}`}
      >
        <Text>View in Arbiscan</Text>
      </Anchor>
      <Divider className="divider" />
      <Text onClick={logout} className="menu-item">
        Disconnect
      </Text>
    </Root>
  );
};
export default WalletActionsTooltip;
