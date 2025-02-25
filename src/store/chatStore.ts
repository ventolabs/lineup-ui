import { create } from "zustand";
import dayjs from "dayjs";
import logo from "@src/assets/icons/logo.svg";
interface ChatMessage {
  address: string;
  timestamp: string;
  message: string;
  isRight: boolean;
  hasBackground?: boolean;
  icon?: string;
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      address: "Lineup AI",
      timestamp: dayjs().format("HH:mm"),
      message: "Hello! How can I assist you?",
      isRight: false,
      icon: logo
    },
  ],
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set(() => ({ messages: [] })),
}));
