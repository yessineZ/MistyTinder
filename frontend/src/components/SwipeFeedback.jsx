import React from 'react'
import TinderCard from 'react-tinder-card' ; 
import { useMatchStore } from '../store/useMatchStore'
const SwipeFeedback = () => {
    const { users} = useMatchStore() ; 
    return (
    <div className='relative w-full max-w-sm h-[28rem]'>
        {users.map((user) => {
            <TinderCard 
            className="absolute shadow-none"
            onSwipe={(dir) => console.log(dir)}
            swipeRequirementType='position'
            swipeThreshold={100}
            preventSwipe={['up', 'down']}
            key={user._id}
            
            />
        })}
    </div>
  )
}

export default SwipeFeedback ; 