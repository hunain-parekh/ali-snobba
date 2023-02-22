import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartProduct from "../../components/CartProduct/CartProduct";
import "./cart.css";
const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    let t = 0;
    fetch("http://localhost:8081/api/cart/all")
      .then((response) => response.json())
      .then((result) => {
        setCartList(result);
        result.forEach(element => {
          t+=element.totalPrice;
          setTotal(t);
        });
    });
  }, []);

  const deleteItem=(item)=>{
    setCartList(prev=>prev.filter((prevItem)=> prevItem.id !== item.id));
    setTotal(prev=> prev-=item.totalPrice);
  } 

  const data =
    cartList.length !== 0
      ? cartList.map((item) => {
          return <CartProduct item={item} key={item.id} deleteItem={deleteItem}/>;
        })
      : null;
  return (
    <div className="cart-products">
      {data != null ? data : <h1>No Products In Cart</h1>}
      <hr className="line" />
      <div className="cart-bottom">
        <h3>Total Price : Rs. {total.toLocaleString()}</h3>
        <div className="buttons">
          <Link to="/">
            <Button className="btn-secondary">RETURN TO SHOPPING</Button>
          </Link>
          {cartList.length !== 0 ? <Button className="btn-primary">CHECKOUT</Button> : null}
        </div>
      </div>
    </div>
  );
};
export default Cart;
