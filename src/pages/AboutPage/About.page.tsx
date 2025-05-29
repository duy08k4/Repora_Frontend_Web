// Import libraries
import type React from "react"

// Import image
import TBTD from "../../assets/avt_tuongduy.png"
import DPT from "../../assets/avt_phutrong.png"
import NTMU from "../../assets/avt_myuyen.png"
import NAT from "../../assets/avt_anhtuan.jpg"

// Import css
import "./About.page.css"

const teammate_info = [
    {
        name: "Tran Ba Tuong Duy",
        studentID: "22166013 - DH22HM",
        major: "Information Systems",
        role: "Developer & Designer",
        avt: TBTD
    },

    {
        name: "Do Phu Trong",
        studentID: "22166090 - DH22HM",
        major: "Information Systems",
        role: "Developer & Designer",
        avt: DPT
    },

    {
        name: "Nguyen Thi My Uyen",
        studentID: "22166101 - DH22HM",
        major: "Information Systems",
        role: "Developer & Designer",
        avt: NTMU
    },

    {
        name: "Nguyen Anh Tuan",
        studentID: "22166097 - DH22HM",
        major: "Information Systems",
        role: "Developer & Designer",
        avt: NAT
    }
]

const AboutPage: React.FC = () => {
    return (
        <div className="About">
            <h1>GROUP 3</h1>

            <div className="showTeammate">
                {teammate_info.map((teammate, index) => {
                    return (
                        <div key={index} className="teammate">
                            <img src={teammate.avt} alt="" />
                            <div className="teammate__baseInfo">
                                <h3 className="teammate__baseInfo--name">{teammate.name}</h3>
                                <p className="teammate__baseInfo--studentID">{teammate.studentID}</p>
                                <p className="teammate__baseInfo--major">{teammate.major}</p>
                            </div>

                            <p className="role">{teammate.role}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AboutPage