import {configureStore } from "@reduxjs/toolkit";
import weatherReducers from "./reducers/weatherReducers";

const store = configureStore({
  reducer: weatherReducers,
});

export default store;