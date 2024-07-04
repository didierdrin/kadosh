// Primary NavBar  min-h-screen
import { FaBell, FaShoppingCart } from 'react-icons/fa';

const PrimaryNavbar = () => {
    return (
        <div className='h-[50px] p-5 flex flex-row items-center justify-between text-black bg-sky-50 text-sm'>
                <a href="/">Hi! Sign In</a>
                <a href="/">Register</a>
                <a href="/" className='hover:text-red-300'>Daily deals</a>
                <a href="/" className='hover:text-red-300'>Help & Contact</a>
                <a href="/" className="text-[14px] hover:text-red-300">Shipping to<br></br>22 KG 25 ST</a>
                <a href="/" className='hover:text-red-300'>Become a seller</a>
                <a href="/" className='hover:text-red-300'>Watchlist</a>
                <a href="/" className='hover:text-red-300'>My Kadosh</a>
                <FaBell className='hover:text-yellow-500' /> 
                <FaShoppingCart className='hove:text-yellow-500' />
        </div>
    );
};

export default PrimaryNavbar;