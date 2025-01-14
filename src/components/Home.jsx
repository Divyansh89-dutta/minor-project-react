import React from 'react'
import Sidenav from './partials/Sidenav'
import Header from './partials/Topnav'

function Home() {
    document.title = "Movie | Homepage"
  return (
    <>
      <Sidenav />
    <div className='w-[80%] h-full '>
      <Header />
    </div>
    </>
  )
}

export default Home