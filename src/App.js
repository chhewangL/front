import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import RootLayout from './components/RootLayout'
import SignUpForm from './pages/SignUpForm'
import LoginForm from './pages/LoginForm'
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './pages/adminPages/ProductList'
import AddProduct from './pages/adminPages/AddProduct'
import RouteUser from './components/RouteUser'
import EditProduct from './pages/adminPages/EditProduct'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RootLayout />} >
          <Route index element={<HomePage />} />
          <Route element={<RouteUser />}>
            <Route path='/signup' element={<SignUpForm />} />
            <Route path='/login' element={<LoginForm />} />
          </Route>
          <Route path='/product' element={<ProductList />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/editProduct/:id' element={<EditProduct />} />

        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose={1500} position='top-right' />

    </div>
  )
}

export default App