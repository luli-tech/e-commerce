import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import storage from "redux-persist/lib/storage"; // Correct import
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";




export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', // Action type
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data; // Return the fetched products
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

// Initial state of the slice
let initialState = {
    productData: [],
    cart: [],
    RegisteredCustomer: [],
    ActiveUSers: null,
    status: null,
    error: null,
    isLoading: false
};

// Create the slice
let bazzarSlice = createSlice({
    name: 'bazzar',  // Fixed the typo here
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { email, name, photoURL } = action.payload;

            // Check if user already exists in RegisteredCustomer
            const existingUser = state.RegisteredCustomer.find(
                (user) => user.profile.email === email
            );

            if (existingUser) {
                // If user exists, update authentication status
                const updatedUser = { ...existingUser, isAuthenticated: true };
                state.RegisteredCustomer = state.RegisteredCustomer.map((user) =>
                    user.profile.email === updatedUser.profile.email ? updatedUser : user
                );

                // Set ActiveUsers to the updated user
                state.ActiveUsers = updatedUser;
                state.successmessage = "Login success";

            } else {
                // If user does not exist, register a new user
                const newUser = {
                    profile: { email, name, photoURL },
                    cart: [],
                    isAuthenticated: true, // Mark the new user as authenticated
                };

                // Add new user to RegisteredCustomer array
                state.RegisteredCustomer.push(newUser);

                // Set ActiveUsers to the new user
                state.ActiveUsers = newUser;
                state.successmessage = "User registered and logged in";
            }
        },



        logout: (state) => {
            state.ActiveUsers = null; // Clear the active user session
        }, addToCart: (state, action) => {
            if (state.ActiveUsers) {
                const existingItem = state.ActiveUsers.cart.find(
                    (item) => item.id === action.payload.id
                );

                if (existingItem) {
                    // If item already exists in the cart, update its quantity and total
                    existingItem.quantity += action.payload.quantity || 1;
                    existingItem.total = existingItem.price * existingItem.quantity;
                } else {
                    // If item is not in the cart, add it with quantity and total
                    state.ActiveUsers.cart.push({
                        ...action.payload,
                        quantity: action.payload.quantity || 1,
                        total: action.payload.price,
                    });
                }

                // After adding the item, update the RegisteredCustomer array
                state.RegisteredCustomer = state.RegisteredCustomer.map((user) =>
                    user.profile.email === state.ActiveUsers.profile.email
                        ? { ...user, cart: state.ActiveUsers.cart } // Update the cart in RegisteredCustomer
                        : user
                );
            }
        },
        removeCart: (state, action) => {
            if (state.ActiveUsers) {
                state.ActiveUsers.cart = state.ActiveUsers.cart.filter(
                    (product) => product.id !== action.payload.id
                );
            }
        }, pluscart: (state, action) => {
            if (state.ActiveUsers) {
                const item = state.ActiveUsers.cart.find(
                    (product) => product.id === action.payload.id
                );
                if (item) {
                    item.quantity += 1; // Increment quantity
                    item.total = item.price * item.quantity; // Recalculate total
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null; // Reset error on pending state
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Updated to 'succeeded' instead of 'success'
                state.isLoading = false;
                state.productData = action.payload; // Store the fetched products
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch products'; // Store the error message
            });
    },
});

export const { addToCart, removeCart, pluscart, addUser, logout } = bazzarSlice.actions;

// Configure the Redux store

const persitStorage = {
    key: 'root',
    storage,
    whitelist: ['bazzar']
};

const rootReducer = combineReducers({
    bazzar: bazzarSlice.reducer
});
const persistreducer = persistReducer(persitStorage, rootReducer);

let store = configureStore({
    reducer: persistreducer
});

export const persistor = persistStore(store);

export default store;