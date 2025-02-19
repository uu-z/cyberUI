import { makeAutoObservable, observe } from "mobx";
import type { ReactNode } from "react";
import type { Widget } from "./types";
import { observer } from "mobx-react-lite";

export const CyberUI = (options: { widege: Widget }) => {
  // Cache for UI components
  const componentCache = new WeakMap();

  const createStore = <T extends Record<string, any>>(config: {
    state: T;
    config?: Partial<Record<keyof T, any>>;
  }) => {
    const store = makeAutoObservable({
      state: config.state as T,
      setState(key: keyof T, value: any) {
        this.state[key] = value;
      }
    });

    // Cache for field proxies
    const fieldProxies = new Map<string, any>();

    // Single proxy for state
    const stateProxy = new Proxy(store.state, {
      get(stateTarget: T, stateProp: string) {
        if (fieldProxies.has(stateProp)) {
          return fieldProxies.get(stateProp);
        }

        const fieldConfig = config.config?.[stateProp as keyof T] || {};
        const fieldProxy = new Proxy({}, {
          get(_, uiProp: string) {
            const Component = options.widege[uiProp];
            if (!Component) return undefined;

            // Get cached component or create new one
            const cacheKey = { stateProp, uiProp };
            if (!componentCache.has(cacheKey)) {
              componentCache.set(cacheKey, observer((props: any): ReactNode =>
                Component({
                  value: store.state[stateProp as keyof T],
                  onChange: (newValue: any) => {
                    console.log(newValue)
                    store.setState(stateProp as keyof T, newValue);
                  },
                  ...fieldConfig,
                  ...props
                })
              ))
            }
            return componentCache.get(cacheKey);
          }
        });

        fieldProxies.set(stateProp, fieldProxy);
        return fieldProxy;
      }
    });

    return new Proxy(store, {
      get(target: typeof store, prop: string | symbol) {
        if (prop === "state") {
          return stateProxy;
        }
        return (target as any)[prop];
      }
    });
  };

  return {
    store: createStore
  };
};
