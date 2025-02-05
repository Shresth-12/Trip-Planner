import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavBar } from './components/NavBar'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import Create from './pages/Create'
import { ViewTrip } from './view-trip/[tripid]'
import { MyTrips } from './pages/MyTrips'


function App() {
  return <>
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/view/:tripId" element={<ViewTrip/>} />
      <Route path="/trips" element={<MyTrips/>} />
    </Routes>
    </BrowserRouter>
    </>
}

export default App
