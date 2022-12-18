import auth from "../firebase";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export function registerToFirebase (userData, stateMethods, signup, page, userDefaultImage) {
    stateMethods.setIsAuthenticating(true);
    console.log(userDefaultImage);
    signup(userData, "researcher")
    .then((userCredential) => {
        stateMethods.setError(null);
        stateMethods.setIsAuthenticating(false);
        console.log(userData.displayName);
        updateProfile(auth.currentUser, {
            displayName: userData.displayName, photoURL: userDefaultImage
        }).then(() => {
            stateMethods.setPage(page + 1);
        }).catch((error) => {
            stateMethods.setError(error.message);
        });
    })
    .catch((err) => {
        stateMethods.setIsAuthenticating(false);
        switch (err.message) {
            case "EMAIL_EXISTS":
                stateMethods.setError("The email address is already in use by another account.")
                break;
            case "OPERATION_NOT_ALLOWED":
                stateMethods.setError("Password sign-in is disabled for this project.")
                break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                stateMethods.setError("We have blocked all requests from this device due to unusual activity. Try again later.")
                break;
            case "INVALID_EMAIL":
                stateMethods.setError("Email is invalid.")
                break;
            default:
                stateMethods.setError(err.message);
                break;
        }
      });
}
/// save user data on our database
export function insertUserData(userData,stateMethods) {
    stateMethods.setIsLoading(true);
    // fetch('https://react-project-dff24-default-rtdb.firebaseio.com/researchers.json', {
    fetch('http://localhost:8001/api/v1/researchers', {
        method: 'POST',
        body: JSON.stringify({
            displayName: userData.displayName,
            email: userData.email,
            bio: userData.bio,
            profession: userData.profession,
            nationality: userData.nationality,
            title: userData.title,
            password: userData.password,
            gender: userData.gender,
            photoURL: userData.photoURL,
            organization: userData.organization,
            uid: userData.uid,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if(res.ok){
            stateMethods.setError(null);
            return res.json();
        }else{
            return res.json().then((data) => {
                let errorMessage = 'Authentication failed!';
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
            });
        }
    })
    .then((data) => { // if successful
        userData = {
            id: data.name,
            ...userData,
        }
        stateMethods.setIsLoading(false);
    })
    .catch((err) => {
        deleteFromFirebase(userData.email);
        stateMethods.setIsLoading(false);
        stateMethods.setError(err.message);
    });
}

// called if a user (email and password) is registered on firebase and error occured when saving user data on db
export function deleteFromFirebase (token) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDqOpu9QpdCaQSmo3dJSLMkJ5BO_fhqHv8';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            idToken: token,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then((data) => {
                let errorMessage = 'Deletion failed!';
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
            });
        }
    })
    .then((data) => { // if successfull
            // history.replace('/');
    })
    .catch((err) => {
        console.log(err);
    });
}
// login handler
export function loginUser(userData, stateMethods, login, history) {
    stateMethods.setIsAuthenticating(true);
    login(userData.email,userData.password, "researcher")
    .then((userCredential) => {
        stateMethods.setError(null);
        stateMethods.setIsAuthenticating(false);
    })
    .then((data) => { // if successfull
        history.push('/');
        stateMethods.setIsAuthenticating(false);
    })
    .catch((err) => {
        stateMethods.setIsAuthenticating(false);
        switch (err.message) {
            case "EMAIL_NOT_FOUND":
                stateMethods.setError("There is no user record corresponding to this identifier.")
                break;
            case "INVALID_PASSWORD":
                stateMethods.setError("The password is invalid.")
                break;
            case "USER_DISABLED":
                stateMethods.setError("The user account has been disabled by an administrator.")
                break;
            default:
                stateMethods.setError(err.message);
                break;
        }
    });
}
export function updateProfilePicture(userData, stateMethods, url, history) {
    updateProfile(auth.currentUser, {
        photoURL: url
    }).then(() => {
        console.log(userData);
        insertUserData({...userData, uid:auth.currentUser.uid, photoURL:url}, stateMethods);
    }).then(() => {
        //create empty user chats on firestore
        setDoc(doc(db, "userChats", auth.currentUser.uid), {});
        // history.push('/');
    }).catch((error) => {
        stateMethods.setError(error.message);
    });
}