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

  // Set test user if no user is in localStorage
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

    // Check for an existing user in localStorage, else set a test user
    const savedUser = localStorage.getItem('user');
    // if (savedUser) {
    //   setUser(JSON.parse(savedUser));
    // } else {
    //   // Set a test user if no user is found
    //   const testUser = { username: 'testuser', email: 'test@example.com' };
    //   setUser(testUser);
    //   localStorage.setItem('user', JSON.stringify(testUser)); // Persist the test user
    // }
  }, []);

  useEffect(() => {
    switch (theme) {
      case 'default':
      default:
        document.querySelector('meta[name="theme-color"]').content = '#363062';
        break;
      case 'dark':
        document.querySelector('meta[name="theme-color"]').content = '#132043';
        break;
      case 'light':
        document.querySelector('meta[name="theme-color"]').content = '#fff2d8';
        break;
    }
  }, [theme]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage for persistence
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
          element={user ? <Navigate to="/" /> : <SignUp />}
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
