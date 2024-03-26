import footerImg from '../../public/images/footer1.png'
import appleImg from '../../public/images/Apple_Logo.png'
import playImg from '../../public/images/googlePlay.png';

const Footer = () =>{
    return(
        <div style={{backgroundImage: `url(${footerImg})`,backgroundSize: 'cover'}} className='w-full h-full p-10' >
            <div className='w-10/12 mx-auto flex flex-row text-sm text-white'>
                <div className='w-1/2 flex flex-row justify-around'>
                    <div className='flex flex-col gap-5'>
                        <p className=' font-bold text-sm'>Contact Us</p>
                        <ul>
                            <li>Ebasketsupport@Ebasket.com</li>
                            <li>+91-4637463477</li>
                            <li>+91-7483478374</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>FAQ</li>
                            <li>Privacy Policy</li>
                            <li>Contactless Delivery</li>
                            <li>Gourmet Store</li>
                            <li>bb new offers</li>
                            <li>Sales offers</li>
                            <li>Zero delivery charge hack</li>
                            <li>Milk Subscription digital</li>
                            <li>Auto recharge</li>
                        </ul>
                    </div>
                    
                </div>
                <div className='w-1/2 flex flex-row justify-around'>
                    <div className='flex flex-col gap-2'>
                        <p className=' font-bold text-sm'>Cities we serve</p>
                        <div className='flex flex-row gap-5'>
                            <ul>
                                <li>Ahmedabad</li>
                                <li>Bangalore</li>
                                <li>Chandigarh</li>
                                <li>Chennai</li>
                                <li>Delhi </li>
                                <li>Guntur</li>
                                <li>Gurgaon</li>
                                <li>Hyderabad</li>
                                <li>Indore</li>
                                <li>Kanpur</li>
                                <li></li>
                            </ul>
                            <ul>
                                <li>Kochi</li>
                                <li>Kolkata</li>
                                <li>Lucknow</li>
                                <li>Mumbai</li>
                                <li>Noida</li>
                                <li>Patna</li>
                                <li>Pune</li>
                                <li>Tricity</li>
                                <li>Vijayawada</li>
                                <li>Vishakhapatnam</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className='flex flex-col gap-5'>
                        <p className=' font-bold text-sm'> Download the Ebasket app </p>
                        <div className='flex flex-row'>
                            <div className='w-28 h-10'>
                                <img className='w-full h-full' src={playImg} alt='' />
                            </div>
                            <div className='w-28 h-10'>
                                <img className='w-full h-full' src={appleImg} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;