import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import Tvshow from './components/Tv-shows';
import People from './components/People';
import ContactUs from './components/Contect';
import About from './components/About';
import Moviedetails from './components/Moviedetails';
import Tvdetails from './components/Tvdetails';
import Persondetails from './components/Persondetail';
function App() {
  return (
    <div className='bg-[#1F1E24] w-screen h-screen flex font-[gilroy]'>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/trending" element={<Trending />} />
  <Route path="/popular" element={<Popular />} />
  <Route path="/movies" element={<Movie />} />
  <Route path="/movie-details/:id" element={<Moviedetails />} />
  <Route path="/tv-details/:id" element={<Tvdetails />} />
  <Route path="/person-details/:id" element={<Persondetails />} />
  <Route path="/tv-shows" element={<Tvshow />} />
  <Route path="/peoples" element={<People />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="/about" element={<About />} />
</Routes>

    </div>
  )
}

export default App