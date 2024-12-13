import './App.css'
import Navbar from './components/navbar'
import Home from './components/home'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
