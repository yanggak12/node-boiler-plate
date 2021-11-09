import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../_actions/user_action";

export default function Auth(props, { option, adminRoute = null }) {
  //option
  // null -> 누구나 접근 가능
  // true -> 로그인 한 유저만 접근 가능
  // false -> 로그인 한 유저는 접근 불가능
  const dispatch = useDispatch();
  function AuthenticationCheck(props) {
    useEffect(() => {
      dispatch(authUser()).then((response) => console.log(response));
      Axios.get("/api/user/auth");
    }, []);
    return props.children;
  }
  return AuthenticationCheck;
}
