import type { ReactNode } from "react";
import type { Widget } from "../types";
import { observer } from "mobx-react-lite";

export function createWidgetModule<T extends Record<string, any>>(options: {
    widget: Widget;
    store: {
        state: T;
        setState(key: keyof T, value: any): void;
    };
    config?: Partial<Record<keyof T, any>>;
}) {
    // Cache for UI components
    const componentCache = new WeakMap();

    // Cache for field proxies
    const fieldProxies = new Map<string, any>();

    // Create proxy for state
    const stateProxy = new Proxy(options.store.state, {
        get(stateTarget: T, stateProp: string) {
            if (fieldProxies.has(stateProp)) {
                return fieldProxies.get(stateProp);
            }

            const fieldConfig = options.config?.[stateProp as keyof T] || {};
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
                                    value: options.store.state[stateProp as keyof T],
                                    onChange: (newValue: any) => {
                                        console.log(newValue)
                                        options.store.setState(stateProp as keyof T, newValue);
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

    return stateProxy;
}
