// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

// Import handler
import { loginHandler } from "../../handlers/loginAccount.handler"

// Import custom hook
import { useToast } from "../../hooks/toastMessage/toast"
import { useSpinner } from "../../hooks/spinner/spinner"
import { useCache } from "../../hooks/cache/cache"


// Import redux
import { cacheSetGmail } from "../../redux/reducers/admin.reducer"


// Import interface
import type { interface_Login_Props } from "../../type/interface_Login"


// Import css
import "./login.comp.css"

const LoginForm: React.FC<interface_Login_Props> = ({ closeLogin }) => {
    // State
    const [inputGmail, setInputGmail] = useState<string>("")
    const [inputPassword, setInputPassword] = useState<string>("")

    const loginForm = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // Custom hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()
    const { cacheSetData } = useCache()


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
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin(); // Kích hoạt nút khi nhấn Enter
        }
    }

    const handleLogin = async () => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
        if (!inputGmail || !inputPassword) {
            addToast({
                typeToast: "w",
                content: "Please fill the input",
                duration: 3
            })

            return
        }

        if (!gmailRegex.test(inputGmail)) {
            addToast({
                typeToast: "w",
                content: "Invalid email format",
                duration: 3
            })

            return
        }

        openSpinner()
        const res_loginHandler = await loginHandler({ gmail: inputGmail, password: inputPassword })
        if (res_loginHandler.status == 200) {
            closeSpinner()
            addToast({
                typeToast: "s",
                content: res_loginHandler.data.mess,
                duration: 5
            })
            cacheSetData(cacheSetGmail({ inputGmail: res_loginHandler.data.data.gmail }))
            closeLogin()
            navigate("/main")
        } else {
            closeSpinner()
            addToast({
                typeToast: "e",
                content: res_loginHandler.data.mess,
                duration: 5
            })
        }
    }

    return (
        <div className="LoginContainer">
            <div className="loginForm" ref={loginForm}>
                <h1>admin</h1>

                <div className="loginForm__inputForm">
                    <div className="loginForm__inputContainer">
                        <div className="loginForm__inputContainer--input">
                            <i className="far fa-envelope"></i>
                            <input type="text" placeholder="Gmail..." onKeyDown={handleKeyDown} value={inputGmail} onChange={(e) => { setInputGmail(e.target.value) }} />
                        </div>
                    </div>

                    <div className="loginForm__inputContainer">
                        <div className="loginForm__inputContainer--input">
                            <i className="fas fa-fingerprint"></i>
                            <input type="password" placeholder="Password..." onKeyDown={handleKeyDown} value={inputPassword} onChange={(e) => { setInputPassword(e.target.value) }} />
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