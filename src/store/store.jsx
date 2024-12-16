import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { db } from "../api/api";
import { addDoc, collection, getDoc, setDoc } from "firebase/firestore";
import storage from "redux-persist/lib/storage"; // Correct import
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";


let dbinstance = collection(db, 'product')

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
)
async function setDb(instance, data) {
    try {
        const docRef = await addDoc(instance, data); // Add new document
        return docRef.id; // Return document ID if needed
    } catch (error) {
        console.error("Error adding document:", error);
        throw error;
    }
}
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

            const existingUser = state.RegisteredCustomer.find(
                (user) => user.profile.email === email
            );

            if (existingUser) {
                // Update authentication status for existing user
                const updatedUser = { ...existingUser, isAuthenticated: true };
                state.RegisteredCustomer = state.RegisteredCustomer.map((user) =>
                    user.profile.email === updatedUser.profile.email ? updatedUser : user
                );
                state.ActiveUsers = updatedUser;
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
                setDb(dbinstance, newUser);
            }

            // Write the ActiveUsers data to Firestore
        },
        logout: (state) => {
            state.ActiveUsers = null; // Clear the active user session
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

                // After updating the cart, write to Firestore
                setDb(dbinstance, state.ActiveUsers, state.ActiveUsers.profile.email);
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
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Avoid warnings with non-serializable data
        }),
});
export const persistor = persistStore(store);

export default store;