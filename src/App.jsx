import './App.css'
import Navbar from './components/navbar'
import Home from './components/home'
import ProductCard from './pages/product'
import ShoppingCart from './pages/cart'
import Login from './pages/login'
import AddProductForm from './pages/addProductForm'

import ShoppingPage from './pages/searchPage'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, ScrollRestoration } from 'react-router-dom'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/:id' element={<ProductCard />} />
        <Route path='cart' element={<ShoppingCart />} />
        <Route path='/login' element={<Login />} />
        <Route path='shop' element={<ShoppingPage />} />
        <Route path='/addForm' element={<AddProductForm />} />
      </Route>
    )
  )

  return (<>
    <RouterProvider router={router} /></>

  )
}

export default App
