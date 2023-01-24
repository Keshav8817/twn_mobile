import { createContext, useReducer } from "react";
import type { Dispatch, FC, PropsWithChildren } from "react";

/**
 * `TabbarContextState` is state of {@link TabbarContext}.
 */
export interface TabbarContextState {
  /** Hide/Unhide tabbar */
  hidden: boolean;
}

/**
 * `TabbarContext` is used to controll hide/unhide of {@link Tabbar}.
 */
export const TabbarContext = createContext<TabbarContextState>({
  hidden: true,
});

/**
 * `TabbarDispatchContextState` is state of {@link TabbarDispatchContext}.
 */
export type TabbarDispatchContextState = Dispatch<any>;

/**
 * `TabbarDispatchContext` is used to share action dispatcher among \
 * nested components of module.
 */
export const TabbarDispatchContext = createContext<TabbarDispatchContextState>(
  () => {}
);

const tabbarReducer = (tabbar: TabbarContextState, action: any) => {
  switch (action.type) {
    case "toggle_hidden": {
      tabbar = { ...tabbar };
      tabbar.hidden = action.hidden;
      break;
    }
  }
  return tabbar;
};

/**
 * `TabbarContextProvider` is specialized utlity component \
 * which provides dynamic behaviour to it.
 * @param props
 * @example
 * ```jsx
 * <TabbarContextProvider>
 *   ...
 * </TabbarContextProvider>
 * ```
 * @example
 * ```jsx
 * <TabbarContextProvider children={} />
 * ```
 */
export const TabbarContextProvider: FC<PropsWithChildren> = (props) => {
  const [popup, dispatch] = useReducer(tabbarReducer, { hidden: true });

  return (
    <TabbarDispatchContext.Provider value={dispatch}>
      <TabbarContext.Provider value={popup}>
        {props.children}
      </TabbarContext.Provider>
    </TabbarDispatchContext.Provider>
  );
};

export default TabbarContext;
