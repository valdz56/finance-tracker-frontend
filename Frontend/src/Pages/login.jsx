import { useState } from "react"
import { FaChartLine } from "react-icons/fa"
import Todlogin from "../component/Mylogin";
import Mysignup from "../component/mysignup";
import './Login.css'
function Mylogin({user,setuser,email,setemail}){
    const [sudahsignup, setsudahsignup] = useState(false);

    return(
        <div className="core">
            
                <div className="permulaan">
                          <div className="logo-icon">
                                  <FaChartLine />
                          </div>
                          <div className="judulh1">
                         <h1>Finance Tracker</h1>
                         <p>{sudahsignup?"Login your account":"Create your account"}</p>
                         </div>
              
                 <div className="latar">
                     <div className="mainutama">
                        {sudahsignup? <Todlogin user={user} setuser={setuser} email={email} setemail={setemail} /> :<Mysignup/>}
                     </div>
                     <div className="text">
                         {sudahsignup ? (
                              <p>
                             Don't have an account?{" "}
                             <span onClick={() => setsudahsignup(false)}>
                              Sign Up
                          </span>

                              </p>

                              ) : (
                              <p>
                             Already have an account?{" "}
                            <span onClick={() => setsudahsignup(true)}>
                        Login
                         </span>
                        </p>
                      )}
                      </div>
                </div>
            </div>
        </div>
    )
}
export default Mylogin