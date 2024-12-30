import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import ToDoList from './components/ToDoList/ToDoList';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import LogoutButton from './components/LogoutButton/LogoutButton';

function App() {
  const [locale, setLocale] = useState();
  const [theme, setTheme] = useState();
  const [user, setUser] = useState(null); // Authentication state

  useEffect(() => {
    const localStorageLocale = localStorage.getItem('locale');
    const localStorageTheme = localStorage.getItem('theme');
    if (!localStorageLocale) {
      localStorage.setItem('locale', 'en');
    }
    if (!localStorageTheme) {
      localStorage.setItem('theme', 'default');
    }
    setLocale(localStorageLocale);
    setTheme(localStorageTheme);

    // Check for an existing user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignUp = (userData) => {
    setUser(userData); // Set user state
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user in localStorage
  };

  useEffect(() => {
    // Retrieve user from localStorage on initial load
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };
  

  return (
    <div className="App" data-theme={theme}>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp onSignUp={handleSignUp} />}
        />

        {/* Main Todo list route */}
        <Route
          path="/"
          element={
            user ? (
              <>
                <ToDoList locale={locale} />
                <div className="selectorsContainer">
                  <div>
                    <LanguageSelector setLocale={setLocale} />
                    <ThemeSelector setTheme={setTheme} />
                  </div>
                  <LogoutButton handleLogout={handleLogout} />
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
