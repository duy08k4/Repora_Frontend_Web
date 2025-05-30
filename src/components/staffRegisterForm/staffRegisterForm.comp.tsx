// Import libraries
import type React from "react"

// Import css
import "./staffRegisterForm.comp.css"

const StaffRegisterForm:React.FC = () => {
    return (
        <div className="staffRegisterForm">
            <div className="staffRegisterForm__infoBox staffRegisterForm__infoBox--name">
                <input type="text" placeholder="Staff's name..." />
            </div>

            <div className="staffRegisterForm__infoBox staffRegisterForm__infoBox--gmail">
                <input type="text" placeholder="Staff's gmail..." />
            </div>

            <div className="staffRegisterForm__avatarBox">
                <input type="file" accept="image/*" />
            </div>

            <div className="staffRegisterForm__btnBox">
                <button className="addStaff">Add a new staff</button>
            </div>
        </div>
    )
}

export default StaffRegisterForm