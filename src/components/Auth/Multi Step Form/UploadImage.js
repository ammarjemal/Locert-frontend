import React, { useRef, useState } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "../../UI/Button";
import { Trash3, Plus } from "react-bootstrap-icons";
import Spinner from "../../UI/Spinner";
import { useHistory } from 'react-router-dom';
import { updateProfilePicture } from "../../../api/authApi";
import { useAuth } from "../../../store/auth-context";
import Toast from "../../UI/Toast";

const UploadImage = (props) => {
  const { userDefaultImage } = props;
  const { currentUser } = useAuth();
  const history = useHistory();
  const [url, setUrl] = useState(userDefaultImage);
  const [isLoading,setIsLoading]=useState(false);
  const [profileChanged,setProfileChanged]=useState(false);
  const [error,setError]=useState(null);
  const fileInput = useRef();
  const uploadImageHandler = (event) => {
    if (event.target.files[0]){
      setIsLoading(true);
      const imageRef = ref(storage, `profile images/profile-${currentUser && currentUser.uid}.jpg`);
      uploadBytes(imageRef, event.target.files[0])
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setIsLoading(false);
            setUrl(url);
            setProfileChanged(true);
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error.message);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
    }
  }
  const handleSubmit = (e) => {
    updateProfilePicture(props.formData, {setError,setIsLoading}, url, history);
  };
  const deleteHandler = (e) => {
    setUrl(userDefaultImage);
    setProfileChanged(false);
  };

  return (
    <div>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
      <div className="flex flex-col items-center">
        <img alt="Not found" className="object-cover ring-2 ring-slate-300 w-24 h-24 rounded-full" src={url || userDefaultImage} />
        {profileChanged &&
          <button onClick={deleteHandler} type="button" className="mt-1 w-7 h-7 flex justify-center items-center text-white rounded-full bg-rose-500 hover:bg-rose-600">
            <Trash3/>
          </button>
        }
        <input
          type="file"
          name="myImage"
          ref={fileInput}
          hidden
          onChange={uploadImageHandler}
        />
        <button className="mt-2 w-7 h-7 flex justify-center items-center ring-1 ring-slate-300 text-slate-500 hover:text-slate-600 rounded-full shadow-md hover:shadow-lg" 
          type="button"
          disabled={isLoading}
          onClick={()=>{fileInput.current.click()}}>
          {isLoading ? <Spinner type="main"/> : <Plus className="w-10 h-10"/>}
        </button>
      </div>
      <div className="mt-3 w-full flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit}>
            Finish
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;