// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { sha256 } from "js-sha256"

// Import interface
import type { interface__ReportForm__props } from "../../type/interface_ReportForm"

// Import custom hook
import { useToast } from "../../hooks/toastMessage/toast"
import { useSpinner } from "../../hooks/spinner/spinner"

// Redux
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

// Import interface
import type { interface__report__reducer, interface__staff__reducer } from "../../type/interface__Auth"

// Import service


// Import css
import "./reportForm.css"
import { taskAssignment } from "../../services/tastAssignment.serv"

const ReportForm: React.FC<interface__ReportForm__props> = ({ closeReportForm, report, reportID }) => {
    // State
    const [isSendTaskForm, setIsSendTaskForm] = useState<boolean>(false)
    const [newListStaff, setNewListStaff] = useState<Record<string, interface__staff__reducer>>({})
    const [listTaskAssingment, setListTaskAssignment] = useState<string[]>([])
    const [newReportStructure, setNewReportStructure] = useState<Record<string, interface__report__reducer>>({})


    // Ref
    const reportForm = useRef<HTMLDivElement>(null)

    // Redux
    const listStaff = useSelector((state: RootState) => state.staffImformation.listStaff)
    const staffOnline = useSelector((state: RootState) => state.staffLocation.staffStatus)
    const listReport = useSelector((state: RootState) => state.reportImformation.listReport)
    const staffLocation = useSelector((state: RootState) => state.staffLocation.staffLocation)

    // Custom hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()

    // Function
    const haversineDistance = useRef( // Calculate Distance (haversine)
        ([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]): number => {
            const R = 6371000; // Bán kính Trái Đất (m)
            const toRad = (deg: number) => deg * Math.PI / 180;

            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) ** 2;

            const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return Number((distance).toFixed(2));
        })

    // Effect
    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (reportForm.current && !reportForm.current.contains(event.target as Node)) {
                if (!isSendTaskForm) {
                    closeReportForm()
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [isSendTaskForm, closeReportForm])

    useEffect(() => {
        const changeStructureData_listStaff: Record<string, interface__staff__reducer> = {}

        listStaff.forEach(staff => {
            changeStructureData_listStaff[staff.gmail] = staff
        })

        setNewListStaff(changeStructureData_listStaff)
    }, [listStaff])

    useEffect(() => { // Change structure of listReport from Array to Object
        const changeReportStructure: Record<string, interface__report__reducer> = {}
        listReport.forEach(report => {
            changeReportStructure[report.reportID] = report
        })

        setNewReportStructure(changeReportStructure)
    }, [listReport])


    useEffect(() => {
        if (newReportStructure[reportID] && newReportStructure[reportID].state == "done") {
            setIsSendTaskForm(false)
        }
    }, [listReport, report, newReportStructure])


    // Handler
    const changeListStaffAssignment = (checked: boolean, gmailStaff: string) => {
        if (checked) {
            const createListRemoveStaff = [...listTaskAssingment, gmailStaff]
            setListTaskAssignment(createListRemoveStaff)
        } else {
            const createListRemoveStaff = listTaskAssingment.filter(staffGmail => staffGmail != gmailStaff)
            setListTaskAssignment(createListRemoveStaff)
        }
    }

    const handleAssignment = async () => {
        if (listTaskAssingment.length > 0) {
            openSpinner()

            await taskAssignment({ listStaff: listTaskAssingment, reportID: report.reportID }).then((res) => {
                closeSpinner()
                if (res.status == 200) {
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
                console.error(`ERROR: ${err}`)
                closeSpinner()
                addToast({
                    typeToast: "e",
                    content: "Can't proccess",
                    duration: 3
                })
            })
        } else {
            addToast({
                typeToast: "w",
                content: "No staff assign",
                duration: 3
            })
        }
    }


    return (
        <div className="reportContainer">
            <div className="reportForm" ref={reportForm}>
                <div className="reportForm__infoContainer reportForm__infoContainer--incidentLevel">
                    <div className={`reportForm__infoContainer__incidentTag ${report.level}`}>
                        {report.level == "normal" && <i className="fas fa-meh"></i>}
                        {report.level == "severe" && <i className="fas fa-frown"></i>}
                        {report.level == "critical" && <i className="fas fa-dizzy"></i>}
                        <p>{report.level}</p>
                    </div>
                </div>

                <div className="reportForm__infoContainer reportForm__infoContainer--baseInfo">
                    <div className="reportForm__infoContainer--baseInfo--avatarBox">
                        <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/report/${report.imgCode}`} alt="" />
                    </div>

                    <h1 className="reportForm__infoContainer--baseInfo--name">{report.name}</h1>
                    <p className="reportForm__infoContainer--baseInfo--id">{report.reportID}</p>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Incident Type</p>
                        <input type="text" disabled value={report.type} />
                    </div>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Reporter Name</p>
                        <input type="text" disabled value={report.reporter.name} />
                    </div>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Reporter Gmail</p>
                        <input type="text" disabled value={report.reporter.gmail} />
                    </div>
                </div>

                <div className="reportForm__infoContainer">
                    <div className="reportForm__infoContainer__infoBox">
                        <p className="reportForm__infoContainer__infoBox--content">Reporter Time</p>
                        <input type="text" disabled value={report.time} />
                    </div>
                </div>

                <div className="reportForm__currentStaffList">
                    <div className="reportForm__currentStaffList__titleBox">
                        <h3 className="reportForm__currentStaffList--title">In Action</h3>

                        {newReportStructure[reportID] && newReportStructure[reportID].state == "done" ? "" : (
                            <button className="reportForm__currentStaffList__taskAssignment--btn" onClick={() => { setIsSendTaskForm(!isSendTaskForm) }}>
                                <i className="fas fa-user-plus"></i>
                                Add staff
                            </button>
                        )}
                    </div>

                    <div className="reportForm__currentStaffList--list">

                        {newReportStructure[reportID] && newReportStructure[reportID].activeStaff.map((staffGmail, index) => {
                            const staffData = newListStaff[staffGmail]

                            if (staffData) {
                                return (
                                    <div key={index} className="reportForm__currentStaffList__staffTag">
                                        <div className="reportForm__currentStaffList__staffTag--imgBox">
                                            <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/staff/${staffData.avatarCode}`} alt="" />
                                        </div>

                                        <p className="reportForm__currentStaffList__staffTag--staffName">{staffData.username}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>

            {!isSendTaskForm ? "" : (
                <div className="sendTaskForm">
                    <h2 className="sendTaskFormAssignment">Task assignment</h2>

                    <div className="sendTaskFormList">
                        {listStaff.map((staff, index) => {
                            if (staffOnline[sha256(staff.gmail)] && !newListStaff[staff.gmail].taskList.includes(report.reportID)) { // Staff is online. Staff dont have any task
                                return (
                                    <div key={index} className="manageStaffForm__staffTag">
                                        <div className="manageStaffForm__staffTag__checkBox">
                                            <input type="checkbox" onChange={(e) => { changeListStaffAssignment(e.target.checked, staff.gmail) }} />
                                        </div>

                                        <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--avartar">
                                            <div className="manageStaffForm__avartarBox">
                                                <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/staff/${staff.avatarCode}`} alt="" />
                                            </div>
                                        </div>

                                        <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--name">
                                            <p>{staff.username}</p>
                                        </div>

                                        <div className="manageStaffForm__staffTag__infoBox manageStaffForm__staffTag__infoBox--status">
                                            <p>
                                                {!staffLocation[staff.gmail] ? "?m" : `${haversineDistance.current(report.position, staffLocation[staff.gmail])}m`}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        })}

                    </div>

                    <div className="sendTaskFormBtnContainer">
                        <button className="sendTaskFormBtnContainer--apply " onClick={handleAssignment}>Send task to selected staff</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReportForm