import axios from "axios";
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/user/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/user/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function authUser(dataToSubmit) {
  const request = axios
    .get("/api/user/login")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
