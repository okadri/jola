// https://youtu.be/DYBuMh553yc
import { applyMiddleware, combineReducers, createStore } from "redux";
import { contactReducer } from "./contact/reducer";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";

export const rootReducer = combineReducers({
    contact: contactReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
