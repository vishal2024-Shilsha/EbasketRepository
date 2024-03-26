import React from 'react'
import Navbar from '../component/Navbar'
import Content from '../component/Content'
import Guarantee from '../component/Guarantee'
import Footer from '../component/Footer'

const HomePage = () => {
  return (
    <div className='overflow-hidden'>
        <Navbar/>
        <Content/>
        <Guarantee/>
        <Footer/>
    </div>
  )
}

export default HomePage