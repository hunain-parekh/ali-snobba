import { useEffect, useState } from 'react';
import './cartProduct.css';

const CartProduct = (props) => {
  const [product,setProduct] = useState({});
  useEffect(()=>{
    fetch("http://localhost:8080/api/product/"+props.item.productId).then((response)=>response.json()).then((result)=>setProduct(result));
  },[props.item.productId]);
  return (
    <div className="product-cart-item">
      <div className="product-cart-image">
        <img src={product.imageLink} alt={product.name}/>
      </div>
      <div className="product-cart-other">
        <h1>Ruby <span className='x'>X</span></h1>
        <h4>Price : Rs. {product.price ? product.price.toLocaleString() : null}</h4>
        <h4>Quantity : {props.item.quantity}</h4>
        <h4>Total Price : Rs. {props.item.totalPrice.toLocaleString()}</h4>
      </div>
    </div>
  );
};
export default CartProduct;
