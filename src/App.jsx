import './App.css'
import Stripe from 'stripe';
import Navbar from './components/navbar'
import Home from './components/home'
import ProductCard from './pages/product'
import ShoppingCart from './pages/cart'
import Checkout from './pages/stripe'
import Login from './pages/login'
import Register from './pages/register'
import Cart from './pages/gottenData'
import AddProductForm from './pages/addProductForm'
import FileStack from './components/filestack'
import MyProducts from './pages/myProduct'

import ShoppingPage from './pages/searchPage'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, ScrollRestoration } from 'react-router-dom'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/test' element={<Cart />} />
        <Route path='/stripe' element={<Checkout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/:id' element={<ProductCard />} />
        <Route path='cart' element={<ShoppingCart />} />
        <Route path='/login' element={<Login />} />
        <Route path='shop' element={<ShoppingPage />} />
        <Route path='personal' element={<MyProducts />} />
        <Route path='/addForm' element={<AddProductForm />} />
        <Route path='/stack' element={<FileStack />} />
      </Route>
    )
  )

  return (<>
    <RouterProvider router={router} /></>

  )
}

export default App
