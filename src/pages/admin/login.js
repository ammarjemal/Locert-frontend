import React, { useState } from 'react'
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import bg from '../../assets/Illustration.svg';
import useInput from '../../hooks/use-input';
import Toast from '../../components/UI/Toast';
import Spinner from '../../components/UI/Spinner';
import { useAuth } from '../../store/auth-context';
import { login } from '../../api/adminApi';
import { useAdminAuth } from '../../store/admin-context';
import { useHistory, Link } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';

const AdminPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, currentUser } = useAuth();
  const { adminLogin } = useAdminAuth();
  const history = useHistory();

  const {
    value: password,
    isInvalid: passwordIsInValid,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(value => value.trim() !== '');
  
  const loginHandler = async (e) => {
    e.preventDefault();
    if(password === ''){
      setError("Please enter your admin password");
      return;
    }
    if(!isLoggedIn){
      setError("Please login to your researcher account");
      return;
    }
    setIsLoading(true);
    await login(currentUser.uid, password, { setError, setIsLoading }, adminLogin, history)
  }
  return (
    <div className="min-h-screen flex flex-col justify-center" style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <div className="w-full h-screen flex items-center justify-center relative px-2 sm:px-4 py-10 bg-white sm:p-20 bg-clip-padding bg-opacity-70" style={{backdropFilter: `blur(20px)`}}>
        <Link to='/home' className='rounded-full p-2 absolute left-5 top-5 hover:text-rose-500 flex items-center'><House className='w-5 h-5 mr-2'/><span>Home</span></Link>
        <form onSubmit={loginHandler} className="flex flex-col p-3 w-[350px] sm:max-w-lg mx-auto">
          <h1 className='text-center text-2xl font-bold mb-8'>Admin Login</h1>
          <Input
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={password}
            isInValid={passwordIsInValid}
            className='bg-inherit border border-slate-400 focus:ring focus:border-none focus:ring-slate-400'
            id="password"
            type="text"
            variant="basic"
            placeholder="Admin password"
          />
          <div className='w-full flex justify-end'>
            <Button disabled={!passwordIsValid} className='w-full self-end'>{isLoading ? <Spinner/> : "Login"}</Button>
          </div>
        </form>
      </div>
      {error && <Toast show={true} type="error" setState={setError} message={error}/>}
    </div>
  )
}

export default AdminPage;