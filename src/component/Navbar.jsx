import { NavLink } from 'react-router-dom';
import logo from '../../public/images/logo.png'


const Navbar = () =>{
    return(
        <div className='w-full h-full overflow-hidden border m-0 p-0 bg-[#f8f9fa] '>
            <div className='w-full mx-auto h-24  flex flex-row justify-between  items-center border px-4'>
                <div className='w-32 '>
                    <p className='text-3xl font-bold'>EBasket</p>
                    {/* <img src={logo} alt="" /> */}
                </div>
                <ul className='flex flex-row gap-6 px-10'>
                    <li>Home</li>
                    <li>How it works</li>
                    <li>Why EBasket</li>
                    <li>Range</li>
                    <li>Guarantees</li>
                    <li>Contact Us</li>
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;