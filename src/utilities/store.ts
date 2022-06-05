export interface Store {
  jiraUrl: string;
  jiraUsername: string;
  jiraToken: string;
  slackToken: string;
}

export const storeDefaults: Store = {
  jiraUrl: "",
  jiraUsername: "",
  jiraToken: "",
  slackToken: "",
};

export const getStore = async () => await window.Main.store.get();

export const setStore = async (store: Store) =>
  await window.Main.store.set(store);
