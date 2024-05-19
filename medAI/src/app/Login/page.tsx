"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import firebaseApp from '../../firebase/credentials';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function Login() {
  //const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in with Google: ", user);
      //router.push('/Login');
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{isRegistering ? "Sign Up" : "Log In"}</h1>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign In with Google
        </button>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-4 w-full py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {isRegistering ? "I have an account" : "Create account"}
        </button>
      </div>
    </div>
  );
}

export default Login;
