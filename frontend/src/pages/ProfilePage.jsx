import React, { useRef, useState } from 'react'
import {Header} from '../components/Header'
import userStore from '../store/userStore'
import Input from '../components/InputField';
import { Edit } from 'lucide-react';
import GenderCheckbox from '../components/GenderCheckbox';
import GenderPreferenceCheckbox from '../components/GenderPreferenceCheckbox';
import LoadingSpinner from '../components/LoadingSpinner';
const ProfilePage = () => {
  const { user , updateUser , isLoading }  = userStore()  ;

  const [updateUserForm,setUpdateUserForm] = useState(() => {
    return {
      username: user.username || "" ,
      email: user.email || "" ,
      bio: user.bio || "" ,
      gender: user.gender || "" ,
      genderPreference: user.genderPreference || "" ,
      image : user.image || "" ,
      age: user.age || "" ,
    }
  });

  console.log(updateUserForm) ; 

  const fileInputRef = useRef(null) ;
  const [image,setImage] = useState("") ; 
  
  const handleSubmit = (e) => {
    e.preventDefault() ; 
    updateUser(updateUserForm) ; 
  }

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
         setUpdateUserForm({...updateUserForm , image :reader.result});
      };
      reader.readAsDataURL(file);
    }
  };
  if(isLoading) return <div className='flex min-h-screen items-center justify-center mt-auto' ><LoadingSpinner/></div>  ; 

  return (

    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header/>
      <div className='flex-grown flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-2xl font-bold text-gray-900'>Profile</h2>
        </div>
<form onSubmit={handleSubmit}>
        <div className='relative mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='group/img  absolute left-2 top-2 border-4 rounded-full bg-gray-500 w-16 h-16'>
            <img className='object-cover rounded-full ' src={user.image || "/imagePlaceHolder.jpg"}></img>
            <Edit className='absolute group-hover/img:opacity-100 opacity-0 sm:opacity-100  top-1 right-2 text-black w-4'
            onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              hidden
              onChange={(e) => {handleImgChange(e)}} />
          </div>
          <div className='bg-white py-10 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200'> 
           <span className='text-left text-gray-500 sm:text-sm'>username</span>
           <Input
           style="sm:text-sm"
            type="text"
            value={updateUserForm.username}
            placeholder="Name"
            onChange={(e) => setUpdateUserForm({...updateUserForm, username: e.target.value })}
           /> 
            <span className='text-left text-gray-500 sm:text-sm'>email</span>  {/* image */}
            <Input
            style="sm:text-sm"
            type="email"
            value={updateUserForm.email}
            placeholder="Email"
            onChange={(e) => setUpdateUserForm({...updateUserForm, email: e.target.value })}>
            </Input>
           
            <span className='text-left text-gray-500 sm:text-sm'>Bio</span>
            <textarea value={updateUserForm.bio} onChange={(e) => setUpdateUserForm({...updateUser,bio : e.target.value})} className="textarea bg-white w-full textarea-secondary" placeholder="Bio"></textarea>


             <span className='text-left text-gray-500 sm:text-sm'>Your Gender</span>
            <GenderCheckbox
              form={updateUserForm}
              setForm={setUpdateUserForm}
            />
                        <span className='text-left text-gray-500 sm:text-sm'>Gender Preference</span>
            <GenderPreferenceCheckbox
              form={updateUserForm}
              setForm={setUpdateUserForm}
            />
            <div className='w-full py-2'>
              <button className="btn btn-outline btn-secondary w-full">update</button>
            </div>
          
          </div>
        </div>
    </form>

      </div>

      <div>

      </div>
    
    </div>
    
  )
}

export default ProfilePage ; 