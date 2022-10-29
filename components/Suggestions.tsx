import React, { useEffect, useState } from 'react'
import { randUser } from '@ngneat/falso';

type Props = {}

interface ISuggestion {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    img: string;
    address: {
        street: string;
        city: string;
        zipCode: string;
    };
    phone: string;
}

const Suggestions = (props: Props) => {

    const [suggestions, setSuggestions] = useState<ISuggestion[]>();

    useEffect(() => {
        var suggestions = [...Array(5)].map((_, i) => {
            const randomUser = randUser();

            return {
                ...randomUser,
                id: i
            }
        })
        setSuggestions(suggestions);
        
    },[])

    return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5'>
            <h3 className='text-sm font-bold'>Suggestion for you</h3>
            <button className='text-gray-600 font-semibold'>See All</button>
        </div>
        
        {
            suggestions?.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between mt-3">
                    <img src={profile.img} className="w-10 h-10 rounded-full border p-[2px]" alt="" />
                    <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm'>{profile.username}</h2>
                        <h3 className='text-xs text-gray-400'>Works at {profile.address.street}</h3>
                    </div>

                    <button className='text-blue-400 text-sm font-semibold'>Follow</button>
                </div>
            ))
        }
    </div>
  )
}

export default Suggestions