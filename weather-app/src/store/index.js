import {configureStore } from "@reduxjs/toolkit";
import weatherReducers from "./reducers/weatherReducer";

const store = configureStore({
  reducer: weatherReducers,
});

export default store;