import { randUser } from '@ngneat/falso';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Story from './Story';

type Props = {}

const Stories = (props: Props) => {
    const [users, setUsers] = useState<any>();

    useEffect(() => {

      const users = [...Array(20)].map((_,i) => {
        const randomUser = randUser();
        return {
          img: randomUser.img,
          username: randomUser.username,
          id: i,
        }
      })

      setUsers(users);  
 
    },[])

    const { data: session } = useSession();

    return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin
    scrollbar-thumb-black'>
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {users?.map((user:any) => (
        <Story key={user.id} img={user.img} username={user.username} />
      ))}
      
    </div>
  )
}

export default Stories