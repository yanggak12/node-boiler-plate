import { combineReducers } from "redux";
import user_reducer from "./user_reducer";

const rootReducer = combineReducers({
  // reducer가 여러개 있을 경우 rootReducer에서 하나로 합쳐주는 기능.
  user_reducer,
});

export default rootReducer;
