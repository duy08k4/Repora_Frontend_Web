// Import libraries
import React, { useState } from 'react'

// Import react-router-dom
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Import component
import HomePage from './pages/HomePage/Home.page';
import ContactPage from './pages/ContactPage/Contact.page';
import AboutPage from './pages/AboutPage/About.page';
import DownloadComponent from './components/download/download.comp';
import LoginForm from './components/login/login.comp';
import MainPage from './pages/MainPage/MainPage.page';

// Import image
import WebLogo from "./assets/reporaLogo.png"

// Import css
import './App.css'

const App: React.FC = () => {
  // State
  const [isHomePage, setIsHomePage] = useState<boolean>(true)
  const [isDownloadForm, setIsDownloadForm] = useState<boolean>(false)
  const [isAboutPage, setIsAboutPage] = useState<boolean>(false)
  const [isContactPage, setIsContactPage] = useState<boolean>(false)
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false)

  // Path name
  const pathName = useLocation()

  // Handler
  const handlePage = (page: string) => {
    setIsHomePage(false)
    setIsAboutPage(false)
    setIsContactPage(false)

    switch (page) {

      case "home":
        setIsHomePage(true)
        break;

      case "about":
        setIsAboutPage(true)
        break;

      case "contact":
        setIsContactPage(true)
        break;

      default:
        setIsHomePage(false)
        setIsAboutPage(false)
        setIsContactPage(false)
        break;
    }
  }

  const openDownload = () => {
    setIsDownloadForm(true)
  }

  const closeDownload = () => {
    setIsDownloadForm(false)
  }

  const openLogin = () => {
    setIsLoginForm(true)
  }

  const closeLogin = () => {
    setIsLoginForm(false)
  }

  return (
    <div className={`App ${pathName.pathname == "/main" ? "main" : ""}`}>
      {pathName.pathname == "/main" ? "" : (
        <div className='navbarContainer'>
          <div className='navbarContainer__webLogo'>
            <img src={WebLogo} alt="Logo web" />
          </div>

          <nav className='navbar'>
            <Link className={`navbarBtn ${isHomePage ? "chosen" : ""}`} to="/" onClick={() => { handlePage("home") }}>Home</Link>
            <p className='navbarBtn' onClick={openDownload}>Download</p>
            <Link className={`navbarBtn ${isAboutPage ? "chosen" : ""}`} to="/about" onClick={() => { handlePage("about") }}>About us</Link>
            <Link className={`navbarBtn ${isContactPage ? "chosen" : ""}`} to="/contact" onClick={() => { handlePage("contact") }} >Contact</Link>
            <p className='navbarBtn specNavbarBtn' onClick={openLogin}>Go to System</p>
          </nav>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/main" element={<MainPage />}></Route>
      </Routes>

      {!isDownloadForm ? "" : (
        <DownloadComponent closeDownload={closeDownload} />
      )}

      {!isLoginForm ? "" : (
        <LoginForm closeLogin={closeLogin} />
      )}
    </div>
  )
}

export default App
