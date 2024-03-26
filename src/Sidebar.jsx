import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { RiArrowDropDownLine } from "react-icons/ri";


function Sidebar() {
    
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const [isAuthVisible, setIsAuthVisible] = useState(false);

    const toggleAuthVisibility = () => {
      setIsAuthVisible(!isAuthVisible);
    };
  return (
        <aside id="sidebar" className={`${isExpanded ? 'expand' : ''}`}>
            <div className="d-flex">
                <button className="toggle-btn" type="button" onClick={handleToggle}>
                    <i className="lni lni-grid-alt"></i>
                </button>
                <div className="sidebar-logo">
                    <Link to=''>E Basket</Link>
                </div>
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <Link to='/admin' className="sidebar-link">
                        <i className="lni lni-user"></i>
                        <span>Profile</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/user'  className="sidebar-link" >
                        <i className="lni lni-agenda"></i>
                        <span>Customer Management</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/product-list' className="sidebar-link">
                        <i className="lni lni-agenda"></i>
                        <span>Product Management</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/category' className="sidebar-link">
                        <i className="lni lni-agenda"></i>
                        <span>Category Management </span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/Inventary' className="sidebar-link">
                        <i className="lni lni-agenda"></i>
                        <span>Inventory Management </span>
                    </Link>
                </li>
                
                {/* <li className="sidebar-item">
                    <Link  className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="lni lni-protection"></i>
                        <span>Auth</span>
                    </Link>
                    <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <Link  className="sidebar-link">Login</Link>
                        </li>
                        <li className="sidebar-item">
                            <Link  className="sidebar-link">Register</Link>
                        </li>
                    </ul>
                </li>  */}

                <li className="sidebar-item ">
                    <Link  className="sidebar-link " onClick={toggleAuthVisibility}>
                        <i className="lni lni-protection"></i>
                        <span className=''>Auth </span>
                        <RiArrowDropDownLine className='inline' />
                    </Link>
                    {
                       isAuthVisible && (
                        <ul id="auth" className="" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <Link className="sidebar-link">Login</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link">Register</Link>
                            </li>
                        </ul>
                       ) 
                    }
                    
                </li> 
                {/* <li className="sidebar-item text-white">
                    <Link>
                        <i className="lni lni-protection"></i>
                        <span onClick={toggleAuthVisibility}>Auth</span>
                    </Link>
                    {isAuthVisible && (
                        <ul id='auth'>
                        <li className="sidebar-link">Option 1</li>
                        <li className="sidebar-link">Option 2</li>
                       
                        </ul>
                    )}
                </li>   */}


                {/* <li className="sidebar-item">
                    <Link href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                        <i className="lni lni-layout"></i>
                        <span>Multi Level</span>
                    </Link>
                    <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <Link href="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                                data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                Two Links
                            </Link>
                            <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                <li className="sidebar-item">
                                    <Link href="#" className="sidebar-link">Link 1</Link>
                                </li>
                                <li className="sidebar-item">
                                    <Link href="#" className="sidebar-link">Link 2</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li> */}
                <li className="sidebar-item">
                    <Link href="#" className="sidebar-link">
                        <i className="lni lni-popup"></i>
                        <span>Notification</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link href="#" className="sidebar-link">
                        <i className="lni lni-cog"></i>
                        <span>Setting</span>
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <Link href="#" className="sidebar-link">
                    <i className="lni lni-exit"></i>
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
  )
}

export default Sidebar


// <aside id="sideba" classnameNameName="w-56 bg-[#2243] h-full ">
    //     <div classnameName='sidebar-title '>
    //         <div classnameName='sidebar-brand flex flex-row items-center p-2'>
    //             <BsCart3  className='icon_header '/> SHOP
    //         </div>
    //         <span className='icon close_icon' onClick={OpenSidebar}>X</span>
    //     </div>

    //     <ul className='sidebar-list'>
    //         <li className='sidebar-list-item'  >
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsGrid1X2Fill className='icon'/> Dashboard
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item' onClick={() => navigate('/user')}>
    //             <a href="" className='flex flex-row items-center  gap-1'>
    //                 <BsFillArchiveFill className='icon'/> User
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item'>
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsFillGrid3X3GapFill className='icon'/> Categories
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item' onClick={() => navigate('/profile')}>
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsPeopleFill className='icon'/> Profile
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item'>
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsListCheck className='icon'/> Inventory
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item'>
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsMenuButtonWideFill className='icon'/> Reports
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item'>
    //             <a href="" className='flex flex-row items-center'>
    //                 <BsFillGearFill className='icon'/> Setting
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item'>
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsFillGrid3X3GapFill className='icon'/> Categories
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item'>
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsFillGrid3X3GapFill className='icon'/> Categories
    //             </a>
    //         </li>
    //         <li className='sidebar-list-item'>
    //             <a href="" className='flex flex-row items-center gap-1'>
    //                 <BsFillGrid3X3GapFill className='icon'/> Categories
    //             </a>
    //         </li>
    //     </ul>
    // </aside>