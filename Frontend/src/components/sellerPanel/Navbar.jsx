import React from 'react'
import { Link } from 'react-router-dom'
// import logo from '../../assets/nameLogo.svg'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-400/30'>
        {/* <Link to={'/seller'} >
            <img src={logo} alt="logo" className='w-40 h-auto' />
        </Link> */}
        <div className='text-xl font-medium text-gray-500'>ApanaStore</div>
        <div className='flex items-center gap-2'>
            <div className='w-10 h-10'>
                <img className='w-full h-full object-cover rounded-full' src="https://wallpapers.com/images/hd/professional-profile-pictures-1080-x-1080-460wjhrkbwdcp1ig.jpg" alt="name" />
            </div>
            <div className='flex flex-col items-start'>
                <h1 className='text-lg font-medium'>Kamalesh Roy</h1>
                <p className='font-medium text-[10px] text-gray-400 -mt-1'>Product Designer</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar