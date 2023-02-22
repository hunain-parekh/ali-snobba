import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartProduct from "../../components/CartProduct/CartProduct";
import "./cart.css";
const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8081/api/cart/all")
      .then((response) => response.json())
      .then((result) => {
        setCartList(result);
    });
  }, []);
  const data =
    cartList.length !== 0
      ? cartList.map((item) => {
          return <CartProduct item={item} key={item.id} />;
        })
      : null;
  return (
    <div className="cart-products">
      {data}
      <hr className="line" />
      <div className="cart-bottom">
        <h3>Total Price : Rs. {total.toLocaleString()}</h3>
        <div className="buttons">
          <Link to="/">
            <Button className="btn-secondary">RETURN TO SHOPPING</Button>
          </Link>
          <Button className="btn-primary">CHECKOUT</Button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
