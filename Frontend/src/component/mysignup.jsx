
import { useState } from "react"
import { FaChartLine } from "react-icons/fa";
import './Mysignup.css'
function Mysignup(){
    const [pesan,setpesan]=useState("")
    const[berhasil,setberhasil]=useState(false)
    const [loding,setloding]=useState(false)
    const [titodpass,settitodpass]=useState(false)
    const [formsignup,setformsignup]=useState({
        username:"",
        email:"",
        password:"",
    })
    const handlechangee=(e)=>{
        setformsignup(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const formsubmitnjay=async()=>{
        setloding(true)
        try{
        const response= await fetch("http://localhost:3000/register",{
            method:"POST",
              headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formsignup)
        })
           const data = await response.json();
          if (!response.ok) {
         setberhasil(false);
         setpesan(data.message);
          return;
            }

        setpesan("selamat, anda berhasil membuat akun")
        setberhasil(true)
    }
    catch(err){
        setpesan("gagal fetch lu")
    }
    finally{
        setloding(false)
    }

    }
    return(
     
             <div>
                     <div className="inti">
                        <div className="tid"> 
                            <h4>Full name</h4>
                            <input placeholder="Your name" value={formsignup.username} name="username" onChange={handlechangee}/>
                        </div>
                         <div className="email">
                             <h4>Email</h4>
                             <input placeholder="yournameexample@gmail.com" value={formsignup.email} name="email" onChange={handlechangee}/>
                         </div>
                         <div className="password">
                             <input
                             type={titodpass? "text" : "password"}
                             placeholder="Password" value={formsignup.password} name="password" onChange={handlechangee}
                             />
                             <button
                             onClick={() => settitodpass(!titodpass)}
                             >
                             {titodpass ? "🙈" : "👁️"}
                             </button>
                         </div>
                      <div className="submit">
                      <button onClick={formsubmitnjay} disabled={loding}>
                      {loding ? "Creating Account..." : "Sign Up"}
                    </button>
                    </div>

                  {pesan && (
                  <div className={berhasil ? "success-box" : "error-box"}>
                  {berhasil ? "✅" : "❌"} {pesan}
                  </div>
                    ) }  
                     </div>
                     
             </div>
    )
    
}
export default Mysignup