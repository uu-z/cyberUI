import { makeAutoObservable } from "mobx";
import type { Widget, Config } from "./types";
import { createWidgetModule } from "./modules/widget";
import { createPluginModule, type Plugin } from "./modules/plugin";

export type Store<T> = {
  state: T;
  setState(key: keyof T, value: T[keyof T]): void;
}

export type StoreWithModules<T> = Store<T> & {
  widget: Record<keyof T, any>;
  plugin: Record<string, any>
}

export const CyberUI = (options: {
  theme: {
    widget: Widget;
    plugin: Plugin;
  };
}) => {
  const createStore = <T extends Record<string, any>>(config: {
    state: T;
    config?: Config<T>;
  }) => {
    const store = makeAutoObservable({
      state: config.state as T,
      setState(key: keyof T, value: T[keyof T]) {
        const fieldConfig = config.config?.[key];
        this.state[key] = value;
        fieldConfig?.onChange?.(value);
      }
    }) as Store<T>;

    // Create widget module
    const widgetModule = createWidgetModule({
      widget: options.theme.widget,
      store,
      config: config.config
    });

    // Create plugin module
    const pluginModule = createPluginModule({
      plugin: options.theme.plugin,
      store
    });

    // Return store with modules
    return new Proxy(store, {
      get(target: Store<T>, prop: string | symbol) {
        if (prop === "widget") {
          return widgetModule;
        }
        if (prop === "plugin") {
          return pluginModule;
        }
        return target[prop as keyof Store<T>];
      }
    }) as StoreWithModules<T>;
  };

  return {
    store: createStore
  };
};
