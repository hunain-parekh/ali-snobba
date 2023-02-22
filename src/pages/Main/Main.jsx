import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Cart from "../Cart/Cart";
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductList from "../ProductList/ProductList";
import Thanks from "../Thanks/Thanks";

const Main = ()=>{
    return(
        <>
            <Navbar/>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductList/>}></Route>
                <Route path="/details/:productID" element={<ProductDetails/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/thanks" element={<Thanks/>}></Route>
            </Routes>
            </BrowserRouter>
        </>
    );
}
export default Main;