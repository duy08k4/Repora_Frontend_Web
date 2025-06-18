// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { sha256 } from "js-sha256"

// import component
import StaffRegisterForm from "../staffRegisterForm/staffRegisterForm.comp"

// Import interface
import type { interface_MainPage_ManageStaff_Props } from "../../type/interface_MainPage"

// Impot custom hook
import { useToast } from "../../hooks/toastMessage/toast"
import { useSpinner } from "../../hooks/spinner/spinner"

// Import redux
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

// services
import { removeStaff } from "../../services/removeStaff.serv"

// Import css
import "./mainPage__manageStaff.comp.css"

const ManageStaff: React.FC<interface_MainPage_ManageStaff_Props> = ({ closeManageStaff }) => {
    // State
    const [isAddNewStaff, setIsAddNewStaff] = useState<boolean>(false)
    const [isRemoveStaff, setIsRemoveStaff] = useState<boolean>(false)
    const [isConfirmForm, setIsConfirmForm] = useState<boolean>(false)

    const manageStaffForm = useRef<HTMLDivElement>(null)

    // Data
    const [adminPasswordInput, setAdminPasswordInput] = useState<string>("")
    const [listRemoveStaff, setListRemoveStaff] = useState<string[]>([])
    const [listRemoveAvatarCode, setListRemoveAvatarCode] = useState<string[]>([])

    // Redux
    const gmail = useSelector((state: RootState) => state.adminInformation.gmail)

    // Custom hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()

    // Redux
    const listStaff = useSelector((state: RootState) => state.staffImformation.listStaff)

    // Effect
    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (manageStaffForm.current && !manageStaffForm.current.contains(event.target as Node)) {
                if (!isConfirmForm) {
                    closeManageStaff()
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [isConfirmForm, closeManageStaff])

    // Handler
    const changeListRemoveStaff = (checked: boolean, removeGmail: string, removeAvatarCode: string) => {
        if (checked) {
            const createListRemoveStaff = [...listRemoveStaff, removeGmail]
            const createListRemoveAvatarCode = [...listRemoveAvatarCode, removeAvatarCode]
            setListRemoveStaff(createListRemoveStaff)
            setListRemoveAvatarCode(createListRemoveAvatarCode)
        } else {
            const createListRemoveStaff = listRemoveStaff.filter(staffGmail => staffGmail != removeGmail)
            const createListRemoveAvatarCode = listRemoveAvatarCode.filter(staffAvatarCode => staffAvatarCode != removeAvatarCode)
            setListRemoveStaff(createListRemoveStaff)
            setListRemoveAvatarCode(createListRemoveAvatarCode)
        }
    }

    const handleConfirmForm = () => {
        if (listRemoveStaff.length > 0) {
            setIsConfirmForm(!isConfirmForm)
        } else {
            addToast({
                typeToast: "w",
                content: "No staff assign",
                duration: 3
            })
        }
    }

    const handleRemoveStaff = async () => {
        if (adminPasswordInput && adminPasswordInput.trim().length != 0) {
            openSpinner()
            await removeStaff({ listGmail: listRemoveStaff, listAvatarCode: listRemoveAvatarCode, password: sha256(adminPasswordInput), gmail }).then((res) => {
                closeSpinner()
                if (res.status == 200) {
                    setAdminPasswordInput("")
                    setListRemoveStaff([])
                    addToast({
                        typeToast: "s",
                        content: res.data.mess,
                        duration: 3
                    })
                } else {
                    addToast({
                        typeToast: "e",
                        content: res.data.mess,
                        duration: 3
                    })
                }

            }).catch((err) => {
                console.error(err)
                closeSpinner()
                addToast({
                    typeToast: "e",
                    content: "Can't remove selected staff",
                    duration: 3
                })
            })
        } else {
            addToast({
                typeToast: "w",
                content: "Please fill the password",
                duration: 3
            })
        }
    }

    return (
        <div className="manageStaffContainer">
            <div className="manageStaffContainer--container" ref={manageStaffForm}>
                <div className="manageStaffForm">
                    <div className="manageStaffForm__header">
                        <h2 className="manageStaffForm__header--content">Manage staff</h2>

                        <div className="manageStaffForm__btnBox">
                            {isRemoveStaff && !isAddNewStaff ? "" : (
                                <button className={`manageStaffForm__btnBox--add ${isAddNewStaff ? "cancel" : ""}`} onClick={() => { setIsAddNewStaff(!isAddNewStaff) }}>
                                    {isAddNewStaff ? (
                                        <>
                                            Close
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-plus"></i>
                                            Add
                                        </>
                                    )}
                                </button>
                            )}

                            {isAddNewStaff && !isRemoveStaff ? "" : (
                                <button className={`manageStaffForm__btnBox--remove ${isRemoveStaff ? "cancel" : ""}`} onClick={() => { setIsRemoveStaff(!isRemoveStaff) }}>
                                    {isRemoveStaff ? (
                                        <>
                                            Close
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-minus"></i>
                                            Remove
                                        </>
                                    )}
                                </button>
                            )}

                            {!isRemoveStaff ? "" : (
                                <button className="manageStaffForm__btnBox--applyRemove" onClick={handleConfirmForm}>Remove selected staff</button>
                            )}

                        </div>
                    </div>

                    <div className="manageStaffForm__staffList">

                        {listStaff.map((staff, index) => {
                            return (
                                <div className="manageStaffForm__staffTag" key={index}>
                                    {!isRemoveStaff ? "" : (
                                        <div className="manageStaffForm__staffTag__checkBox">
                                            <input type="checkbox" onChange={(e) => { changeListRemoveStaff(e.target.checked, staff.gmail, staff.avatarCode) }} />
                                        </div>
                                    )}

                                    <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                        <div className="manageStaffForm__avartarBox">
                                            <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${staff.role}/${staff.avatarCode}`} alt="" />
                                        </div>
                                    </div>

                                    <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                        <p>{staff.username}</p>
                                    </div>

                                    <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--gmail">
                                        <p>{staff.gmail}</p>
                                    </div>

                                    <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--jobDate">
                                        <p>{staff.createdTime}</p>
                                    </div>

                                </div>
                            )
                        })}


                    </div>

                    <div className="manageStaffForm__amountStaffContainer">
                        <p><b>Number of staff:</b> {listStaff.length}</p>
                    </div>
                </div>

                {!isAddNewStaff ? "" : (
                    <StaffRegisterForm />
                )}
            </div>

            {!isConfirmForm ? "" : (
                <div className="confirmContainer">
                    <div className="confirmForm">
                        <h2>Are you sure?</h2>
                        <input type="password" placeholder="Admin password" value={adminPasswordInput} onChange={(e) => { setAdminPasswordInput(e.target.value) }} />

                        <div className="confirmForm__btnBox">
                            <button className="confirmForm__btnBox--close" onClick={() => { setIsConfirmForm(!isConfirmForm) }}>Cancel</button>
                            <button className="confirmForm__btnBox--confirm" onClick={handleRemoveStaff}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageStaff