// Import libraries
import React, { useState } from 'react'

// Import react-router-dom
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Import component
import HomePage from './pages/HomePage/Home.page';
import ContactPage from './pages/ContactPage/Contact.page';
import AboutPage from './pages/AboutPage/About.page';
import DownloadComponent from './components/download/download.comp';

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

  return (
    <div className='App'>
      <div className='navbarContainer'>
        <div className='navbarContainer__webLogo'>
          <img src={WebLogo} alt="Logo web" />
        </div>

        <nav className='navbar'>
          <Link className={`navbarBtn ${isHomePage ? "chosen" : ""}`} to="/" onClick={() => { handlePage("home") }}>Home</Link>
          <p className='navbarBtn' onClick={openDownload}>Download</p>
          <Link className={`navbarBtn ${isAboutPage ? "chosen" : ""}`} to="/about" onClick={() => { handlePage("about") }}>About us</Link>
          <Link className={`navbarBtn ${isContactPage ? "chosen" : ""}`} to="/contact" onClick={() => { handlePage("contact") }} >Contact</Link>
          <p className='navbarBtn specNavbarBtn'>Go to System</p>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {!isDownloadForm ? "" : (
        <DownloadComponent closeDownload={closeDownload} />
      )}
    </div>
  )
}

export default App
