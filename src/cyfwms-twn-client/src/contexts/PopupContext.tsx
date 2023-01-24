import { createContext, useReducer } from "react";
import type { Dispatch, FC, PropsWithChildren } from "react";

/**
 * `PopupContextState` is state of {@link PopupContext}.
 */
export interface PopupContextState {
  /** Open/Close popup */
  open: boolean;
  /** ID */
  id: number;
}

/**
 * `PopupContext` is used to controll popup window.
 */
export const PopupContext = createContext<PopupContextState>({
  open: false,
  id: 0,
});

/**
 * `PopupDispatchContextState` is state of {@link PopupDispatchContext}.
 */
export type PopupDispatchContextState = Dispatch<any>;

/**
 * `PopupDispatchContext` is used to share action dispatcher among \
 * nested components of module.
 */
export const PopupDispatchContext = createContext<PopupDispatchContextState>(
  () => {}
);

const popupReducer = (popup: PopupContextState, action: any) => {
  switch (action.type) {
    case "open": {
      popup = { ...popup };
      popup.open = action.open;
      break;
    }
    case "change_id": {
      popup = { ...popup };
      popup.id = action.id;
      break;
    }
  }
  return popup;
};

/**
 * `PopupContextProvider` is specialized utlity component \
 * which provides dynamic behaviour to it.
 * @param props
 * @example
 * ```jsx
 * <PopupContextProvider>
 *   ...
 * </PopupContextProvider>
 * ```
 * @example
 * ```jsx
 * <PopupContextProvider children={} />
 * ```
 */
export const PopupContextProvider: FC<PropsWithChildren> = (props) => {
  const [popup, dispatch] = useReducer(popupReducer, { open: false, id: 0 });

  return (
    <PopupDispatchContext.Provider value={dispatch}>
      <PopupContext.Provider value={popup}>
        {props.children}
      </PopupContext.Provider>
    </PopupDispatchContext.Provider>
  );
};

export default PopupContext;
