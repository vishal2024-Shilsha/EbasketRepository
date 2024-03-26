import React,{useState,forwardRef, useEffect } from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
from 'react-icons/bs'
import 
{ BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDays } from "react-icons/fa6";
import './Home.css'
import { useDispatch,useSelector } from 'react-redux';
import { getAdminData } from './slices/AdminSlice';




function Home() {

    const [startDate, setStartDate] = useState(new Date());
    const [category,setCategory] = useState('Daily');

    // console.log("-->",startDate,category);
    const CustomInput = forwardRef(({ value, onClick }, ref)  => (
        <button className="custom-input flex flex-row gap-1" ref={ref} onClick={onClick}>
            <span className='border w-32  h-7 pt-0.5  bg-white'>{value}</span>
            <FaCalendarDays className='text-xl text-[#21216e]' />
        </button>
    ));

    let year = startDate.getFullYear();
    let month = startDate.getMonth() + 1;
    let day = startDate.getDate();
    const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getAdminData({formattedDate,category}))
    },[category,formattedDate])

    const customer = useSelector((state) => state?.admin?.adminData?.data?.registeredUser)
    const order = useSelector((state) => state?.admin?.adminData?.data?.orders)
    const subscription = useSelector((state) => state?.admin?.adminData?.data?.subscriptions)

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
    const handleDateChange = date => {
    setStartDate(date);
    };
      
  return (
    <main className='main-container  ml-[260px]'>
        <div className='main-title'>
            <div className='card-title'>
            <label>
            Select Date : &nbsp;
            </label>
            <DatePicker
            selected={startDate}
            className='text-blue-900'
            onChange={handleDateChange}
            customInput={<CustomInput />}
            />
            </div>
            <div className='card-title' >
                <label htmlFor='select'>
                    Select Category
                    <select className='mx-2 px-2' onChange={(e) => setCategory(e.target.value)}>
                        <option value='Daily' >Daily</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                    </select>
                </label>
            </div>
        </div>

        <div className='main-cards '>
            <div className='card '>
                <div className='card-inner '>
                    <h3 className='card-title'>Customer</h3>
                    <div className='my-custom-class'>
                        <BsFillArchiveFill className='card_icon '/>
                    </div>
                </div>
                <h1 className='card-number'>{customer}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='card-title'>Order</h3>
                    <div className='my-custom-class'>
                        <BsFillGrid3X3GapFill className='card_icon  '/>
                    </div>
                </div>
                <h1 className='card-number'>{order}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='card-title'>Subscriptions</h3>
                    <div className='my-custom-class'>
                        <BsPeopleFill className='card_icon  '/>
                    </div>
                </div>
                <h1 className='card-number'>{subscription}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3  className='card-title'>ALERTS</h3>
                    <div className='my-custom-class'>
                        <BsFillBellFill className='card_icon '/>
                    </div>
                </div>
                <h1 className='card-number'>42</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='card-title'>ALERTS</h3>
                    <div className='my-custom-class'>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                </div>
                <h1 className='card-number'>42</h1>
            </div>
            <div className='card shadow-sm'>
                <div className='card-inner'>
                    <h3 className='card-title'>ALERTS</h3>
                    <div className='my-custom-class'>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                </div>
                <h1 className='card-number'>42</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='card-title'>ALERTS</h3>
                    <div className='my-custom-class'>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                </div>
                <h1 className='card-number'>42</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='card-title'>ALERTS</h3>
                    <div className='my-custom-class'>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                </div>
                <h1 className='card-number'>42</h1>
            </div>
            
        </div>

        <div className='charts text-sm font-semibold'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </main>
  )
}

export default Home

