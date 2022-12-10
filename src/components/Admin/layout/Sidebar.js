import React from 'react'
import { BlockquoteLeft, Person } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../store/auth-context';

const Sidebar = () => {
  const { currentUser } = useAuth();
  return (
    <div className='pt-5 min-w-[300px] sticky top-0 bg-slate-100 h-screen'>
      <div className='flex flex-col items-center justify-center'>
          <img src={currentUser.photoURL} alt='Not found' className='mt-2 ring-1 ring-gray-200 rounded-full w-20 h-20'/>
          <h2 className='mt-3 font-bold text-2xl text-center'>
            Welcome, {currentUser.displayName}
          </h2>
      </div>
      <ul className='mt-6 w-full pl-3 text-gray-700 '>
        <li className="my-2 pb-2 border-b">
          <NavLink to='/admin/articles' activeClassName="text-sky-500" className="hover:text-sky-600">
            <span className='flex items-center'>
              <BlockquoteLeft className='mr-2 h-5 w-5'/>Articles
            </span>
          </NavLink>
        </li>
        <li className="my-2 pb-2 border-b">
          <NavLink to='/admin/researchers' activeClassName="text-sky-500" className="hover:text-sky-600">
            <span className='flex items-center'>
              <Person className='mr-2 h-5 w-5'/>Researchers
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;