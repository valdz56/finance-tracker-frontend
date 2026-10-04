
import { useState } from "react"
import './Overview.css'
import { PiWalletFill } from "react-icons/pi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
function Myoverview({product,income,expense}){
     const [date, setDate] = useState(new Date());
         const income2 = product.filter(item => item.type === "Income").reduce((total, item) => total + Number(item.amount), 0);
    const expense2=product.filter(item=>item.type==='Expense').reduce((total,item)=>total+Number(item.amount),0)
    const[tampilsemua,settampilsemua]=useState(false)
    const dataditampilkan=tampilsemua?product:product.slice(0,3);
    return(

        <div className="Home1">
            <div className="Header">
                <h1>Overview</h1>
                    <p> {date.toLocaleDateString("en-US", {
                         weekday: "long",
                         year: "numeric",
                         month: "long",
                         day: "numeric", })}
                    </p>
            </div>
            <div className="dashboard1">
                <div className="Totalbalance">
                    <div className="iconbalance">
                    <p>Total Balance</p>
                    <div className="balancenih">
                    <PiWalletFill size={24} color="green"/>
                    </div>
                    </div>
                    <h1>{income2-expense2}</h1>
                </div>
                <div className="Income">
                    <div className="iconincome">
                    <p>Income This Month</p>
                    <div className="trendupnih">
                    <FaArrowTrendUp size={24} color="green"/>
                    </div>
                    </div>
                    <h1>{income2}</h1>
                </div>
                <div className="Expenses">
                    <div className="iconexpense">
                    <p>Expenses this month</p>
                    <div className="trenddownnih">
                    <FaArrowTrendDown size={24} color="red"/>
                    </div>
                    </div>
                    <h1>{expense2}</h1>
                </div>
            </div>
            <div className="Transaction">
                <div className="kepala">
                    <h1>Recent Transaction</h1>
                    <button onClick={()=>settampilsemua(!tampilsemua)}>{tampilsemua?"Close":"View all"}</button>
                </div>
                <div className="cug">
                    {dataditampilkan.map((item,index)=>(
                        <div className="bgitulah" key={index}>
                            <div className="judul3">
                            <h1    style={{
                          color: item.type === "Income" ? "#22C55E" : "#EF4444",
                        }}>    {item.type==="Income"?"+ ":"-"}   {Number(item.amount).toLocaleString("id-ID", {
                                  style: "currency",
                                 currency: "IDR",
                                 })}</h1>
                                  <h4 className={item.type==="Expense"?"expenses":"incomen"}>{item.type}</h4>
                            </div>
                            <h3>{item.category}</h3>
                            <div className="khususp">
                            <p>{new Date(item.date).toLocaleDateString("id-ID")}</p>
                            <p>{item.note}</p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Myoverview