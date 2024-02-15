import { configureStore } from "@reduxjs/toolkit";
import MealSlice from "./MealSlise/MealSlice";

const store = configureStore({
  reducer: {
    products: MealSlice,
  },
});

export default store;
