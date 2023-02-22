import Button from "../../components/Button/Button";
import CartProduct from "../../components/CartProduct/CartProduct";
import './cart.css';
const Cart=()=>{
    return(
        <div className="cart-products">
            <CartProduct/>
            <CartProduct/>
            <CartProduct/>
            <hr className="line"/>
            <div className="cart-bottom">
                <h3>Total Price : Price : Rs. 684,750,000</h3>
                <div className="buttons">
                    <Button className="btn-secondary">RETURN TO SHOPPING</Button>
                    <Button className="btn-primary">CHECKOUT</Button>
                </div>
            </div>
        </div>
    );
}
export default Cart;