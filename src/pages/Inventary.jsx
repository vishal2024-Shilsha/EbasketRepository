import React, { useEffect ,useState} from 'react'
import './Inventary.css';
import { useDispatch,useSelector } from 'react-redux';
import { getProductData} from '../slices/ProductSlice';
import { FaEdit } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import InventoryModel from '../component/InventoryModel';


const Inventary = () => {
    const [status,setStatus] = useState('');
    const [pageNum,setPageNum] = useState(0);
    const [filter,setFilter] = useState(false);
    const search = useSelector((state) => state?.product?.searchData)
    const productData = useSelector((state) => state?.product?.subData?.data?.content);
    const totalPages = useSelector((state) => state?.product?.subData?.data?.totalPages)
    const [showPopup,setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const [productId,setProductId] = useState(null);

    useEffect(()=>{
        dispatch(getProductData({number : pageNum ,search: search,status:status,filter:filter}))
    },[filter])

    const handlePageClick = (pageNumber) => {
        setPageNum(pageNumber.selected);
        dispatch(getProductData({ number: pageNumber.selected ,search: search,status:status,filter:filter}));
    };

    const handleEdit = (id) =>{
        setShowPopup(true);
        setProductId(id)
    }
  return (
    <div className='ml-[260px] h-full bg-[#f5f7fb]'>
        {showPopup && <InventoryModel setShowPopup={setShowPopup} productId={productId} pageNum={pageNum} search={search} status={status} filter={filter} />}
        <div className='w-full'>
            <h2 className='w-[86%] mx-auto font-semibold text-[#214770]  text-center p-1 pt-2 text-xl'> Inventory Management Table</h2>
            <div className='h-[31rem]'>
                <div className='w-[86%] mx-auto'>
                    <label className='text-lg font-medium' htmlFor="select">Select</label>
                    <select className='mx-2 px-3 bg-[#214770] text-white' id='select' onChange={(e) => setFilter(e.target.value)}>
                        <option value='false'>All Product</option>
                        <option value='true'>Min. product</option>
                    </select>
                </div>
                <table className="table border   border-[#0e2238]  w-[86%]  mx-auto">
                    <thead>
                    <tr className='text-white bg-[#214770]'>
                        <th className='' scope="col">Product Name</th>
                        <th className=' widt' scope='col'>Quantity</th>
                        <th className=' widt' scope="col ">Price</th>
                        <th className=' widt' scope="col">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                        productData?.map((data,index) =>(
                            <tr key={index} className={data?.quantity < 10 ? 'color' : ''}>
                            <td className='px-3'>{data?.productName}</td>
                            <td className='px-4'>{data?.quantity}</td>
                            <td className='px-3'>{data?.price}</td>
                            <td className={data?.quantity < 10 ? 'color text-xl' :`text-[#214770] text-xl` } onClick={() => handleEdit(data?.id)}><FaEdit/></td>
                            </tr>
                        ))  
                        }
                    </tbody>
                </table>
            </div>
            
            <div className='text-center'>
                <ReactPaginate className='flex gap-3 border-2 m- bg-[#214770] text-white p-2 justify-center'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                activeClassName='active'
            /></div>
        </div>
    </div>
  )
}

export default Inventary