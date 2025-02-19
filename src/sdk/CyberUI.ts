import { makeAutoObservable } from "mobx";
import type { Widget } from "./types";
import { createWidgetModule } from "./modules/widget";

export type Store<T> = {
  state: T;
  setState(key: keyof T, value: any): void;
}

export const CyberUI = (options: { widget: Widget }) => {
  const createStore = <T extends Record<string, any>>(config: {
    state: T;
    config?: Partial<Record<keyof T, any>>;
  }) => {
    const store = makeAutoObservable({
      state: config.state as T,
      setState(key: keyof T, value: any) {
        this.state[key] = value;
      }
    }) as Store<T>;

    // Create widget module
    const widgetModule = createWidgetModule({
      widget: options.widget,
      store,
      config: config.config
    });

    // Return store with modules
    return new Proxy(store, {
      get(target: Store<T>, prop: string | symbol) {
        if (prop === "widget") {
          return widgetModule;
        }
        return target[prop as keyof Store<T>];
      }
    }) as Store<T> & {
      widget: Record<keyof T, any>;
      // Future modules can be added here like:
      // form: Record<keyof T, any>;
      // table: Record<keyof T, any>;
    };
  };

  return {
    store: createStore
  };
};
