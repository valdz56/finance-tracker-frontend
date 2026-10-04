import { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Mylogin.css'


function Todlogin({user,setuser,email,setemail}){
     const [showPassword, setShowPassword] = useState(false);
     const [message, setMessage] = useState("");
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
     const [formlogin,setformlogin]=useState({
            email:"",
            password:"",
          })
                const handlechange=(e)=>{
        setformlogin(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
      }
const formsubmitnih = async () => {
    setLoading(true)
    try {
        const response = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formlogin)
            }
        );

        console.log("Status:", response.status); // <- ini yang kamu cari

        const data = await response.json(); // baca body JSON dari backend
        console.log("Data:", data);
        
        if (!response.ok) {
            setMessage("Password salah")
            setSuccess(false)
            return;
        }

        // kalau berhasil (status 200)
        console.log("Login berhasil:", data.user);
        setSuccess(true)
        setMessage("Login berhasil, selamat datang kembali!!!")
        setTimeout(() => {
          navigate("/");
            }, 1000);
    
        localStorage.setItem("username",data.user.username)
        localStorage.setItem("email", data.user.email)
        localStorage.setItem("user_id", data.user.id)
    } catch (err) {
        console.error("Gagal fetch:", err);
        setMessage("gagal bos")
    }
    finally {
        setLoading(false)
    }
};
  return (
  <div className="tampilann">
    <div className="inti">
      <div className="email">
        <h4>Email</h4>
        <input
          placeholder="yournameexample@gmail.com"
          value={formlogin.email}
          name="email"
          onChange={handlechange}
        />
      </div>

      <div className="tid">
        <h4>Password</h4>

        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formlogin.password}
            name="password"
            onChange={handlechange}
          />

          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <div className="submit">
        <button onClick={formsubmitnih} disabled={loading}>
          {loading ? "Log In..." : "Login In"}
        </button>
      </div>

      {message && (
        <div className={success ? "success-box" : "error-box"}>
          {success ? "✅" : "❌"} {message}
        </div>
      )}
    </div>
  </div>
);
}
export default Todlogin