import { appSymbol, createApp, useApp } from "./app";

const registStore = (app) => {
  app.provide(appSymbol, createApp());
};

const useStore = () => {
  const app = useApp();

  const store = {
    app,
  };
  return store;
};

export { registStore, useStore };
