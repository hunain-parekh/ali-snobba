import './cartProduct.css';

const CartProduct = () => {
  return (
    <div className="product-cart-item">
      <div className="product-cart-image">
        <img src="https://raw.githubusercontent.com/jeff-lent/Alisnobba/main/Capstone/LandYachtMotorHome.jpg" alt="hello"/>
      </div>
      <div className="product-cart-other">
        <h1>Ruby <span className='x'>X</span></h1>
        <h4>Price : Rs. 684,750,000</h4>
        <h4>Quantity : 2</h4>
        <h4>Total Price : Rs. 684,750,000</h4>
      </div>
    </div>
  );
};
export default CartProduct;
