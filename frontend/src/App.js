import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import ToDoList from './components/ToDoList/ToDoList';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';

function App() {
  const [locale, setLocale] = useState();
  const [theme, setTheme] = useState();
  const [user, setUser] = useState(null); // Authentication state

  useEffect(() => {
    // Retrieve locale and theme from localStorage
    const localStorageLocale = localStorage.getItem('locale');
    const localStorageTheme = localStorage.getItem('theme');
    
    if (!localStorageLocale) {
      localStorage.setItem('locale', 'en');
    }
    if (!localStorageTheme) {
      localStorage.setItem('theme', 'default');
    }
    
    setLocale(localStorageLocale || 'en');
    setTheme(localStorageTheme || 'default');

    // Retrieve user from localStorage (if exists)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignUp = (userToken) => {
    setUser(userToken);
    localStorage.setItem('user', JSON.stringify(userToken)); // Persist user in localStorage
  };

  const handleLogin = (userToken) => {
    setUser(userToken);
    localStorage.setItem('user', JSON.stringify(userToken)); // Save user to localStorage
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
                <ToDoList locale={locale} setUser={setUser}/>
                <div className="selectorsContainer">
                  <LanguageSelector setLocale={setLocale} />
                  <ThemeSelector setTheme={setTheme} />
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
