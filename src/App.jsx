import { useState } from 'react'

// Redux
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from './reduxToolkit/slices/authSlice'

// Components
import Navbar from './Components/Navigation/Navbar'

// Styling
import './App.css'

function App() {

  // const { isAuthenticated } = useSelector((state) => state.auth)
  // const dispatch = useDispatch()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to log out?")

    if(confirm){
      handleLogin()
      alert("You have been logged out")
    }else{
      alert("You are still logged in")
    }
  }

  return (
    <>
     <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
    </>
  )
}

export default App
