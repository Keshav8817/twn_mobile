import axiosInstance from "../../library/axiosInstance";
import type { Dispatch, FormEvent } from "react";
import type { NavigateFunction } from "react-router-dom";

/**
 * @param event - React's 'synthetic' form submit event
 * @param navigate - React Router Dom's navigation function
 * @param authDispatchContext - Auth's dispatch context
 */
export const handleSubmit = (
  event: FormEvent<HTMLFormElement>,
  navigate: NavigateFunction,
  authDispatchContext: Dispatch<any>
) => {
  event.preventDefault();
  axiosInstance
    .post<{ jwtToken: string }>("/login/authenticate", {
      username: event.currentTarget.userName.value,
      password: event.currentTarget.passWord.value,
    })
    .then((response) => {
      authDispatchContext({ type: "login", jwtToken: response.data.jwtToken });
      navigate("/home");
    })
    .catch((err) => {
      alert(err.message);
    });
};
