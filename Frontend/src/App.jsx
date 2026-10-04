import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";
import Mynavbar from "./component/navbar";
import Mylogin from "./Pages/login";
import Myoverview from "./Pages/Overview";
import Mytransaction from "./Pages/Transaction";
import Myanalytics from "./Pages/analytics";
import Mycategories from "./Pages/categories";
import { useNavigate } from "react-router-dom";
import './App.css'
function Layout({
  product,
  setproduct,
  income,
  setincome,
  expense,
  setexpense,
  user,setuser,email,setemail
}) {
  const location = useLocation();
  const navigate=useNavigate();
useEffect(() => {
    const sudahDijalankan = sessionStorage.getItem("sudahDijalankan");

    if (!sudahDijalankan) {
         sessionStorage.setItem("sudahDijalankan","true")
         navigate("/login");
        
    }
}, [navigate]);

  if (location.pathname === "/login") {
    return (
      <Routes>
        <Route path="/login" element={<Mylogin user={user} setuser={setuser} email={email} setemail={setemail}/>} />
      </Routes>
    );
  }
  return (

    <div className="Home">
      <div className="Navbar">
        <Mynavbar user={user} setuser={setuser}email={email} setemail={setemail} />
      </div>

      <div className="Utama">
        <Routes>
          <Route
            path="/"
            element={
              <Myoverview
                product={product}
                setproduct={setproduct}
                income={income}
                expense={expense}
              />
            }
          />

          <Route
            path="/Transaction"
            element={
              <Mytransaction
                product={product}
                setproduct={setproduct}
                income={income}
                setincome={setincome}
                expense={expense}
                setexpense={setexpense}
              />
            }
          />

          <Route
            path="/Analytics"
            element={
              <Myanalytics
                product={product}
                setproduct={setproduct}
              />
            }
          />

          <Route
            path="/Categories"
            element={
              <Mycategories
                income={income}
                setincome={setincome}
                expense={expense}
                setexpense={setexpense}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [product, setproduct] = useState([]);
  const [income, setincome] = useState([]);
  const [expense, setexpense] = useState([]);
  const [user,setuser]=useState("")
  const [email,setemail]=useState("")

  return (
    <BrowserRouter>
      <Layout
        product={product}
        setproduct={setproduct}
        income={income}
        setincome={setincome}
        expense={expense}
        setexpense={setexpense}
        user={user}
        setuser={setuser}
        email={email}
        setemail={setemail}
      />
    </BrowserRouter>
  );
}

export default App;