import type { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import type { Store } from "../CyberUI";

export type Plugin = {
    Json: React.FC<{ value: any }>;
    Debug: React.FC<{ value: any }>;
    Table: React.FC<{ value: any }>;
};

export function createPluginModule<T extends Record<string, any>>(options: {
    plugin: Plugin;
    store: Store<T>;
}) {
    // Cache for UI components
    const componentCache = new WeakMap();

    // Create plugin proxy
    return new Proxy({}, {
        get(_, prop: string) {
            const Component = options.plugin[prop as keyof Plugin];
            if (!Component) return undefined;

            const cacheKey = { prop };
            if (!componentCache.has(cacheKey)) {
                componentCache.set(cacheKey, observer((): ReactNode =>
                    Component({
                        value: options.store.state
                    })
                ));
            }
            return componentCache.get(cacheKey);
        }
    });
}
