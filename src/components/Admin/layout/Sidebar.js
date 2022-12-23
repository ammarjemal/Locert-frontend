import React from 'react'
import { BlockquoteLeft, Person, BoxArrowLeft } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../store/auth-context';
import bg from '../../../assets/admin-bg.jpg';
import illustrationSmall from '../../../assets/Illustration-small.svg';
import { useAdminAuth } from '../../../store/admin-context';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const { adminLogout } = useAdminAuth();

  return (
    <div className='max-w-[300px] sticky top-0 h-screen' style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <div className='pt-5 h-full w-full flex flex-col justify-between bg-clip-padding bg-opacity-80 bg-slate-100' style={{backdropFilter: `blur(20px)`}}>
        <div className='flex flex-col items-center justify-center'>
            <img src={currentUser.photoURL} alt='Not found' className='mt-2 ring-1 ring-gray-200 rounded-full w-20 h-20 object-cover'/>
            <h2 className='px-2 mt-3 font-bold text-2xl text-center'>
              Welcome, {currentUser.displayName}
            </h2>
        </div>
        <ul className='mt-6 w-full pl-3 text-gray-700 '>
          <li className="my-2 pb-2 border-b border-gray-300">
            <NavLink to='/admin/articles' activeClassName="text-sky-500" className="hover:text-sky-600">
              <span className='flex items-center'>
                <BlockquoteLeft className='mr-2 h-5 w-5'/>Articles
              </span>
            </NavLink>
          </li>
          <li className="my-2 pb-2 border-b border-gray-300">
            <NavLink to='/admin/researchers' activeClassName="text-sky-500" className="hover:text-sky-600">
              <span className='flex items-center'>
                <Person className='mr-2 h-5 w-5'/>Researchers
              </span>
            </NavLink>
          </li>
          <li className="my-2 pb-2 border-b border-gray-300">
            <button onClick={adminLogout} className="hover:text-sky-600">
              <span className='flex items-center'>
                <BoxArrowLeft className='mr-2 h-5 w-5'/>Logout
              </span>
            </button>
          </li>
        </ul>
        <img src={illustrationSmall} alt=''/>
      </div>
    </div>
  )
}

export default Sidebar;