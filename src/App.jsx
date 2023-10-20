import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/Navbar'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import IsUser from './components/HOC/isUser'


function App() {

  const { user } = useContext(AuthContext)

  return (
    <div className='body'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  )
}

export default App
