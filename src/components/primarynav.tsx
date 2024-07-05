// Primary NavBar  min-h-screen
import { FaBell, FaShoppingCart, FaUser } from 'react-icons/fa';

const PrimaryNavbar = () => {
    return (
        <div className='h-[50px] p-5 flex flex-row items-center justify-between text-black bg-sky-50 text-sm'>
                <a href="/">Hey! <span className='hover:text-teal-500'>Sign in</span></a>
                <a href="/" className="hover:text-teal-500">Register</a>
                <a href="/" className='hover:text-teal-500'>Help & Contact</a>
                <a href="/" className="text-[14px] hover:text-teal-500">Shipping to<br></br>22 KG 25 ST</a>
                <a href="/" className='hover:text-teal-500'>Become a seller</a>
                <a href="/" className='hover:text-teal-500'>Watchlist</a>
                <a href="/" className='hover:text-teal-500'>My Kadosh</a>
                <FaBell className='text-lg hover:text-teal-500' /> 
                <FaShoppingCart className='text-lg hover:text-teal-500' />
                <FaUser className='text-lg hover:text-teal-500' /> 
        </div>
    );
};

export default PrimaryNavbar;