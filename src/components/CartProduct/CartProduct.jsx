import { useEffect, useState } from "react";
import "./cartProduct.css";

const CartProduct = (props) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/api/product/" + props.item.productId)
      .then((response) => response.json())
      .then((result) => setProduct(result));
  }, [props.item.productId]);
  
  const deleteProduct = () => {
    fetch("http://localhost:8081/api/cart/" + props.item.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      props.deleteItem(props.item);
    });
  };
  return (
    <div className="product-cart-item">
      <div className="product-cart-image">
        <img src={product.imageLink} alt={product.name} />
      </div>
      <div className="product-cart-other">
        <div className="heading">
          <h1>{product.name}</h1>
          <h6 className="x" onClick={deleteProduct}>
            X
          </h6>
        </div>
        <h4>
          Price : Rs. {product.price ? product.price.toLocaleString() : null}
        </h4>
        <h4>Quantity : {props.item.quantity}</h4>
        <h4>Total Price : Rs. {props.item.totalPrice.toLocaleString()}</h4>
      </div>
    </div>
  );
};
export default CartProduct;
