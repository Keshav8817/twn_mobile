import { createContext, useReducer } from "react";
import type { Dispatch, FC, PropsWithChildren } from "react";

/**
 * `AuthContextState` is state of {@link AuthContext}.
 */
export interface AuthContextState {
  /** JSON Web Token */
  jwtToken: string | null;
}

/**
 * `AuthContext` is used to share module related data among \
 * nested components of module.
 */
export const AuthContext = createContext<AuthContextState>({
  jwtToken: localStorage.getItem("jwtToken"),
});

/**
 * `AuthDispatchContextState` is state of {@link AuthDispatchContext}.
 */
export type AuthDispatchContextState = Dispatch<any>;

/**
 * AuthDispatchContext` is used to share action dispatcher among \
 * nested components of module.
 */
export const AuthDispatchContext = createContext<AuthDispatchContextState>(
  () => {}
);

const authReducer = (auth: AuthContextState, action: any) => {
  switch (action.type) {
    case "login": {
      localStorage.setItem("jwtToken", action.jwtToken);
      auth = { ...auth };
      auth.jwtToken = action.jwtToken;
      break;
    }
    case "logout": {
      localStorage.removeItem("jwtToken");
      auth = { ...auth };
      auth.jwtToken = null;
      break;
    }
  }
  return auth;
};

/**
 * `AuthContextProvider` is specialized utlity component \
 * which provides dynamic behaviour to it.
 * @param props
 * @example
 * ```jsx
 * <AuthContextProvider>
 *   ...
 * </AuthContextProvider>
 * ```
 * @example
 * ```jsx
 * <AuthContextProvider children={} />
 * ```
 */
export const AuthContextProvider: FC<PropsWithChildren> = (props) => {
  const [auth, dispatch] = useReducer(authReducer, {
    jwtToken: localStorage.getItem("jwtToken"),
  });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export default AuthContext;
