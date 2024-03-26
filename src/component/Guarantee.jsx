import bottleImg from '../../public/images/bottleImg.png';
import clockImg from '../../public/images/clockImg.png'


const Guarantee = () =>{
    return(
        <div  className="w-full h-full my-10 pt-12 pb-20 bg-[#a5ce3a]">
            <div className='w-2/3 mx-auto h-full flex flex-col gap-3 '>
                <div>
                    <h2 className='text-center text-3xl  font-semibold'>We Guarantee you</h2>
                    <div className='w-32 h-1 mt-3 p-1/2 rounded-2xl mx-auto bg-white'></div>
                </div>   
                <div className='w-7/12 mx-auto flex flex-row justify-center gap-10  text-center p-10'>
                    <div className='w-1/2 '>
                        <div className='w-32 mx-auto'>
                            <img className='w-full h-full' src={clockImg} alt='' />
                        </div>
                        <p>On-time every time guaranteed</p>
                    </div>
                    <div className='w-1/2 '>
                        <div className='w-32 mx-auto'>
                            <img className='w-full h-full'  src={bottleImg} alt='' />
                        </div>
                        <p>Freshness you can trust (100% safe & unadulterated milk)</p>
                    </div>
                </div>
                <p className='text-center text-lg font-medium'>*T&C Apply. EBasket service available only in selected societies</p>
            </div>
        </div>
    )
}
export default Guarantee;