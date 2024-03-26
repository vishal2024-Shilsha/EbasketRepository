import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, toggleStatus } from '../slices/UserSlice';
import ViewModel from '../component/ViewModel';
import './Userpage.css';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";


const Userpage = () => {
  const [filterData, setFilterData] = useState(''); 
  const [getId ,setId] = useState();
  const [showPopup,setShowPopup] =useState(false);
  const dispatch = useDispatch();
  const [pageNum,setPageNum] = useState(0);

  const SearchData = useSelector((state) => state?.product?.searchData)

  useEffect(() => {
    dispatch(fetchData({page:0 ,size:10 ,active:filterData , SearchData:SearchData}));
  }, [filterData,SearchData]);

  const handlePageClick = (pageNumber) => {
    setPageNum(pageNumber.selected);
    dispatch(fetchData({ page: pageNumber.selected, size: 10 ,active:filterData,SearchData:SearchData}));
  };

  const userdata = useSelector((state) => state?.user?.content?.data?.content);

  const totalPages = useSelector((state) => state?.user?.content?.data?.totalPages);

  
  const handleFilterChange = (e) => {
    console.log(e.target.value);
    setFilterData(e.target.value); 
  };

  const handleToggleStatus = (id) =>{
    dispatch(toggleStatus({id}));
    setTimeout(()=>{
      dispatch(fetchData({ page: pageNum, size: 10 ,active:filterData,SearchData:SearchData}));
    },1000)
  }
  
  return (
    <div className=' h-full content ml-[260px] bg-[#f5f7fb]'>
      {showPopup && ( 
         <ViewModel
          getId={getId}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        /> 
       )}
      <div className='p-2'>
        <div className='m-2  w-11/12 mx-auto '>
          <label className='text-lg font-medium' htmlFor="category ">Select Category </label>
          <select id='category' className='ml-2 px-1 bg-[#214770] text-white' onChange={handleFilterChange}>
            <option value=''>All</option>
            <option value='true'>Active User</option>
            <option value='false'>Inactive User</option>
          </select>
        </div>
        <div className='h-[29rem]'>
          <table className="table border  border-[#0e2238]  w-11/12 mx-auto">
            <thead>
              <tr className='text-white bg-[#214770]'>
                <th scope="col">UserId</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col col-email">email</th>
                <th scope="col">Mobile No</th>
                <th scope="col"> Details</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userdata?.map((data) => (
                <tr key={data?.id} >
                  <td>{data?.userId}</td>
                  <td>{data?.firstName}</td>
                  <td>{data?.lastName}</td>
                  <td className='col-email'>{data?.email}</td>
                  <td>{data?.mobileNo}</td>
                  <td className='text-[#214770] text-2xl text-center pl-3' onClick={() => [setId(data?.id) ,setShowPopup(true)]} > <Link to=''><FaEye /></Link></td>
                  <td className=''>  
                  <button
                  onClick={() => handleToggleStatus(data?.id)}        
                        className='w-full h-full flex justify-center items-center mt-1'
                        style={{
                          borderRadius: '50px',
                          padding: '2px',
                          width: '42px',
                          height: '16px',
                          backgroundColor: data?.active ? '#214770' : '#3B9EBF',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          position: 'relative',
                        }}
                      >
                    <div
                      style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: data?.active ? 'calc(100% - 25px)' : '5px',
                        transition: 'left 0.3s ease',
                      }}
                    >
                      {data?.active ? (
                        <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
                          <path
                            fill="#007700"
                            d="M9.217 17.024l-4.03-3.665a.751.751 0 0 1 1.042-1.085l3.282 2.983 8.155-9.108a.751.751 0 1 1 1.195.903l-8.888 9.964a.75.75 0 0 1-1.756-.992z"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 22 22" style={{ width: '90%', height: '90%',margin: '1px' }}>
                          {/* <path
                            fill="#cc0000"
                            d="M17.035 17.063l-8.151-8.086-8.14 8.086a.745.745 0 0 1-1.055-1.05l8.149-8.088-8.15-8.085a.75.75 0 1 1 1.055-1.05L12 7.88l8.157-8.098a.75.75 0 1 1 1.056 1.05L13.054 7.87l8.149 8.088a.745.745 0 0 1 0 1.05.738.738 0 0 1-.528.218.74.74 0 0 1-.527-.218z"
                          /> */}
                        </svg>
                      )}
                    </div>
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='text-center'>
        {/* {paginationButtons} */}
        <ReactPaginate className='flex gap-3 border-2 m- bg-[#214770] text-white p-2 justify-center'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName='active'
      />
        </div>
      </div>
    </div>
  )
}

export default Userpage;