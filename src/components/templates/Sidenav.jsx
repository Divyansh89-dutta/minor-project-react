import React from 'react'
import { Link } from 'react-router-dom'

function Sidenav() {
  return (
    <>
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-4'>
        <h1 className='text-xl text-zinc-400 flex items-center font-bold'><i class="text-[#6556CD] text-2xl ri-tv-fill mr-2"></i>Divyansh</h1>
        <nav>
        <h1 className='text-zinc-500 font-semibold text-xl mt-5 mb-3'>New Feeds</h1>
        <ul className='flex flex-col gap-2 text-zinc-500 font-semibold'>
        <Link className='hover:bg-purple-600 px-2 rounded-md hover:text-blue-50 duration-200'>Trending</Link>
        <Link className='hover:bg-purple-600 px-2 rounded-md hover:text-blue-100 duration-200'>Populars</Link>
        <Link className='hover:bg-purple-600 px-2 rounded-md hover:text-blue-200 duration-200'>Movies</Link>
        <Link className='hover:bg-purple-600 px-2 rounded-md hover:text-blue-300 duration-200'>Tv-shows</Link>
        <Link className='hover:bg-purple-600 px-2 rounded-md hover:text-blue-400 duration-200'>Trending</Link>
        <Link className='hover:bg-purple-600 px-2 rounded-md hover:text-blue-500 duration-200'>Peoples</Link>
        </ul>
        </nav>

    </div>
    </>
  )
}

export default Sidenav