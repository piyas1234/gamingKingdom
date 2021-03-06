import firebase from 'firebase/app';
import { AddAuthUser } from '../../../Redux/Action/AuthAction';

export const firebaseConfig = {
  apiKey: 'AIzaSyCnKWRW6MW4B35_wiZeI_RW7siHJjxjnLU',
  authDomain: 'gamming-kingdom.firebaseapp.com',
  projectId: 'gamming-kingdom',
  storageBucket: 'gamming-kingdom.appspot.com',
  messagingSenderId: '559093233974',
  appId: '1:559093233974:web:d31183675159bfa4501b97',
  measurementId: 'G-ZV79MTNRZ6',
};

export const socialLoin = (
  provider,
  setlogin,
  goHistotyPage,
  seterrMsg,
  dispatch
) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      setlogin(user);
      sessionStorage.setItem('isLoggedin', true);
      dispatch(AddAuthUser(user));
      goHistotyPage();
    })
    .catch((error) => {
      const errorMessage = error.message;
      seterrMsg(errorMessage);
    });
};

export const emailLogin = (
  setlogin,
  goHistotyPage,
  email,
  password,
  seterrMsg,
  dispatch
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setlogin(user);
      sessionStorage.setItem('isLoggedin', true);
      sessionStorage.setItem('displayName', user.displayName);
      sessionStorage.setItem('email', user.email);
      dispatch(AddAuthUser(user));
      goHistotyPage();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      seterrMsg(errorMessage);
    });
};

export const emailSignup = (
  setlogin,
  goHistotyPage,
  name,
  email,
  password,
  seterrMsg,
  dispatch
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      setlogin(user);
      sessionStorage.setItem('isLoggedin', true);
      dispatch(AddAuthUser(user));
      goHistotyPage();
      user
        .updateProfile({
          displayName: name,
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
          const errorMessage = error.message;
          seterrMsg(errorMessage);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      seterrMsg(errorMessage);
      // ..
    });
};
