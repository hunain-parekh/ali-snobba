import { Icon } from '@iconify/react';
import './navbar.css';
import logo from '../img/logo.png';

const Navbar = ()=>{
    return(
        <nav className='navbar'>
            <div className="logo-div">
                <img src={logo} alt='logo'/>
            </div>
            <div className="cart-icon-div">
                <Icon icon="material-symbols:shopping-cart" className='cart-icon'/>
            </div>
        </nav>
    );
}
export default Navbar;