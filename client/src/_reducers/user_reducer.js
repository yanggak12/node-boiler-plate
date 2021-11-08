import { LOGIN_USER } from "../_actions/types";

export default function user_reducer(prevState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...prevState, loginSuccess: action.payload };

    default:
      return prevState;
  }
}
