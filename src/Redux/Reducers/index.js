import { combineReducers } from "redux";

import getTodos from './ReducerTodos'

const rootReducer = combineReducers({ getTodos });

export default rootReducer;