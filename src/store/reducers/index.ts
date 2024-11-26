import { combineReducers } from "redux";
import flightReducer from "./flightReducer";

const rootReducer = combineReducers({
  flights: flightReducer,
});

export default rootReducer;
