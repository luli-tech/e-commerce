import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [], // Corrected from productDate
    userInfo: null,
};

export const bazzarSlice = createSlice({
    name: 'baz',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.productData = action.payload // Add item to the array instead of replacing it
        },
    },
});

export const { addToCart } = bazzarSlice.actions;
export default bazzarSlice.reducer;
