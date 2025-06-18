// Import libraries
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Import service
import { addStaff } from "../../services/addStaff.serv"

// Import custom hook
import { useToast } from "../../hooks/toastMessage/toast"
import { useSpinner } from "../../hooks/spinner/spinner"

// Import css
import "./staffRegisterForm.comp.css"

const StaffRegisterForm: React.FC = () => {
    // State
    const [newStaffName, setNewStaffName] = useState<string>("")
    const [newStaffGmail, setNewStaffGmail] = useState<string>("")
    const [imageSelected, setImageSelected] = useState<File | null>(null)

    const navigate = useNavigate()


    // Custom hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()

    // Handler
    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageSelected(file);
        }
    }

    const handleAddStaff = async () => {
        if (!newStaffName || !newStaffGmail || !imageSelected) {
            addToast({
                typeToast: "w",
                content: "Please fill the input",
                duration: 5
            })
            return
        }

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

        if (!gmailRegex.test(newStaffGmail)) {
            addToast({
                typeToast: "w",
                content: "Invalid email format",
                duration: 5
            })

            return
        }

        openSpinner()
        await addStaff({
            name: newStaffName,
            gmail: newStaffGmail,
            file: imageSelected!
        }).then((data) => {
            if (data.status == 200) {
                addToast({
                    typeToast: "s",
                    content: data.data.mess,
                    duration: 5
                })
            } else if (data.status == 404) {
                addToast({
                    typeToast: "e",
                    content: data.data.mess,
                    duration: 5
                })
            } else {
                addToast({
                    typeToast: "e",
                    content: data.data.mess,
                    duration: 5
                })

                navigate("/")
            }
            setNewStaffGmail("")
            setNewStaffName("")
            setImageSelected(null)

            closeSpinner()
        }).catch((error) => {
            console.error(`ERROR: ${error}`)
            addToast({
                typeToast: "e",
                content: "Can't proccess...1",
                duration: 5
            })

            setNewStaffGmail("")
            setNewStaffName("")
            setImageSelected(null)

            closeSpinner()
        })
    }


    return (
        <div className="staffRegisterForm">
            <div className="staffRegisterForm__infoBox staffRegisterForm__infoBox--name">
                <input type="text" placeholder="Staff's name..." value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} />
            </div>

            <div className="staffRegisterForm__infoBox staffRegisterForm__infoBox--gmail">
                <input type="text" placeholder="Staff's gmail..." value={newStaffGmail} onChange={(e) => setNewStaffGmail(e.target.value)} />
            </div>

            <div className="staffRegisterForm__avatarBox">
                <input type="file" accept="image/*" onChange={handleChangeImg} />
            </div>

            <div className="staffRegisterForm__btnBox">
                <button className="addStaff" onClick={handleAddStaff}>Add a new staff</button>
            </div>
        </div>
    )
}

export default StaffRegisterForm