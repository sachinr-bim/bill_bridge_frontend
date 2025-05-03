import { useState } from 'react'

// Redux
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from './reduxToolkit/slices/authSlice'

// Packages and Libraries
import Swal from 'sweetalert2'

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
    Swal.fire({
      title: "Success?",
      text: "You have been logged in",
      icon: "success"
    });
  }

  const handleLogout = () => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-[#1B61AD] rounded-sm text-white px-6 py-2 m-2 hover:bg-white border border-[#1B61AD] hover:text-[#1B61AD]",
        cancelButton: "bg-red-400 rounded-sm text-white px-6 py-2 hover:bg-white border border-red-400 hover:text-red-400"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Logged Out!",
          text: "You have been logged out.",
          icon: "success"
        });
        handleLogin()
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "You are still logged in :)",
          icon: "error"
        });
      }
    });

  }

  return (
    <>
     <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
    </>
  )
}

export default App
