import React from 'react'

import { useMatchStore } from '../store/useMatchStore'
import TinderCard from 'react-tinder-card';
const SwipeArea = () => {
    const { users , swipeUser} = useMatchStore() ; 
    console.log(...users) ; 
    const handleSwipe = (dir, user) => {
        swipeUser(dir,user) ; 
    } ;
    return (
    <div className='relative w-full max-w-sm h-[28rem]'>
        {users.map((user) => (
            <TinderCard 
            className="absolute shadow-none"
            onSwipe={(dir) => handleSwipe(dir,user)}
            swipeRequirementType='position'
            swipeThreshold={100}
            preventSwipe={['up', 'down']}
            key={user._id}
            >
              <div
						className='card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border
					 border-gray-200'
					>
						<figure className='px-4 pt-4 h-3/4'>
							<img
								src={user.image || "/imagePlaceHolder.jpg"}
								alt={user.username}
								className='rounded-lg object-cover h-full pointer-events-none'
							/>
						</figure>
						<div className='card-body bg-gradient-to-b from-white to-pink-50'>
							<h2 className='card-title text-2xl text-gray-800'>
								{user.username} , {user.age}
							</h2>
							<p className='text-gray-600'>{user.bio}</p>
						</div>
					</div>
            </TinderCard>
        ))}
    </div>
  )
}

export default SwipeArea ; 