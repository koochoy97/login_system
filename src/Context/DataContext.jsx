import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const DataContext = createContext("");

export function DataContextProvider(props) {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDFezDC5DErhy2vsg-zClyhiin1sTihZi8",
    authDomain: "auth-f1f04.firebaseapp.com",
    projectId: "auth-f1f04",
    storageBucket: "auth-f1f04.firebasestorage.app",
    messagingSenderId: "264154527368",
    appId: "1:264154527368:web:d7e117ece5c851e12dd13d",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const test = "hola";

  const auth = getAuth();

  const [user, setUser] = useState({});
  const [user_logged, setUser_logged] = useState(null);
  const [error, setError] = useState(null);
  const [loading_auth, setLoading_auth] = useState(false);

  async function create_user(email, password) {
    setLoading_auth(true);

    if (auth) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User created successfully:", userCredential.user);
          setLoading_auth(false);
          setUser_logged(true);
        })
        .catch((error) => {
          console.error("Error Code:", error.code);
          console.error("Error Message:", error.message);
          setError(error);
          setLoading_auth(false);
        });
    }
  }

  async function login_user(email, password) {
    setLoading_auth(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        setLoading_auth(false);
        setUser_logged(true);
      })
      .catch((error) => {
        setLoading_auth(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error Message:", error.message);
        setError(error);
      });
  }

  function check_user() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("User is signed in");
        const uid = user.uid;
        setUser(user);
        setUser_logged(true);
        // ...
      } else {
        // User is signed out
        // ...
        setUser_logged(false);
        console.log("User is signed out");
      }
    });
  }

  function log_out() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <DataContext.Provider
      value={{
        test,
        login_user,
        check_user,
        user,
        user_logged,
        log_out,
        loading_auth,
        setLoading_auth,
        create_user,
        error,
        setError,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
