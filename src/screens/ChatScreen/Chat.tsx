import styled from "@emotion/styled";
import { usePrivy } from "@privy-io/react-auth";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import { Row } from "../../components/Flex";
import ConnectWallet from "../../components/IsConnectedWallet";
import Loading from "../../components/Loading";
import { useStores } from "../../stores";
import Message from "./Message";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
  max-width: calc(1160px + 32px);
  padding: 0 16px;
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const InputPanel = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  background-color: #1f1e25;
  border-radius: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 48px;
  padding: 12px;
  box-sizing: border-box;
  background: #1f1e25;
  border: 1px solid #1f1e25;
  border-radius: 8px;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 20px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #a2a2c0;
  }
`;

const MessagesPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 2;
  margin-bottom: 16px;
  max-height: calc(100vh - 450px);
  overflow-y: auto;
`;

const Chat: React.FC = observer(() => {
  const { user } = usePrivy();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { chatStore } = useStores();
  const { messages } = chatStore;
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || !user?.wallet?.address) return;
    setIsLoading(true);
    setInput("");
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      await chatStore.sendMessage(user.wallet.address, input);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  for (const {message} of messages) {
    console.log(message);
  }

  return (
    <Root>
      <MessagesPanel>
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </MessagesPanel>
      <InputPanel>
        <ConnectWallet>
          <TextArea
            placeholder="How can I help you?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          />
          <Divider style={{ margin: "16px 0" }} />
          <Row alignItems="center" justifyContent="space-between">
            <Row></Row>
            {isLoading ? (
              <Button style={{ width: "300px" }} disabled>
                <Loading />
              </Button>
            ) : (
              <Button
                disabled={!input.trim()}
                style={{ width: "300px" }}
                onClick={sendMessage}
              >
                Send message
              </Button>
            )}
          </Row>
        </ConnectWallet>
      </InputPanel>
    </Root>
  );
});

export default Chat;
