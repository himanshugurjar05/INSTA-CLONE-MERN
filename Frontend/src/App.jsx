import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './Navigation/Navbar'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Home from './Components/Home'
import Allpost from './Pages/Allpost'
import Addpost from './Pages/Addpost'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/addpost' element={<Addpost/>} />
        <Route path='/allpost' element={<Allpost/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
