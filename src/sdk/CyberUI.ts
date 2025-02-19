import { makeAutoObservable, observe } from "mobx";
import type { ReactNode } from "react";
import type { Widget } from "./types";
import { observer } from "mobx-react-lite";

export const CyberUI = (options: { widget: Widget }) => {
  // Cache for UI components
  const componentCache = new WeakMap();

  type Store<T> = {
    state: T;
    setState(key: keyof T, value: any): void;
  }

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
            const ComponentOrNested = options.widget[uiProp];
            if (!ComponentOrNested) return undefined;

            if (typeof ComponentOrNested === 'function') {
              // Handle direct component function
              const cacheKey = { stateProp, uiProp };
              if (!componentCache.has(cacheKey)) {
                componentCache.set(cacheKey, observer((props: any): ReactNode =>
                  ComponentOrNested({
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
            } else {
              // Handle nested object
              return ComponentOrNested;
            }
          }
        });

        fieldProxies.set(stateProp, fieldProxy);
        return fieldProxy;
      }
    });

    return new Proxy(store, {
      get(target: Store<T>, prop: string | symbol) {
        if (prop === "widget") {
          return stateProxy;
        }
        return target[prop as keyof Store<T>];
      }
    }) as Store<T> & { widget: Record<keyof T, any> };
  };

  return {
    store: createStore
  };
};
