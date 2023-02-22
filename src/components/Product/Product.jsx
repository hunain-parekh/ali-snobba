import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './product.css';

const Product = (props)=>{
    const [quantity,setQuantity] = useState(1);

    const decreaseQunatity=()=>{
        if(quantity > 1){
            setQuantity(quantity-1);
        }
    }

    const increaseQunatity=()=>{
        setQuantity(quantity+1);
    }
    return(
        <div className="product-item">
            <div className="product-image">
                <img src={props.item.imageLink} alt={props.item.name} />
            </div>
            <div className="product-other">
                <Link to={`details/${props.item.id}`} style={{textDecoration:'none'}}><h1>{props.item.name}</h1></Link>
                <p>{props.item.shortDesc}</p>
                <h4>Price : Rs. {props.item.price.toLocaleString()}</h4>
                <div className='quantity'>
                    <button onClick={decreaseQunatity}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increaseQunatity}>+</button>
                </div>
            </div>
            <div className="add-to-cart-div">
                <Button className="btn-primary">ADD TO CART</Button>
                
            </div>
        </div>
    );
}
export default Product;