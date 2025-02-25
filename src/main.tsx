import "./index.css";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import "normalize.css";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { PRIVY_APP_ID, PRIVY_CONFIG }  from "./utils/constants";  

createRoot(document.getElementById("root")!).render(
  <PrivyProvider
    appId={PRIVY_APP_ID}
    config={PRIVY_CONFIG as PrivyClientConfig}
  >
    <Router>
      <App />
      <ToastContainer theme="dark" />
    </Router>
  </PrivyProvider>
);
