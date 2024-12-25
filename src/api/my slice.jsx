import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { db } from "../api/api";
import { collection, setDoc, addDoc } from "firebase/firestore";
// Async action to fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);
export let dbinstance = collection(db, 'cart')

export async function newCart(value) {
    let res = await addDoc(dbinstance, value)
    return res
}

// Initial state
let initialState = {
    productData: [],
    cart: [],
    RegisteredCustomer: [],
    ActiveUsers: null,
    status: null,
    error: null,
    isLoading: false
};

// Create slice
let bazzarSlice = createSlice({
    name: 'bazzar',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { email, name, photoURL } = action.payload;
            const existingUser = state.RegisteredCustomer.find(
                (user) => user.profile.email === email
            );

            if (existingUser) {
                state.ActiveUsers = existingUser;
                state.successmessage = "Login success";
            } else {
                const newUser = {
                    profile: { email, name, photoURL },
                    cart: [],
                    isAuthenticated: true,
                };
                state.RegisteredCustomer.push(newUser);
                state.ActiveUsers = newUser;
                state.successmessage = "User registered and logged in";
            }
        },
        logout: (state) => {
            state.ActiveUsers = null;
        },
        addToCart: (state, action) => {
            if (state.ActiveUsers) {
                const existingItem = state.ActiveUsers.cart.find(
                    (item) => item.id === action.payload.id
                );

                if (existingItem) {
                    existingItem.quantity += action.payload.quantity || 1;
                    existingItem.total = existingItem.price * existingItem.quantity;
                } else {
                    state.ActiveUsers.cart.push({
                        ...action.payload,
                        quantity: action.payload.quantity || 1,
                        total: action.payload.price,
                    });
                }

                state.RegisteredCustomer = state.RegisteredCustomer.map((user) =>
                    user.profile.email === state.ActiveUsers.profile.email
                        ? { ...user, cart: state.ActiveUsers.cart }
                        : user
                );
            }
        }, addProduct: (state, action) => {
            // state.productData.push({ ...action.payload })
            newCart(dbinstance, { ...action.payload })
        },
        removeCart: (state, action) => {
            if (state.ActiveUsers) {
                state.ActiveUsers.cart = state.ActiveUsers.cart.filter(
                    (product) => product.id !== action.payload.id
                );
            }
        },
        pluscart: (state, action) => {
            if (state.ActiveUsers) {
                const item = state.ActiveUsers.cart.find(
                    (product) => product.id === action.payload.id
                );
                if (item) {
                    item.quantity += 1;
                    item.total = item.price * item.quantity;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoading = false;
                state.productData = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch products';
            });
    },
});

export const { addToCart, removeCart, pluscart, addUser, logout, addProduct } = bazzarSlice.actions;

// Persist configuration
const persistStorage = {
    key: 'root',
    storage,
    whitelist: ['bazzar']
};

const rootReducer = combineReducers({
    bazzar: bazzarSlice.reducer
});

const persistReducerConfig = persistReducer(persistStorage, rootReducer);

let store = configureStore({
    reducer: persistReducerConfig
});

export const persistor = persistStore(store);

export default store;
