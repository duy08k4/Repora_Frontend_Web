// Import libraries
import type React from "react"

// Import component
import Footer from "../../components/footer/Footer.comp"

// Import image
import TrafficIncident from "../../assets/traffic_img.png"
import AdminWeb from "../../assets/Repora_admin_img_Demo.png"
import StaffMobile from "../../assets/Repora_Staff_Demo.png"
import ReporterMobile from "../../assets/Repora_reporter_img.png"

// Import interface
import type { interface_HomePage_Props } from "../../type/interface_HomePage"

// Import css
import "./Home.page.css"

const HomePage: React.FC<interface_HomePage_Props> = ({ loginFunc }) => {
    return (
        <div className="homPage">
            <div className="homPage__element homPage__introduce">
                <div className="homPage__introduce__infoContainer">
                    <h1>Repora</h1>

                    <p>
                        Repora includes a Web platform for admins to manage
                        incident reports and assign staff, and a Mobile App for
                        users to submit incidents and for staff to receive tasks and
                        update status. The system helps organizations handle incidents faster,
                        stay organized, and ensure timely responses from the right teams.
                    </p>

                    <button onClick={loginFunc}>Get started</button>
                </div>

                <div className="homPage__introduce__imgContainer">
                    <img src={TrafficIncident} alt="Traffice Incident" />
                </div>
            </div>

            <div className="homPage__element homPage__element__platformFeature">
                <h1>Platform</h1>
                <div className="platformImgContainer">
                    <div className="platformImgContainer__element platformImgContainer--web">
                        <h2>WEB - ADMIN</h2>
                        <img src={AdminWeb} alt="" />
                    </div>

                    <div className="platformImgContainer__element platformImgContainer--mobile">
                        <div className="platformImgContainer--mobile--staff">
                            <h2>MOBILE - USER</h2>
                            <img src={ReporterMobile} alt="" />
                        </div>
                        
                        <div className="platformImgContainer--mobile--user">
                            <h2>MOBILE - STAFF</h2>
                            <img src={StaffMobile} alt="" />
                        </div>

                    </div>
                </div>
            </div>

            <div className="homPage__element homPage__element__benifit">
                <h1>benifits</h1>
                <div className="benifitContainer">
                    <div className="benifit">
                        <i className="fas fa-bolt"></i>
                        <p>Resolve incidents faster</p>
                    </div>

                    <div className="benifit">
                        <i className="fas fa-box"></i>
                        <p>Organized incident handling</p>
                    </div>

                    <div className="benifit">
                        <i className="fas fa-clock"></i>
                        <p>Prompt incident reply</p>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default HomePage