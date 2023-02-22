import { useEffect, useState } from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Loader from "./pages/Loader/Loader";
import Main from "./pages/Main/Main";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductList from "./pages/ProductList/ProductList";
import Thanks from "./pages/Thanks/Thanks";

function App() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });
  return (
    <div className="App">
      {loader ? <Loader /> :
      <BrowserRouter>
        <Routes>
          <Route to="/" element={<Main />}>
                <Route index element={<ProductList/>}></Route>
                <Route path="/details/:productID" element={<ProductDetails/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
          </Route>
          <Route path="/thanks" element={<Thanks/>}></Route>
        </Routes>
      </BrowserRouter>
      }
    </div>
  );
}

export default App;
