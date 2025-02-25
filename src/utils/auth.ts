import * as ethers from "ethers";
import { User } from "@privy-io/react-auth";

export const handleSignMessage = async (
  authenticated: boolean,
  user: User | null,
) => {
  if (!authenticated || !user) return;

  try {
    if (!window.ethereum) {
      console.error("MetaMask not found.");
      return;
    }

    if (!user.wallet || !user.wallet.address) {
      console.warn("No wallet connected.");
      return;
    }

    if (window.ethereum.isMetaMask !== true) {
      console.error("MetaMask is not the default provider.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const message = "Lineup ask for signature";
    const signature = await signer.signMessage(message);

    localStorage.setItem("authToken", signature);
    console.log("Signed Token:", signature);
  } catch (error) {
    console.error("Signing failed:", error);
  }
};
