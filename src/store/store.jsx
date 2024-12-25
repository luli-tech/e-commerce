import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../api/api'; // Ensure this points to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import storage from 'redux-persist/lib/storage'; // For localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';


export const fetchProduct = createAsyncThunk('bazzar/fetchProduct', async () => {
    try {
        const productCollection = collection(db, "ProductData");
        const productSnapshot = await getDocs(productCollection);
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return productList;
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
});

export const selectCartForCurrentUser = (state) => {
    const { uid } = state.bazzar.profile;
    return state.bazzar.cart.filter((item) => item.uid === uid);
};


const persistConfig = {
    key: 'root',
    storage,
};

const initialState = {
    cart: [],
    general: [],
    publicProduct: null,
    profile: {
        name: '',
        email: '',
    },
    isLogedIn: false,
    productData: [],
    status: 'idle',
    error: null,
};


const bazzarSlice = createSlice({
    name: 'bazzar',
    initialState,
    reducers: {
        Log: (state, action) => {
            const { name, email, uid } = action.payload;
            state.profile.name = name;
            state.profile.email = email;
            state.profile.uid = uid;
            state.isLogedIn = true;

            // Retrieve the cart for the logged-in user
            const existingCart = state.general.find(user => user.id === uid);
            state.cart = existingCart ? existingCart.cart : [];
        },
        logout: (state) => {
            // Ensure state.general is initialized as an array
            if (!Array.isArray(state.general)) {
                state.general = [];
            }

            // Save the current cart for the logged-out user
            const existingIndex = state.general.findIndex(user => user.id === state.profile.uid);
            if (existingIndex !== -1) {
                // Update the existing cart
                state.general[existingIndex].cart = state.cart;
            } else {
                // Add a new entry to the general array
                state.general.push({
                    id: state.profile.uid,
                    email: state.profile.email,
                    cart: [...state.cart],
                    total: Number(state.cart.quantity) * Number(state.cart.price)
                });
            }

            // Clear user profile and cart
            state.profile = {
                name: '',
                email: '',
                uid: '',
            };
            state.isLogedIn = false;
            state.cart = [];
        },

        setProductData: (state, action) => {
            state.productData = action.payload;
        },

        addToCart: (state, action) => {
            if (!state.profile.email) {
                console.error("No user logged in.");
                return;
            }

            const product = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({ ...product, uid: state.profile.uid, quantity: product.quantity || 1 });
            }
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;
            let existingProduct = state.cart.find(product => product.id === id)
            if (existingProduct.quantity > 1) {
                existingProduct.quantity -= 1
            }
            else { state.cart = state.cart.filter(item => item.id !== id) }
        },

        clearCart: (state) => {
            state.cart = [];
        },
        updateProductQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const product = state.ActiveUsers.cart.find(item => item.id === productId);
            if (product) {
                product.quantity = quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.publicProduct = action.payload;
                state.productData = action.payload
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { Log, setProductData, addToCart, removeFromCart, clearCart, updateProductQuantity, CreateUser, logout } = bazzarSlice.actions;

const rootReducer = combineReducers({
    bazzar: bazzarSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
