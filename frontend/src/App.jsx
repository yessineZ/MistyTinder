import { Routes , Route, Navigate } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage' ; 
import AuthPage from './pages/AuthPage' ;
import ProfilePage from './pages/ProfilePage' ;
import ChatPage from './pages/ChatPage' ;
import userStore from './store/userStore';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
function App() {
  const { getMe , user , isLoading } = userStore() ; 
  useEffect(() => {
      const getTheUser = async () => {
        await getMe() ;
      }
      getTheUser() ; 
      console.log(user) ;
  },[]);

  if(isLoading) {
    return (
    <div className='flex items-center justify-center'> 
      <LoadingSpinner />
    </div>
     ) ;  
  }

  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
      <Routes>
        <Route path="/" element={user ? <HomePage/> : <Navigate to={'/auth'}/> } > </Route>
        <Route path='/auth' element={!user ? <AuthPage/> : <Navigate to={'/'}></Navigate>} ></Route>
        <Route path='/profile' element={user ? <ProfilePage/> : <Navigate to={'/auth'}/>}></Route>
        <Route path='/chat/:id' element={user ? <ChatPage/> : <Navigate to={'/auth'}/>}></Route>
        <Route path='/chat'></Route>
      </Routes>

    </div>
  )
}

export default App
