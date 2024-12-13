import { configureStore } from "@reduxjs/toolkit";
import { bazzarSlice } from "./barzSlice";

let store = configureStore({
    reducer: { bazzar: bazzarSlice }
})
export default store