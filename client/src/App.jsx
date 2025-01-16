import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/productlist";
import AddProduct from "./components/addproduct";
import UpdateProduct from "./components/updateproduct";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./components/login";
import SignUpPage from "./components/register";


function App() {
 const [products,setproducts]=useState([])


const fetch=()=>{
  axios.get("http://localhost:2200/api/product/getall")
.then((response)=>{
  console.log(response.data)
  setproducts(response.data)
}).catch((error)=>{
  throw error
})
}
useEffect(()=>{
  fetch()
},[])
  return <div>
    <Router>
   <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/list" element={<ProductList products={products} fetch={fetch} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/add" element={<AddProduct fetch={fetch}/>} />
          <Route path="/update" element={<UpdateProduct fetch={fetch}/>}/>          
      </Routes>
      </Router>
  </div>;
}

export default App;
