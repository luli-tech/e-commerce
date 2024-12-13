import './App.css'
import Navbar from './components/navbar'
import Home from './components/home'
import ProductCard from './pages/product'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/:id' element={<ProductCard />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
