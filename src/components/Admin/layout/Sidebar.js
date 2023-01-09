import React, { useState, Fragment } from 'react'
import { BlockquoteLeft, Person, BoxArrowLeft, List, Magic, House } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../store/auth-context';
import bg from '../../../assets/admin-bg.jpg';
import illustrationSmall from '../../../assets/Illustration-small.svg';
import { useAdminAuth } from '../../../store/admin-context';
import { Key } from 'react-bootstrap-icons';
import { generatePassword } from "../../../extras/extra-functions";
import { updatePassword } from '../../../api/adminApi';
import Toast from '../../UI/Toast';
import Modal from '../../UI/Modal';
import Spinner from '../../UI/Spinner';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import { useMediaQuery } from 'react-responsive';
import { Dialog, Transition } from '@headlessui/react';
import useInput from '../../../hooks/use-input';
import { Confirm } from '../../UI/Confirm';

const Sidebar = (props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isConfirmLogoutShown, setIsConfirmLogoutShown] = useState(false);
  const { currentUser } = useAuth();
  const { adminLogout } = useAdminAuth();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { sidebarShown, setSidebarShown } = props;
  const isMobile = useMediaQuery({ query: `(max-width: 640px)` });

  const generatePasswordHandler = () => {
    const newPassword = generatePassword();
    newPasswordChangeHandler(newPassword);
  }
  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updated = await updatePassword(newPassword, currentUser.uid, { setError, setIsLoading, setSuccess });
    if(updated){
      setIsModalShown(false);
    }
  }
  const toggleModal = async (e) => {
    setIsModalShown(!isModalShown);
  }
  const onConfirmLogoutHandler = () => {
    setSidebarShown(false);
    setIsConfirmLogoutShown(false);
    adminLogout();
  }
  const {
    value: newPassword,
    isInvalid: newPasswordIsInValid,
    isValid: newPasswordIsValid,
    inputChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
  } = useInput(value => value.trim() !== '' && value.length >= 6);

  const sidebar =
    <div className={`z-10 sm:z-0 sm:block w-full max-w-full sm:w-[300px] sm:sticky top-0 h-screen`} style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <div className='sm:pt-5 h-full w-full flex flex-col justify-between bg-clip-padding bg-opacity-80 bg-slate-100' style={{backdropFilter: `blur(20px)`}}>
        <button onClick={() => setSidebarShown(!sidebarShown)} className="sm:hidden ml-3 mt-3"><List className="w-6 h-6"/></button>
        <div className='flex flex-col items-center justify-center'>
            <img src={currentUser.photoURL} alt='Not found' className='mt-2 ring-1 ring-gray-200 rounded-full w-20 h-20 object-cover'/>
            <h2 className='px-2 mt-3 font-bold text-2xl text-center'>
              Welcome, {currentUser.displayName}
            </h2>
        </div>
        <ul className='mt-6 w-full pl-3 text-gray-700 '>
          <li className="my-2 pb-2 border-b border-gray-300">
            <NavLink to='/home' exact activeClassName="text-blue-500" onClick={() => {setSidebarShown(false)}} className="hover:text-blue-600">
              <span className='flex items-center'>
                <House className='mr-2 h-5 w-5'/>Home
              </span>
            </NavLink>
          </li>
          <li className="my-2 pb-2 border-b border-gray-300">
            <NavLink to='/admin/articles' activeClassName="text-blue-500" onClick={() => {setSidebarShown(false)}} className="hover:text-blue-600">
              <span className='flex items-center'>
                <BlockquoteLeft className='mr-2 h-5 w-5'/>Articles
              </span>
            </NavLink>
          </li>
          <li className="my-2 pb-2 border-b border-gray-300">
            <NavLink to='/admin/researchers' activeClassName="text-blue-500" onClick={() => {setSidebarShown(false)}} className="hover:text-blue-600">
              <span className='flex items-center'>
                <Person className='mr-2 h-5 w-5'/>Researchers
              </span>
            </NavLink>
          </li>
          <li className="my-2 pb-2 border-b border-gray-300">
            <NavLink to='/admin/predictions' activeClassName="text-blue-500" onClick={() => {setSidebarShown(false)}} className="hover:text-blue-600">
              <span className='flex items-center'>
                <Magic className='mr-2 h-5 w-5'/>Predictions
              </span>
            </NavLink>
          </li>
          <li className="my-2 pb-2 border-b border-gray-300">
            <button type='button' onClick={() => {toggleModal(); setSidebarShown(false);}} className='hover:text-blue-600 w-full'>
              <span className='flex items-center'>
                <Key className='mr-2 h-5 w-5'/>Change password
              </span>
            </button>
          </li>
          <li className="my-2 pb-2 border-b border-gray-300">
            <button onClick={() => {setIsConfirmLogoutShown(true);}} className="hover:text-blue-600 w-full">
              <span className='flex items-center'>
                <BoxArrowLeft className='mr-2 h-5 w-5'/>Logout
              </span>
            </button>
          </li>
        </ul>
        <img src={illustrationSmall} alt=''/>
      </div>
    </div>
  return (
    <div>
      {isConfirmLogoutShown && <Confirm confirmButtonText="Logout" confirmTitle="Logout" onClick={onConfirmLogoutHandler} onCancel={() => {setIsConfirmLogoutShown(false)}}>Are you sure you want to logout?</Confirm>}
      <Transition appear show={sidebarShown} as={Fragment}>
        <Dialog as="div" className={`relative z-10`} onClose={() => setSidebarShown(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="-left-full"
            enterTo="-left-0"
            leave="ease-in duration-100"
            leaveFrom="-left-0"
            leaveTo="-left-full"
          >
            <Dialog.Panel className={`fixed sm:absolute inset-0 w-full max-w-md transform overflow-hidden transition-all`}>
              {isMobile && sidebar}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {!isMobile && sidebar}
      <Modal headerIsShown={true} modalHeight="h-[210px] sm:h-[230px]" isShown={isModalShown} hideModal={toggleModal} modalTitle={`Change password`}>
        <form onSubmit={updatePasswordHandler} className="flex flex-col sm:p-3 sm:max-w-lg mx-auto">
          <div className={`px-1 sm:p-3 flex flex-col items-center relative text-zinc-700 ml-0`}>
            <Input
              onChange={newPasswordChangeHandler}
              onBlur={newPasswordBlurHandler}
              value={newPassword}
              isInValid={newPasswordIsInValid}
              className='w-full bg-inherit border border-slate-400 focus:ring focus:border-none focus:ring-slate-400'
              id="new-password"
              type="text"
              variant="password"
              placeholder="New admin password"
            >
              <button onClick={generatePasswordHandler} type="button" className="text-sm mx-1 sm:mx-2">Generate</button>
            </Input>
            <Button disabled={!newPasswordIsValid} className='w-full self-end'>{isLoading ? <Spinner/> : "Update"}</Button>
          </div>
        </form>
      </Modal>
      {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
    </div>
  )
}

export default Sidebar;