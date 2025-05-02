import React, { useState, useRef, useEffect } from 'react';

// Packages and Libraries
import { NavLink, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Icons
import { BellIcon } from '../../assets/icons/BellIcon';

// Images
import profileImage from '../../assets/images/profileImage.png';

// Logos
import BillBridgeLogo from '../../assets/logos/BillBridgeLogo';

// Components
import Login from '../Authorization/Login';
import Signup from '../Authorization/SignUp';
import Dashboard from "../Dashboard/Dashboard";
import UploadSidebar from "../UploadAndConfiguration/UploadSidebar";
import Review from "../Review/Review";
import Transactions from "../Transactions/Transactions";

export default function Navbar({ isLoggedIn, handleLogin, handleLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ProtectedRoute component
  const ProtectedRoute = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
  };

  // PublicRoute component
  const PublicRoute = () => {
    return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
  };

  // Navigation items array
  const navItems = [
    { path: '/', name: 'Dashboard', exact: true, protected: true },
    { path: '/upload', name: 'Upload & Configuration', protected: true },
    { path: '/review', name: 'Review', protected: true },
    { path: '/transactions', name: 'Transaction Log', protected: true },
  ];

  // Protected routes array
  const protectedRoutes = [
    { path: '/', element: <Dashboard />, exact: true },
    { path: '/upload', element: <UploadSidebar /> },
    { path: '/review', element: <Review /> },
    { path: '/transactions', element: <Transactions /> },
  ];

  // Public routes array
  const publicRoutes = [
    { path: '/login', element: <Login handleLogin={handleLogin} /> },
    { path: '/signup', element: <Signup handleLogin={handleLogin} /> }
  ];

  return (
    <>
      {/* Navbar */}
      {isLoggedIn && (
        <div className="w-full bg-[#e8eff7] shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Left: Logo/Brand */}
              <div className="flex items-center">
                <div className="flex items-center text-2xl font-semibold gap-4">
                  <BillBridgeLogo className="mr-10" />
                  <span>BillBridge AI</span>
                </div>
                
                {/* Navigation Links */}
                <div className="hidden md:flex items-center ml-10 space-x-8">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) => 
                        `text-lg pb-1 border-b-2 transition-colors duration-200 ${
                          isActive 
                            ? "text-[#1B61AD] font-medium border-[#1B61AD]" 
                            : "text-gray-600 border-transparent hover:text-[#1B61AD] hover:border-[#1B61AD]"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Right: Notification and Profile */}
              <div className="flex items-center space-x-6">
                {/* Notification icon with badge */}
                <div className="relative">
                  <button className="text-gray-600 hover:bg-gray-200 rounded-full hover:p-4 hover:text-[#1B61AD] focus:outline-none transition-colors duration-200">
                    <BellIcon className="w-6 h-6" />
                  </button>
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    2
                  </span>
                </div>
                
                {/* Profile dropdown/logout */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="focus:outline-none"
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="rounded-full w-9 h-9 border-2 border-[#1B61AD] cursor-pointer"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content area with routes */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            {publicRoutes.map((route) => (
              <Route 
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {protectedRoutes.map((route) => (
              <Route 
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact}
              />
            ))}
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </>
  );
}