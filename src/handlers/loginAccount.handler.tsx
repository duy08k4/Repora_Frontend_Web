import type { interface_Login_LoginHandler } from "../type/interface_Login"

import { sha256 } from "js-sha256"

// import service
import { autoLogin, loginAccount } from "../services/login.serv"


const failure_response = {
    status: 404,
    data: {
        mess: "Can't proccess...2"
    }
}

// Login
const loginHandler = async (inputData: interface_Login_LoginHandler) => {
    const inputGmail = inputData.gmail
    const inputPassword = inputData.password

    if (inputGmail && inputPassword) {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

        if (!gmailRegex.test(inputGmail)) {
            return {
                status: 404,
                data: {
                    mess: "Invalid email format"
                }
            }
        }

        // Use service
        const response = await loginAccount({ gmail: inputGmail, password: sha256(inputPassword) })
            .then((data) => data)
            .catch((error) => {
                console.error(error)
                return failure_response
            })

        return response
    } else {
        return {
            status: 404,
            data: {
                mess: "Please fill the input"
            }
        }
    }
}

// Login
const autoLoginHandler = async () => {
    const response = await autoLogin()
        .then((data) => data)
        .catch((error) => {
            console.error(error)
            return failure_response
        })

    return response
}

export { loginHandler, autoLoginHandler }