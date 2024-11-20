import React from 'react'
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import { useState } from 'react';
const AuthPage = () => {
  const [isLogin,setIsLogin] = useState(true) ; 
  const changeState = (newState) => {
    setIsLogin(newState) ; 
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 via-pink-300 '>
        <div className='w-full max-w-md'>
            <h2 className='text-center text-3xl font-extrabold text-white mb-8'>
                {isLogin ? "Sign in to Swipe" : "Create a Swipe account"}
            </h2>

            <div className='bg-white shadow-xl rounded-lg p-8'>
                {isLogin ? <SignInForm/> : <SignUpForm /> }
            
            <div className='mt-4 text-center'>
              <p className='text-sm text-gray-600'>
                {isLogin ? "New To MistySwipe ? " : "Already have an account ?"}
              </p>
                    <button className='mt-2 text-red-600 hover:text-red-800 font-medium transition-colors   hover:opacity-95  duration-300' onClick={() => changeState(!isLogin)}>{isLogin ? "Login" : "SignUp"}</button>
            </div>
            
            </div>

            
        </div>
    </div>
  )
}

export default AuthPage ;