import React from 'react'

function Loading() {
  return (
    <div className='flex flex-col items-center justify-center h-[40vh]'>
        <div className='w-16 h-16 rounded-full animate-spin border-4 border-dashed border-red-600'></div>
        <p className='text-2xl mt-4 text-red-600'>Loading...</p>
    </div>
  )
}

export default Loading