import React from 'react'

type Props = {}

const MiniProfile = (props: Props) => {
  return (
    <div className='flex items-center justify-center mt-14 ml-10'>
        <img src="https://links.papareact.com/3ke" className='w-16 h-16 rounded-full border p-[2px]' alt="" />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>hihihi</h2>
            <h3 className='text-sm text-gray-400'>welcome to Instagram</h3>
        </div>

        <button className='text-blue-400 text-sm font-semibold'>
            Sign Out
        </button>
    </div>
  )
}

export default MiniProfile