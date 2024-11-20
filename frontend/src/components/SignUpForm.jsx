import React, { useState } from 'react';
import Input from './InputField';
import GenderCheckbox from './GenderCheckbox';
import GenderPreferenceCheckbox from './GenderPreferenceCheckbox';
import { useMutation, QueryClient } from '@tanstack/react-query';
import userStore from '../store/userStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import { initializeSocket } from '../socket/socket.client';
const SignUpForm = () => {
  const queryClient = new QueryClient();
  const { setUser } = userStore() ;  
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    genderPreference: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const setChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const { mutate, isError, isPending } = useMutation({
  mutationKey: 'SignUp',
  mutationFn: async (form) => {
    console.log(isPending) ; 
    try {
      const response = await axios.post('/api/auth/signUp', form);
      if (response.status === 201) {
        setUser(response.data.user);
        toast.success(response.data.message);
        initializeSocket(response.data.user._id) ; 
        return response.data.user;
      } else {
        toast.error(response.data?.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error.message) ; 
        toast.error(response.data?.message || 'Registration failed');
    }
  },
});
  const handleSubmit =  (e) => {
    e.preventDefault();
    if(checkSamePassword(form) === false) {
      toast.error("Passwords do not match") ;
      return ;  
    }
    if(checkFields(form)) {
      mutate(form);
    }else {
      toast.error('All fields are required') ; 
    }
  };

  const checkFields = ({username,password,confirmPassword,age,gender,genderPreference,email}) => {
    if(!username || !password || !confirmPassword || !gender || !genderPreference || !email ) {
      return false ; 
    }
    return true ; 
  };

  const checkSamePassword = ({password,confirmPassword}) => {
    console.log(password,confirmPassword) ; 
    if(password !== confirmPassword) {
      return false ; 
    }
    return true ;
  }

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <label htmlFor="username" className="font-normal text-gray-600">
        Username
        <Input
          style="placeholder:font-bold"
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={setChange}
        />
      
      </label>

      <label htmlFor="email" className="font-normal text-gray-600">
        Email
        <Input
          style="placeholder:font-bold"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={setChange}
        />
      </label>

      <label htmlFor="age" className="font-normal text-gray-600">
        Age
        <Input
          style="placeholder:font-bold"
          id="age"
          name="age"
          placeholder="Age"
          type="number"
          onChange={setChange}
        />
      </label>

      <label htmlFor="password" className="font-normal text-gray-600">
        Password
        <Input
          style="placeholder:font-bold"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={setChange}
        />
      </label>

      <label htmlFor="confirmPassword" className="font-normal text-gray-600">
        Confirm Password
        <Input
          style="placeholder:font-bold"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          onChange={setChange}
        />
       
      </label>

      <p className="font-normal text-gray-600">Gender</p>
      <GenderCheckbox form={form} setForm={setForm} />

      <p className="font-normal text-gray-600">Gender Preference</p>
      <GenderPreferenceCheckbox form={form} setForm={setForm} />

      <button
        className="mt-4 w-1/3 h-2/6 bg-blue-500 text-white px-4 py-2 rounded-2xl"
        type="submit"
       
      >
        {isPending ? <LoadingSpinner /> : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
