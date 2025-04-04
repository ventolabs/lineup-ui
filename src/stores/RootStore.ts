import { autorun, makeAutoObservable } from "mobx";
import UserStore from "./UserStore";
import ChatStore, { ISerializedChatStore } from "./ChatStore";
import { saveState } from "../utils/localStorage";

export interface ISerializedRootStore {
  chatStore?: ISerializedChatStore;
}

export default class RootStore {
  static instance?: RootStore;
  userStore: UserStore;
  chatStore: ChatStore;
  private constructor(initState?: ISerializedRootStore) {
    makeAutoObservable(this);
    this.userStore = UserStore.create(this);
    this.chatStore = ChatStore.create(this, initState?.chatStore);
    autorun(() => saveState(this.serialize()), { delay: 1000 });
  }

  static create = (initState?: ISerializedRootStore) => {
    if (!RootStore.instance) {
      RootStore.instance = new RootStore(initState);
    }

    return RootStore.instance;
  };

  serialize = (): ISerializedRootStore => {
    return {
      chatStore: this.chatStore.serialize(),
    };
  };
}
