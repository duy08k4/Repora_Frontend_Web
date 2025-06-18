// Import libraries
import type React from "react"

// Import css
import "./Contact.page.css"

// Import service
import { sendContact } from "../../services/sendInfoContact"

// Import custom hook
import { useState } from "react"
import { useToast } from "../../hooks/toastMessage/toast"
import { useSpinner } from "../../hooks/spinner/spinner"



const ContactPage: React.FC = () => {
    const [inputUsername, setInputUsername] = useState<string>("")
    const [inputGmail, setInputGmail] = useState<string>("")
    const [problemDescription, setProblemDescription] = useState<string>("")

    // Custom Hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()

    // Handler
    const sendInfo = async () => {
        if (!inputUsername || !inputGmail || !problemDescription) {
            addToast({
                typeToast: "w",
                content: "Please fill the form",
                duration: 3
            })

            return
        }

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
        if (!gmailRegex.test(inputGmail)) {
            addToast({
                typeToast: "w",
                content: "Invalid email format",
                duration: 3
            })

            return
        }
        openSpinner()
        await sendContact({ gmail: inputGmail, username: inputUsername, description: problemDescription }).then((res) => {
            closeSpinner()
            if (res.status == 200) {
                addToast({
                    typeToast: "s",
                    content: "Thank for your contribution",
                    duration: 3
                })
            } else {
                addToast({
                    typeToast: "e",
                    content: "Can't send your info",
                    duration: 3
                })
            }

            setInputGmail("")
            setInputUsername("")
            setProblemDescription("")
        }).catch((err) => {
            closeSpinner()
            console.error(err)

            setInputGmail("")
            setInputUsername("")
            setProblemDescription("")
        })
    }

    const refreshForm = () => {
        setInputGmail("")
        setInputUsername("")
        setProblemDescription("")
    }

    const handleChangeInputUserName = (value: string) => {
        if (value.length > 15) {
            addToast({
                typeToast: "w",
                content: "Username limit reached",
                duration: 3
            })

            return
        } else {
            setInputUsername(value)
        }
    }

    const handleChangeInputGmail = (value: string) => {
        if (value.length > 50) {
            addToast({
                typeToast: "w",
                content: "Gmail limit reached",
                duration: 3
            })

            return
        } else {
            setInputGmail(value)
        }
    }

    const handleChangeInputDescription = (value: string) => {
        if (value.split(" ").length > 100) {
            addToast({
                typeToast: "w",
                content: "Description limit reached",
                duration: 3
            })

            return
        } else {
            setProblemDescription(value)
        }
    }

    return (
        <div className="ContactPage">
            <h1 className="ContactSection">Contact Form</h1>

            <div className="contactForm">
                <div className="contactForm__inputContainer">
                    <p>Your name</p>
                    <input type="text" value={inputUsername} onChange={(e) => { handleChangeInputUserName(e.target.value) }} />
                </div>

                <div className="contactForm__inputContainer">
                    <p>Your gmail</p>
                    <input type="text" value={inputGmail} onChange={(e) => { handleChangeInputGmail(e.target.value) }} />
                </div>

                <div className="contactForm__inputContainer">
                    <p>Describe your problem</p>
                    <textarea name="" id="" value={problemDescription} onChange={(e) => { handleChangeInputDescription(e.target.value) }} ></textarea>
                </div>

                <div className="contactForm__btnContainer">
                    <button className="refreshBtn" onClick={refreshForm}>Refresh</button>
                    <button className="sendBtn" onClick={sendInfo}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default ContactPage