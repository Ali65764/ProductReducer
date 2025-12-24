import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"
import DetailProduct from "./pages/DetailProduct"
import Favourite from "./pages/Favourite"
import Basket from "./pages/Basket"
import React from "react"
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detailproduct/:id" element={<DetailProduct/>}/>
        <Route path="/favourite" element={<Favourite/>}/>
        <Route path="/basket" element={<Basket/>}/>
      </Routes>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App
