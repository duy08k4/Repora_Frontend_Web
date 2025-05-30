// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


// Import interface
import type { interface_Login_Props } from "../../type/interface_Login"

// Import css
import "./login.comp.css"

const LoginForm: React.FC<interface_Login_Props> = ({ closeLogin }) => {
    // State
    const loginForm = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // Effect
    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (loginForm.current && !loginForm.current.contains(event.target as Node)) {
                closeLogin()
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [])

    // Handler
    const handleLogin = () => {
        navigate("/main")
    }

    return (
        <div className="LoginContainer">
            <div className="loginForm" ref={loginForm}>
                <h1>admin</h1>

                <div className="loginForm__inputForm">
                    <div className="loginForm__inputContainer">
                        <div className="loginForm__inputContainer--input">
                            <i className="far fa-envelope"></i>
                            <input type="text" placeholder="Gmail..." />
                        </div>
                    </div>

                    <div className="loginForm__inputContainer">
                        <div className="loginForm__inputContainer--input">
                            <i className="fas fa-fingerprint"></i>
                            <input type="password" placeholder="Password..." />
                        </div>
                    </div>
                </div>

                <div className="loginForm__btnContainer">
                    <button className="loginBtn" onClick={handleLogin}>login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm