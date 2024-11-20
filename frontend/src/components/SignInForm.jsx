import React from 'react'
import { useState } from 'react';
import Input from './InputField';
import { CircleUser } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { initializeSocket } from '../socket/socket.client';
import userStore from '../store/userStore';
const SignInForm = () => {
  const queryClient = new QueryClient();
  const {setUser} = userStore() ;
  const { user } = userStore() ;  
   const {mutate , isPending , isError ,error} = useMutation({
    mutationKey:'signIn',
    mutationFn: async (form) => {

      try {
        const response = await axios.post('/api/auth/signIn', form) ;
        initializeSocket(response.data.user._id) ; 
        console.log(response) ;
        if(response.status === 200) {
          toast.success(response.data.message || "login success") ;
          setUser(response.data.user) ;  
          console.log(user) ; 
        }
        return response.data.message ;
      } catch (error) {
        console.error(error) ;
        toast.error(error.response.data.message || "login failed") ;
      }
    }
  });

  const [form,setForm] = useState(() => {
    return {
      username: '',
      password: ''   
    }
  });

  const changeState = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }
  const loading  = false ; 
  const handleSubmit = (e) => {
    e.preventDefault() ;
    mutate(form) ;
    setForm({ username: '', password: '' }) ;
  }

  return (
    <form className='flex items-center justify-center flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col justify-between'>
        <label htmlFor='username' className='font-medium text-center'>Username</label>
        <Input
          type='string'
          name='username'
          id='username'
          autoComplete='email'
          value={form.username}
          onChange={(e) => changeState(e)}
          required
          placeholder='Enter your username'
          icon={CircleUser}
        />
        </div>
        <div className='flex justify-between flex-col'>
                <label htmlFor='password' className='font-medium text-center'>Password</label>
        <Input
          type='password'
          name='password'
          id='password'
          autoComplete='password'
          value={form.password}
          onChange={(e) => changeState(e)}
          required
          placeholder='Enter your password'
          icon={LockKeyhole}
        />

        <button disabled={loading} className="btn btn-active btn-secondary transition-all hover:outline-2 hover:outline-pink-500 duration-300 bg-red-200">{loading ? (<span className='loading loading-spinner loading-md'/>) : 'Login'  } </button>
      </div>

    </form>
  )
}

export default SignInForm