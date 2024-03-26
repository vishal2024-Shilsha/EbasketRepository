import img1 from '../../public/images/background.jpg';
import img2 from '../../public/images/new_banner.png';
import img3 from '../../public/images/Phone.png';
import img4 from '../../public/images/organicImg.jpg';
import check from '../../public/images/check.png';
import check2 from '../../public/images/check2.png';
import check3 from '../../public/images/check3.png';
import milkyBack from '../../public/images/milkyBackground.png'
import phone1 from '../../public/images/phone1.png'

const Content = () =>{
    return(
        <div className='w-full h-full'>
            <div style={{backgroundImage: `url(${img1})`}} className='w-full h-full bg-cover bg-center' >
                <div className='w-10/12 h-[33rem] flex flex-row mx-auto justify-between p-10'>
                    <div className='w-1/2 h-full p-5 pt-12'>
                        <img src={img2} alt='' />
                    </div>
                    <div className='w-96 h-full '>
                        <img className='w-full h-full' src={img3} alt='' />
                    </div>
                </div>
                <div>
                    <img src={img4} alt='' />
                </div>
            </div>

            {/* how it works */}

            <div>
                <h2 className='text-center text-3xl mt-10 font-bold'>How it works</h2>
                <div className='w-32 h-1 mt-3 p-1/2 rounded-2xl mx-auto bg-[#A3CC39]'></div>
                <div className='flex flex-row gap-4 w-10/12 h-full p-10 mx-auto'>
                    <img className='border w-[20rem] h-96' src={phone1} alt='' />
                    <img className='border w-[20rem] h-96' src={phone1} alt='' />
                    <img className='border w-[20rem] h-96' src={phone1} alt='' />
                </div>
            </div>

            {/* Why use bbdaily? */}

            <div style={{
                    backgroundImage: `url(${milkyBack})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }} className='mb-20 w-full h-full'>
                <h2 className='text-center text-3xl mt-10 font-bold'> Why use EBasket? </h2>
                <div className='w-32 h-1 mt-3 p-1/2 rounded-2xl mx-auto bg-[rgb(163,204,57)]'></div>
                <div className='w-10/12 h-full mx-auto flex flex-row justify-center gap-5  text-center py-20 text-sm font-medium'>
                    <div className=' w-1/3 flex flex-col items-center gap-2'>
                        <div className='w-20 mb-3'>
                            <img className='w-full h-full' src={check} alt='' />
                        </div>
                        <p>Convenience</p>
                        <p className=' text-xs font-medium'>Easy to use (Subscribe - pause & resume anytime)</p>
                    </div>
                    <div className='w-1/3  flex flex-col items-center gap-2'>
                        <div className='w-20 mb-3'>
                            <img className='w-full h-full' src={check2} alt='' />
                        </div>
                        <p>Choice</p>
                        <p className=' text-xs font-medium'>Wide range of milk + other daily essentials</p>
                    </div>
                    <div className='w-1/3 flex flex-col gap-7 items-center '>
                        <div className='w-32 mb-3'>
                            <img className='w-full h-full' src={check3} alt='' />
                        </div>
                        <p className=' text-xs font-medium'>No Minimum Order</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Content;