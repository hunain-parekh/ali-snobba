import "./productDetails.css";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const param = useParams();
  useEffect(() => {
    fetch("http://localhost:8080/api/product/" + param.productID)
      .then((response) => response.json())
      .then((result) => setItem(result));
  }, [param.productID]);

  const [quantity, setQuantity] = useState(1);

  const decreaseQunatity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQunatity = () => {
    setQuantity(quantity + 1);
  };

  const handleCart = () => {
    const data = {
      productId: item.id,
      quantity: quantity,
      totalPrice: quantity * item.price,
    };
    fetch("http://localhost:8081/api/cart", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        navigate("/cart");
      }
    });
  };

  return (
    <div className="product-details-main">
      <div className="product-details">
        <div className="image-div">
          <img src={item.imageLink} alt={item.name} />
        </div>
        <div className="details-div">
          <h1>{item.name}</h1>
          <p className="longDesc">{item.longDesc}</p>
          <h4>Price : Rs. {item.price ? item.price.toLocaleString() : null}</h4>
          <div className="quantity">
            <button onClick={decreaseQunatity}>-</button>
            <p>{quantity}</p>
            <button onClick={increaseQunatity}>+</button>
          </div>
          <div className="add-to-cart-div">
            <Button className="btn-primary" onClick={handleCart}>
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
