import type React from "react"

import "./Contact.page.css"

const ContactPage: React.FC = () => {
    return (
        <div className="ContactPage">
            <h1 className="ContactSection">Contact Form</h1>

            <div className="contactForm">
                <div className="contactForm__inputContainer">
                    <p>Your name</p>
                    <input type="text" />
                </div>

                <div className="contactForm__inputContainer">
                    <p>Your gmail</p>
                    <input type="text" />
                </div>

                <div className="contactForm__inputContainer">
                    <p>Describe your problem</p>
                    <textarea name="" id=""></textarea>
                </div>

                <div className="contactForm__btnContainer">
                    <button className="refreshBtn">Refresh</button>
                    <button className="sendBtn">Send</button>
                </div>
            </div>
        </div>
    )
}

export default ContactPage