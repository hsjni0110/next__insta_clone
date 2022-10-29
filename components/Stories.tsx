import React, { useEffect, useState } from 'react'
import Story from './Story';

type Props = {}

const Stories = (props: Props) => {
  
  
    return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin
    scrollbar-thumb-black'>
      {[...Array(20)].map((_, i) => (
        <Story key={i} />
      ))}
      
    </div>
  )
}

export default Stories