import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import toast from "react-hot-toast";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const DataContext = createContext("");

const provider = new GoogleAuthProvider();

type User = {
  email: string;
  uid: string;
};

export function DataContextProvider(props: React.PropsWithChildren) {
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

  // Inicializa Firestore y obtén una referencia a la base de datos
  const db = getFirestore(app);

  const auth = getAuth();

  const [user, setUser] = useState<User>({ email: "", uid: "" });
  const [user_logged, setUser_logged] = useState<null | boolean>(null);
  const [error, setError] = useState(null);
  const [loading_auth, setLoading_auth] = useState(false);
  const [user_data, setUser_data] = useState({});
  const [db_document_id, setDb_document_id] = useState("");
  const [loading_reset_password, setLoading_reset_password] = useState(false);
  const [reset_success, setReset_success] = useState(false);

  async function create_user(
    email: string,
    password: string,
    full_name: string
  ) {
    setLoading_auth(true);

    if (auth) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User created successfully:", userCredential.user);
          setLoading_auth(false);
          setUser_logged(true);
          create_user_data(full_name, userCredential.user.uid);
        })
        .catch((error) => {
          console.error("Error Code:", error.code);
          console.error("Error Message:", error.message);
          setError(error);
          setLoading_auth(false);
        });
    }
  }

  async function login_user(email: string, password: string) {
    setLoading_auth(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        setLoading_auth(false);
        setUser_logged(true);
        console.log(user);
      })
      .catch((error) => {
        setLoading_auth(false);
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

  function reset_password(email: string) {
    setLoading_reset_password(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("Password reset email sent!");
        setLoading_reset_password(false);
        toast.success("Password reset email sent!");
        setReset_success(true);
      })
      .catch((error) => {
        console.log("Error Message:", error.message);
        // ..
      });
  }

  function firebase_create_new_password(
    actionCode: string,
    newPassword: string
  ) {
    setLoading_reset_password(true);
    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        console.log("Código ha sido condifmardo.");
        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.

        confirmPasswordReset(auth, actionCode, newPassword)
          .then((resp) => {
            console.log("Contraseña actualizada");
            setLoading_reset_password(false);
            toast.success("Password successfully changed");
            setReset_success(true);
          })
          .catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
            console.log("Error Message:", error.message);
            setLoading_reset_password(false);
          });
      })
      .catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        console.log("Error Message:", error.message);
        setLoading_reset_password(false);
      });
  }

  function delete_user() {
    setLoading_auth(true);
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        // User deleted.
        setLoading_auth(false);
        setUser_logged(false);
        console.log("User deleted.");
        toast("User deleted");
      })
      .catch((error) => {
        console.log("Error Message:", error.message);
        // An error ocurred
        // ...
      });
  }

  function getUserData() {
    console.log(user);
    const users_collection = collection(db, "users_data");
    const q = query(users_collection, where("UID", "==", user?.uid));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() es un objeto con los datos del documento
          console.log(doc.data());
          setDb_document_id(doc.id);
          setUser_data(doc.data());
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  async function edit_user_data(new_name: string) {
    try {
      // Add a new document in collection "cities"
      await setDoc(
        doc(db, "users_data", db_document_id),
        {
          full_name: new_name,
        },
        { merge: true }
      );
      setUser_data({ full_name: new_name, UID: user.uid });
      console.log("Document successfully written!");
      toast.success("Field updated");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function create_user_data(new_name: string, user_uid: string) {
    console.log(user);
    try {
      // Add a new document in collection "cities"
      await addDoc(collection(db, "users_data"), {
        full_name: new_name,
        UID: user_uid,
      });
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function google_sign_in() {
    try {
      signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setUser(result.user);

        const users_collection = collection(db, "users_data");
        const q = query(users_collection, where("UID", "==", result.user?.uid));

        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() es un objeto con los datos del documento
              console.log(doc.data());
              setDb_document_id(doc.id);
            });
            if (querySnapshot.size > 0) {
              console.log("User already exists");
            } else {
              create_user_data(result.user.displayName, result.user.uid);
              setUser_data({
                full_name: result.user.displayName,
                UID: result.user.uid,
              });
            }
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });

        setUser_logged(true);
      });
    } catch (error) {
      console.error("Unexpected error: ", error);
    }
  }

  return (
    <DataContext.Provider
      value={{
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
        reset_password,
        firebase_create_new_password,
        delete_user,
        getUserData,
        user_data,
        setUser_data,
        db_document_id,
        edit_user_data,
        setUser,
        create_user_data,
        loading_reset_password,
        google_sign_in,
        reset_success,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
