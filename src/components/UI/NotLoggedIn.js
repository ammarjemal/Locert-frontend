import React from 'react'
import { Link } from 'react-router-dom'
import NotLoggedInImg from "../assests/NotLoggedIn.svg";

export default function NotLoggedIn() {
  return (
    <div className='w-full justify-center text-center flex flex-col items-center mt-10'>
        {/* <div className='bg-gray-200 w-2/3 text-center flex flex-col items-center'> */}
            <img className='w-5/6 sm:w-2/3 md:w-2/5' src={NotLoggedInImg} alt="Not logged in"/>
            <h1 className='mt-12 font-bold text-lg'>Please <Link to="/login" className='text-rose-500'>Login</Link> to your account or <Link to="/signup" className='text-rose-500'>Signup</Link> to create one</h1>
        {/* </div> */}
    </div>
  )
}
