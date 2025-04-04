import { randomBytes, uuidV4 } from "ethers";
import { makeAutoObservable, reaction } from "mobx";
import RootStore from "./RootStore";
import dayjs from "dayjs";
import lineuoLogo from "@src/assets/icons/logo.svg";
import * as identityImg from "identity-img";
import centerEllipsis from "../utils/centerEllipsis";
export interface ISerializedChatStore {
  sessionId: string;
}

enum AGENT_ID {
  sage = "sage",
  scholar = "scholar",
  crypto_bro = "crypto_bro",
}

interface ChatMessage {
  address: string;
  timestamp: string;
  message: string;
  isRight: boolean;
  hasBackground?: boolean;
  icon?: string;
}

export default class ChatStore {
  sessionId: string;
  messages: ChatMessage[] = [];
  agents: string[] = [];

  private constructor(
    private rootStore: RootStore,
    initState?: ISerializedChatStore
  ) {
    makeAutoObservable(this);
    this.sessionId = initState?.sessionId ?? uuidV4(randomBytes(16));
    this.addMessage({
      role: "assistant",
      content: "Hello, how can I help you today?",
      created_at: dayjs().unix(),
    });
    reaction(
      () => this.rootStore.userStore.user?.wallet?.address,
      (user_id) =>
        user_id != null
          ? this.updateAgentHistory(user_id)
          : (this.messages = [])
    );
  }

  static create = (rootStore: RootStore, initState?: ISerializedChatStore) => {
    return new ChatStore(rootStore, initState);
  };

  //  updateAgentList = async () => (this.agents = await fetch(`/api/agents`, { method: "GET" }).then((res) =>res.json()));

  async sendMessage(user_id: string, message: string) {
    if (!user_id) {
      throw new Error("User ID is not set");
    }

    this.addMessage({
      role: "user",
      content: message,
      created_at: dayjs().unix(),
    });
    console.log("store", {
      messages: this.messages.map((m) => m.message),
    });

    const requestBody = {
      message,
      user_id,
      stream: true,
      model: "gpt-4o",
      session_id: this.sessionId,
    };
    try {
      const response = await fetch(`/api/agents/${AGENT_ID.crypto_bro}/runs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const text = await response.text();
      console.log("response", { response, text });
      this.addMessage({
        role: "assistant",
        content: text,
        created_at: dayjs().unix(),
      });
      return response;
    } catch (error) {
      console.error("Error sending message:", error);
    }
    await this.updateAgentHistory(user_id);
  }

  async updateAgentHistory(user_id: string) {
    if (!user_id) {
      throw new Error("User ID is not set");
    }
    const requestBody = {
      user_id,
      session_id: this.sessionId,
      limit: 50,
      model: "gpt-4o",
    };

    const response = await fetch(`/api/agents/${AGENT_ID.crypto_bro}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((res) => res.json());

    response.forEach(this.addMessage);

    console.log("getAgentHistory", { response });
    return response;
  }

  async getSuggestedTopics(user_id: string): Promise<{
    market_overview: string;
    suggested_questions: {
      question: string;
      category: string;
      context: string;
    }[];
  }> {
    if (!user_id) {
      throw new Error("User ID is not set");
    }
    const requestBody = {
      user_id,
      session_id: this.sessionId,
      model: "gpt-4o",
    };

    const response = await fetch(`/api/agents/crypto/suggested-topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((res) => res.json());
    return response;
  }

  private addMessage = (message: {
    role: "user" | "assistant";
    content: string;
    created_at: number;
  }) => {
    const user_id = this.rootStore.userStore.user?.wallet?.address ?? "";

    this.messages.push({
      address:
        message.role === "user" ? centerEllipsis(user_id, 8) : "Lineup AI",
      timestamp: dayjs(message.created_at * 1000).format("DD MMM HH:mm:ss"),
      message: message.content,
      isRight: message.role === "user",
      hasBackground: message.role === "user",
      icon:
        message.role === "assistant"
          ? lineuoLogo
          : identityImg.create(user_id, { size: 24 * 3 }),
    });
  };

  serialize = (): ISerializedChatStore => {
    return {
      sessionId: this.sessionId,
    };
  };
}
