import React, { Fragment, useState } from 'react';
import { Dot, PersonDash, PersonCheck } from 'react-bootstrap-icons';
import Spinner from '../../UI/Spinner';
import { changeUserIsAdminStatus, changeUserIsBannedStatus } from '../../../api/adminApi';
const ResearcherItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  const [isBanned, setIsBanned] = useState(props.isBanned);
  const [error, setError] = useState(null);
  const { disableAll, setDisableAll, setSuccess, setAllResearchers, setBasicResearchers, setBannedResearchers, setAdmins, basicResearchers, bannedResearchers, admins, allResearchers  } = props;
  
  const onPromoteToAdminClickHandler = async () => {
    setIsLoading2(true);
    setDisableAll(true);
    await changeUserIsAdminStatus(props.id, true, { setError, setIsLoading2 });
    let existingItemIndex = allResearchers.findIndex(item => item.id === props.id);
    if(allResearchers[existingItemIndex]){
         // updating articles under the All tab
         setAllResearchers(allResearchers.map(researcher => {
          if(researcher.id === props.id) {
              return { ...researcher, isAdmin: true };
          } else {
              return researcher;
          }
      }));
      // updating isAdmin and adding researcher to the Admins tab
      setAdmins([...admins, {...allResearchers[existingItemIndex], isAdmin: true}]);
    }
    // removing researcher from Researchers tab
    existingItemIndex = basicResearchers.findIndex(item => item.id === props.id);
    if(basicResearchers[existingItemIndex]){
        const updatedResearchers = basicResearchers.filter(researcher => researcher.id !== props.id);
        setBasicResearchers(updatedResearchers);
    }
    setDisableAll(false);
  }
  const onRemoveFromAdminClickHandler = async () => {
    setIsLoading2(true);
    setDisableAll(true);
    await changeUserIsAdminStatus(props.id, false, { setError, setIsLoading2 });
    let existingItemIndex = allResearchers.findIndex(item => item.id === props.id);
    if(allResearchers[existingItemIndex]){
      // updating researchers under the All tab
      setAllResearchers(allResearchers.map(researcher => {
        if (researcher.id === props.id) {
            return { ...researcher, isAdmin: false };
        } else {
            return researcher;
        }
      }));
      // updating isAdmin and adding researcher to the Researchers tab
      setBasicResearchers([...basicResearchers, {...allResearchers[existingItemIndex], isAdmin: false}]);
    }
    // removing researcher from Admins tab
    existingItemIndex = admins.findIndex(item => item.id === props.id);
    if(admins[existingItemIndex]){
      const updatedResearchers = admins.filter(researcher => researcher.id !== props.id);
      setAdmins(updatedResearchers);
    }
    setDisableAll(false);
  }
  const onBanClickHandler = async () => {
    setIsLoading(true);
    setDisableAll(true);
    await changeUserIsBannedStatus(props.id, true, { setError, setIsLoading });
    if(true){
      setIsBanned(true);
    }
    let existingItemIndex = allResearchers.findIndex(item => item.id === props.id);
    if(allResearchers[existingItemIndex]){
      // updating researchers under the All tab
      setAllResearchers(allResearchers.map(researcher => {
        if (researcher.id === props.id) {
          return { ...researcher, isBanned: true };
        } else {
          return researcher;
        }
      }));
      // updating isBanned and adding researcher to the Banned tab
      setBannedResearchers([...bannedResearchers, {...allResearchers[existingItemIndex], isBanned: true}]);
    }
    existingItemIndex = basicResearchers.findIndex(item => item.id === props.id);
    if(basicResearchers[existingItemIndex]){
      const updatedResearchers = basicResearchers.filter(researcher => researcher.id !== props.id);
      setBasicResearchers(updatedResearchers);
    }
    setDisableAll(false);
  }
  const onReleaseClickHandler = async () => {
    setIsLoading(true);
    setDisableAll(true);
    await changeUserIsBannedStatus(props.id, false, { setError, setIsLoading });
    let existingItemIndex = allResearchers.findIndex(item => item.id === props.id);
    if(allResearchers[existingItemIndex]){
      // updating researchers under the All tab
      setAllResearchers(allResearchers.map(researcher => {
        if (researcher.id === props.id) {
          return { ...researcher, isBanned: false };
        } else {
          return researcher;
        }
      }));
      // updating isBanned and adding researcher to the Researchers tab
      setBasicResearchers([...basicResearchers, {...allResearchers[existingItemIndex], isBanned: false}]);
    }
    existingItemIndex = bannedResearchers.findIndex(item => item.id === props.id);
    if(bannedResearchers[existingItemIndex]){
      const updatedResearchers = bannedResearchers.filter(researcher => researcher.id !== props.id);
      setBannedResearchers(updatedResearchers);
    }
    setDisableAll(false);
  }
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const date = new Date(props.joinedAt);
  return (
    <div className={`user w-full border-b py-5`}>
      <div className="flex items-center">
        <img src={props.photoURL} alt="User profile" className={`w-8 h-8 rounded-full object-cover`}/>
        <div className="flex flex-col text-sm ml-2">
          <span className="font-semibold flex items-center">
            {props.displayName}
            {props.isBanned &&
              <Fragment>
                <Dot className='mr-1 w-5 h-5'/>
                <span className='status text-rose-500 flex items-center font-semibold'>
                  {/* Status (banned: true/false) */}
                  <span className='rounded-xl'>Banned</span>
                </span>
              </Fragment>
            }
          </span>
          <span className="text-xs">
            Member since {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}
          </span>
        </div>
      </div>
      <div className="flex mt-2 pt-2 items-center justify-between text-sm"> 
        {!props.isAdmin  && ((props.isBanned) ?
          <button disabled={disableAll} onClick={onReleaseClickHandler} className='disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-700 px-2 py-1 rounded-lg disabled:cursor-not-allowed'>
              {isLoading ? <Spinner className="w-4 h-4 mr-1 text-inherit" type="main"/> : <PersonCheck className='mr-1'/>}Unban
          </button>
        :
          <button disabled={disableAll} onClick={onBanClickHandler} className='disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center justify-self-end bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg disabled:cursor-not-allowed'>
              {isLoading ?
                <Spinner className="w-4 h-4 mr-1 text-inherit" type="main"/>
              :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 bi bi-person-slash" viewBox="0 0 16 16">
                  <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                </svg>
              }Ban
          </button>)
        }

        {!props.isBanned && ((props.isAdmin) ?
          <button disabled={disableAll} onClick={onRemoveFromAdminClickHandler} className='disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center bg-rose-100 border border-rose-300 hover:bg-rose-200 text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg disabled:cursor-not-allowed'>
            {isLoading2 ? <Spinner className="w-4 h-4 mr-1 group-disabled:text-gray-400" type="main"/> : <PersonDash className='w-4 h-4 mr-1'/>}Remove from admin
          </button>
        :
          <button disabled={disableAll} onClick={onPromoteToAdminClickHandler} className='disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-700 px-2 py-1 rounded-lg disabled:cursor-not-allowed'>
              {isLoading2 ? <Spinner className="w-4 h-4 mr-1 text-emerald-600 group-disabled:text-gray-400" type="main"/> : <PersonCheck className='mr-1'/>}Promote to admin
          </button>)
        }
         
      </div>
    </div>
  )
}

export default ResearcherItem;