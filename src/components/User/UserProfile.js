import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '../UI/Button'
import { Award, Building, ChatDots, Envelope, FileEarmarkPerson, GenderAmbiguous, Globe, Person } from 'react-bootstrap-icons'
import { useAuth } from '../../store/auth-context'
export const UserProfile = (props) => {
    const iconClasses = 'mr-1';
    const { isLoggedIn } = useAuth();
    const history = useHistory();
    const chatClickHandler = () => {
        history.push({
            pathname: '/messages',
            state: { 
                user: {
                    uid: props.uid,
                    displayName: props.displayName,
                    photoURL: props.photoURL,
            } },
          });
    }
    return (
        <Fragment>
            {
                <div className='mt-5 w-full flex flex-col items-center'>
                    <img className="w-24 h-24 ring-1 ring-emerald-500 rounded-full object-cover" src={props.photoURL} alt='User profile'/>
                    <div className='mt-4 w-fit space-y-2'>
                        <p className='font-semibold flex items-center mt-1'><Person className={iconClasses}/>{props.displayName}</p>
                        <p className='flex items-center mt-1'><Envelope className={iconClasses}/><Link className='text-emerald-500' to={`mailto:${props.email}`}>{props.email}</Link></p>
                        <p className='font-semibold flex items-center mt-1'><GenderAmbiguous className={iconClasses}/>{props.gender}</p>
                        <p className='font-semibold flex items-center mt-1'><FileEarmarkPerson className={iconClasses}/>{props.bio}</p>
                        <p className='font-semibold flex items-center mt-1'><Award className={iconClasses}/>{props.profession}</p>
                        <p className='font-semibold flex items-center mt-1'><Building className={iconClasses}/>{props.organization}</p>
                        <p className='font-semibold flex items-center mt-1'><Globe className={iconClasses}/>{props.nationality}</p>
                        {isLoggedIn && <Button onClick={chatClickHandler} className='mt-4'><ChatDots className='mr-2'/> Chat with {props.displayName}</Button>}
                    </div>
                </div>
            }
        </Fragment>
    )
}
