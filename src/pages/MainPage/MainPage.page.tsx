// Import libraries
import type React from "react"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import leaflet
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

// Import component
import ManageStaff from "../../components/mainPage__manageStaff/mainPage__manageStaff.comp";
import ReportForm from "../../components/reportForm/reportForm";

// Custom hooks
import { useToast } from "../../hooks/toastMessage/toast";
import { useCache } from "../../hooks/cache/cache";

// Import css
import "./MainPage.page.css"

// Import img
import logoApp from "../../assets/reporaLogo.png"

// Import redux
import type { RootState } from "../../redux/store";

// Import interface
import type { interface__report__reducer, interface__staff__reducer } from "../../type/interface__Auth";

// Import redux
import { useSelector } from "react-redux";
import { cacheSetGmail } from "../../redux/reducers/admin.reducer";

// Import service
import { autoLoginHandler } from "../../handlers/loginAccount.handler";
import { sha256 } from "js-sha256";
import { logoutAccount } from "../../services/logout.serv";


const createStaffMarker = (targetAvartarCode: string, name: string) => {
    const targetMarker = `
            <div class="targetMarker">
                <div class="infoBox">
                    <div class="targetMarker__imgBox">
                        <img src=${`https://res.cloudinary.com/ddjdwc8dn/image/upload/staff/${targetAvartarCode}`} alt="" />
                    </div>

                    <p class="markerStaffName">${name}</P>
                
                </div>
            </div>
        `

    return L.divIcon({
        className: "staff__customMarker",
        html: targetMarker,
        iconAnchor: [37, 87]
    })
}

const createReportMarker = () => {
    const reportMarker = `
            <div class="reportMarker">
               <i class="fas fa-flag"></i>
            </div>
        `

    return L.divIcon({
        className: "report__customMarker",
        html: reportMarker,
        iconAnchor: [0, 27]
    })
}


const MainPage: React.FC = () => {
    // State
    const [isManageStaff, setIsManageStaff] = useState<boolean>(false)
    const [isReportForm, setIsReportForm] = useState<boolean>(false)
    const [filter, setFilter] = useState<string | null>(null)
    const [imgCodeShowcase, setImgCodeShowcase] = useState<string>("")

    const [reportForShowcase, setReportForShowcase] = useState<interface__report__reducer | null>(null)
    const [newReportStructure, setNewReportStructure] = useState<Record<string, interface__report__reducer>>({})
    const [newStaffStructure, setNewStaffStructure] = useState<Record<string, interface__staff__reducer>>({})

    const [typeLayer, settypeLayer] = useState<number>(0)
    const layerMap = useRef<Record<number, string>>({
        0: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", // CartoDB Light: default layer
        1: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // OSM: Open Street Map
        2: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", // 
    })

    const layerAttribution = useRef<Record<number, string>>({
        0: "&copy; OpenStreetMap contributors &copy; CARTO", // CartoDB Light: default layer
        1: "&copy; OpenStreetMap contributors", // OSM: Open Street Map
        2: "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community", // 
    })

    const imgShowcaseForm = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    // Report Data
    const [filterReport, setFilterReport] = useState<Record<string, interface__report__reducer[]>>({}) // Danh sách tất cả các report
    const [reportPosition, setReportPosition] = useState<Record<string, [number, number]>>({}) // Danh sách vị trí của các report

    // Hook
    const { addToast } = useToast()
    const { cacheSetData, enableListener_userInformation_staff, enableListener_reportInformation, enableListener_staffLocation_listStaffOnline } = useCache()

    // State map
    const mapRef = useRef<any>(null);
    const [staffLocate, setStaffLocate] = useState<string>("")

    // Redux
    const listReport = useSelector((state: RootState) => state.reportImformation.listReport)
    const gmail = useSelector((state: RootState) => state.adminInformation.gmail)
    const listStaff = useSelector((state: RootState) => state.staffImformation.listStaff)
    const staffOnline = useSelector((state: RootState) => state.staffLocation.staffStatus)
    const staffLocation = useSelector((state: RootState) => state.staffLocation.staffLocation)

    // Effect
    useEffect(() => {
        enableListener_userInformation_staff()
        enableListener_reportInformation()
        enableListener_staffLocation_listStaffOnline()
    }, [])

    useEffect(() => {
        
    }, [reportPosition])

    useEffect(() => { // Auto login
        (async () => {
            const res_autoLoginHandler = await autoLoginHandler()

            if (res_autoLoginHandler.status == 200) {
                cacheSetData(cacheSetGmail({ inputGmail: res_autoLoginHandler.data.data.gmail }))
            } else navigate("/")
        })()
    }, [])

    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (imgShowcaseForm.current && !imgShowcaseForm.current.contains(event.target as Node)) {
                setImgCodeShowcase("")
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [imgCodeShowcase])

    // Phân loại report
    useEffect(() => {
        const createFilterReport: Record<string, interface__report__reducer[]> = {}
        const createReportPosition: Record<string, [number, number]> = {}
        const changeStructureReport: Record<string, interface__report__reducer> = {}

        listReport.forEach(report => {
            (createFilterReport[report.level] ||= []).push(report)
            createReportPosition[report.reportID] = [report.position[0], report.position[1]]
            changeStructureReport[report.reportID] = report
        })

        setNewReportStructure(changeStructureReport)
        setFilterReport(createFilterReport)
        setReportPosition(createReportPosition)
    }, [listReport.length])

    // Đổi kiểu dữ liệu cho listStaff
    useEffect(() => {
        const createStructureStaff: Record<string, interface__staff__reducer> = {}

        listStaff.forEach(staff => {
            createStructureStaff[staff.gmail] = staff
        })

        setNewStaffStructure(createStructureStaff)
    }, [listStaff])

    useEffect(() => {
        if (reportForShowcase) {
            setReportForShowcase(newReportStructure[reportForShowcase?.reportID])
            setIsReportForm(true)
        }
    }, [listReport, reportForShowcase?.activeStaff])

    useEffect(() => {
        if (staffLocate != "") {
            mapRef.current.setView(staffLocation[staffLocate], 18)
        }
    }, [staffLocation])

    mapRef.current?.on("movestart", () => {
        setStaffLocate("")
    });

    // Handler
    const openManageStaff = () => {
        setIsManageStaff(true)
    }

    const closeManageStaff = () => {
        setIsManageStaff(false)
    }

    const handleShowReport = (report: interface__report__reducer) => {
        setReportForShowcase(report)
        setIsReportForm(true)
    }

    const handleCloseReportForm = () => {
        setIsReportForm(false)
    }

    const locateReport = (e: React.MouseEvent, position: [number, number]) => {
        e.stopPropagation();

        mapRef.current.setView(position, 18)
    }

    const handleImgCodeShowcase = (e: React.MouseEvent, imgCode: string) => {
        e.stopPropagation();

        setImgCodeShowcase(imgCode)
    }

    const changeLayer = () => {
        if (layerMap.current[typeLayer + 1]) {
            settypeLayer(typeLayer + 1)
        } else {
            settypeLayer(0)
        }
    }

    const locateStaff = (staffGmail: string, staffName: string) => {
        try {
            setStaffLocate(staffGmail)
            mapRef.current.setView(staffLocation[staffGmail], 18)
        } catch {
            console.warn("No have location")
            addToast({
                typeToast: "i",
                content: `Location not shared by ${staffName}`,
                duration: 3
            })
        }
    }

    const handleLogout = async () => {
        console.log("asdasd")
        logoutAccount().then((res) => {
            console.log(res)
            if (res.status == 200) {
                navigate("/")
            } else {
                addToast({
                    typeToast: "e",
                    content: res.data.mess,
                    duration: 3
                })
            }
        }).catch((err) => {
            console.log(`ERROR: ${err}`)
            addToast({
                typeToast: "e",
                content: "Can't logout",
                duration: 3
            })
        })
    }

    return (
        <div className="mainPage">
            <div className="mainPageTop">
                <div className="mainPageTop--left mainPage__staffContainer">
                    <div className="mainPage__staffContainer__header">
                        <h2>Active Staff ({Object.values(staffOnline).filter(Boolean).length})</h2>
                    </div>

                    <div className="mainPage__staffContainer__listStaff">
                        {listStaff.map((staff, index) => {
                            if (staffOnline[sha256(staff.gmail)]) {

                                return (
                                    <div key={index} className="staffTag" onClick={() => { locateStaff(staff.gmail, staff.username) }}>
                                        <div className="staffTag__avartarBox">
                                            <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/staff/${staff.avatarCode}`} alt="" />
                                        </div>

                                        <div className="staffTag__nameBox">
                                            <p>{staff.username}</p>
                                        </div>

                                        <div className="staffTag__makerBox">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                    </div>
                                )
                            }
                        })}


                    </div>
                </div>

                <div className="mainPageTop--right mainPage__mapContainer">
                    <div className="adminTag">
                        <span className="adminGmail">
                            <i className="fas fa-user-shield"></i>
                            {gmail}
                        </span>

                        <button className="manageStaff" onClick={openManageStaff}><i className="fas fa-user-cog"></i>Manage staff</button>
                        <button className="changeLayer" onClick={changeLayer} ><i className="fas fa-layer-group"></i>Layers</button>
                        <button className="adminLogout" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i></button>
                    </div>

                    <MapContainer
                        center={[10.762622, 106.660172]}
                        zoom={21}
                        style={{ height: "100%", width: "100%" }}
                        ref={mapRef}
                        zoomControl={false}
                        whenReady={() => {
                            setTimeout(() => {
                                if (mapRef.current) {
                                    mapRef.current.invalidateSize();
                                }
                            }, 100);
                        }}
                    >
                        <TileLayer
                            url={`${layerMap.current[typeLayer]}`}
                            attribution={`${layerAttribution.current[typeLayer]}`}
                        />

                        {listReport.length > 0 && listReport.map((report, index) => {
                            return (
                                <Marker
                                    key={index}
                                    position={report.position}
                                    icon={createReportMarker()}
                                    eventHandlers={{
                                        click: () => { handleShowReport(report) }
                                    }}
                                ></Marker>
                            )
                        })}

                        {Object.values(staffLocation).length > 0 && Object.values(staffLocation).map((location, index) => {
                            const staff = newStaffStructure[Object.keys(staffLocation)[index]]
                            if (staff) {
                                return <Marker key={index} position={location} icon={createStaffMarker(staff.avatarCode, staff.username)}></Marker>
                            }
                        })}

                    </MapContainer>
                </div>
            </div>

            <div className="mainPageBottom mainPage__reportList">
                <div className="mainPageBottom--left optionBox">
                    <span className={`filterIcon ${filter}`} onClick={() => { setFilter(null) }} >
                        <i className="fas fa-filter"></i>
                    </span>

                    <div className="filterChoice">
                        <span className={`filter--normal ${filter}`} onClick={() => { setFilter("normal") }} ><i className="fas fa-meh"></i></span>
                        <span className={`filter--severe ${filter}`} onClick={() => { setFilter("severe") }} ><i className="fas fa-frown"></i></span>
                        <span className={`filter--critical ${filter}`} onClick={() => { setFilter("critical") }} ><i className="fas fa-dizzy"></i></span>
                        <span className="logoApp">
                            <img src={logoApp} alt="" />
                        </span>
                    </div>
                </div>

                <div className="mainPageBottom--right reportList">
                    <div className="reportCount">
                        {/* <p><b>Refresh time:</b> 12:04 _ 12 THG 06 , 2025</p> */}
                        <p>
                            <b>Number of reports: </b>
                            {filter == null ? listReport.length : ""}
                            {filter && filterReport[filter] ? filterReport[filter].length : ""}
                        </p>
                    </div>

                    <div className="reportList__title">
                        <span><p>Index</p></span>
                        <span><p>Report Name</p></span>
                        <span><p>Type</p></span>
                        <span><p>Level</p></span>
                        <span><p>Reporter</p></span>
                        <span><p>Time</p></span>
                        <span><p>Position</p></span>
                        <span><p>Img</p></span>
                        <span><p>State</p></span>
                    </div>

                    <div className="reportList__report">
                        {filter ? "" : listReport.map((report, index) => {
                            return (
                                <div key={index} className="reportRow" onClick={() => { handleShowReport(report) }} >
                                    <span><p>{index + 1}</p></span>
                                    <span><p>{report.name}</p></span>
                                    <span><p>{report.type}</p></span>
                                    <span><p>{report.level}</p></span>
                                    <span><p>{report.reporter.name}</p></span>
                                    <span><p>{report.time}</p></span>
                                    <span onClick={(e) => { locateReport(e, report.position) }}>
                                        <p>
                                            <i className="fas fa-thumbtack"></i>
                                        </p>
                                    </span>

                                    <span onClick={(e) => { handleImgCodeShowcase(e, report.imgCode) }}>
                                        <p>
                                            <i className="fas fa-image"></i>
                                        </p>
                                    </span>

                                    <span>
                                        <p>
                                            {report.state == "done" ? (
                                                <i className="fas fa-check"></i>
                                            ) : (
                                                <i className="fas fa-stopwatch"></i>
                                            )}
                                        </p>
                                    </span>

                                </div>
                            )
                        })}

                        {filter && filterReport[filter] ? filterReport[filter].map((report: interface__report__reducer, index: number) => {
                            return (
                                <div key={index} className="reportRow" onClick={() => { handleShowReport(report) }} >
                                    <span><p>{index + 1}</p></span>
                                    <span><p>{report.name}</p></span>
                                    <span><p>{report.type}</p></span>
                                    <span><p>{report.level}</p></span>
                                    <span><p>{report.reporter.name}</p></span>
                                    <span><p>{report.time}</p></span>
                                    <span onClick={(e) => { locateReport(e, report.position) }}>
                                        <p>
                                            <i className="fas fa-thumbtack"></i>
                                        </p>
                                    </span>

                                    <span onClick={(e) => { handleImgCodeShowcase(e, report.imgCode) }}>
                                        <p>
                                            <i className="fas fa-image"></i>
                                        </p>
                                    </span>

                                    <span>
                                        <p>
                                            {report.state == "done" ? (
                                                <i className="fas fa-check"></i>
                                            ) : (
                                                <i className="fas fa-stopwatch"></i>
                                            )}
                                        </p>
                                    </span>
                                </div>
                            )
                        })
                            : ""}
                    </div>
                </div>
            </div>

            {!isManageStaff ? "" : (
                <ManageStaff closeManageStaff={closeManageStaff} />
            )}

            {!isReportForm ? "" : (
                <ReportForm closeReportForm={handleCloseReportForm} report={reportForShowcase!} reportID={reportForShowcase?.reportID!} />
            )}

            {imgCodeShowcase == "" ? "" : (
                <div className="imgReportShowcaseContainer">
                    <div className="imgReportShowcaseForm" ref={imgShowcaseForm}>
                        <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/report/${imgCodeShowcase}`} alt="" />
                    </div>
                </div>
            )}


        </div>
    )
}

export default MainPage