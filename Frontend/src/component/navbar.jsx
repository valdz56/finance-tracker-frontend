import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { HiTag } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import "./navbar.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Mynavbar({user,setuser,email,setemail}) {
    useEffect(()=>{
    const username = localStorage.getItem("username");
    const emaill = localStorage.getItem("email");

    if (username) {
        setuser(username);
    }

    if (emaill) {
        setemail(emaill);
    }
    },[])
    const Navigate=useNavigate();
    const palabapakku=()=>{
        setuser("")
        setemail("")
        localStorage.setItem("username","")
        localStorage.setItem("emai","")
         setTimeout(() => {
          Navigate("/login");
            }, 1000);
    }
    return (
        <div className="Navbar">

            <div className="logo">
                <div className="logo-icon">
                    <FaChartLine />
                </div>

                <h2>Finance Tracker</h2>
            </div>

            <div className="profile">
                <div className="avatar">
                    V
                </div>
                    <NavLink to="/login">
                     <div>
                          <h4>{user}</h4>
                          <p>{email}</p>
                     </div>
                     </NavLink>
            </div>

            <div className="menu-title">
                MENU
            </div>

            <nav>
                <ul>

                    <li>
                        <NavLink to="/">
                            <MdDashboard />
                            Overview
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/Transaction">
                            <TbArrowsExchange />
                            Transactions
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/Analytics">
                            <IoAnalytics />
                            Analytics
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/Categories">
                            <HiTag />
                            Categories
                        </NavLink>
                    </li>

                </ul>
            </nav>

            <button onClick={palabapakku}className="logout">
                <FiLogOut />
                Logout
            </button>

        </div>
    );
}

export default Mynavbar;