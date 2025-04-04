import { makeAutoObservable } from "mobx";
import RootStore from "./RootStore";
import { User } from "@privy-io/react-auth";

export default class UserStore {
  rootStore?: RootStore;
  user?: User;


  private constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  static create = (rootStore: RootStore) => {
    return new UserStore(rootStore);
  };
}
