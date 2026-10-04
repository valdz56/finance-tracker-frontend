import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,PieChart,Cell
} from "recharts";
import './analytics.css'
import { PiWalletFill } from "react-icons/pi";
import { FaArrowTrendUp, FaArrowTrendDown, FaP } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import {  FaPiggyBank } from "react-icons/fa6";

import ProgressBar from "@ramonak/react-progress-bar";
function Myanalytics({product,setproduct,income,setincome,expense,setexpense}){
    const income1 = product.filter(item => item.type === "Income").reduce((total, item) => total + Number(item.amount), 0);
    const expense1=product.filter(item=>item.type==='Expense').reduce((total,item)=>total+Number(item.amount),0)
  const chartData = product.map((item) => ({
  date: item.date,
  income: item.type === "Income" ? Number(item.amount) : 0,
  expense: item.type === "Expense" ? Number(item.amount) : 0,
}));

const chartExpense = product
  .filter(item => item.type === "Expense")
  .reduce((total, item) => {
    const existing = total.find(
      data => data.category === item.category
    );

    if (existing) {
      existing.amount += Number(item.amount);
    } else {
      total.push({
        category: item.category,
        amount: Number(item.amount),
      });
    }

    return total;
  }, [])
  .sort((a, b) => b.amount - a.amount);
const totalExpense = chartExpense.reduce(
  (total, item) => total + item.amount,
  0
);
const sekarang= new Date();
const tujuhharilalu= new Date();
tujuhharilalu.setDate(sekarang.getDate()-7)

const semingguini= product.filter((item)=>item.type==="Expense").filter((item)=>{
    const tanggal=new Date(item.date);
    return tanggal>=tujuhharilalu && tanggal<=sekarang
})
const semingguitu= product.filter((item)=>item.type==="Income").filter((item)=>{
    const tanggal=new Date(item.date);
    return tanggal>=tujuhharilalu && tanggal<=sekarang
})


const bapakkau= semingguini.reduce((total,item)=>total+Number(item.amount),0)
const mamakau=semingguitu.reduce((total,item)=>total+Number(item.amount),0)
const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
};
const pengeluaranterbesar= product.filter((item)=>item.type==="Expense").reduce((max,curr)=>Number(curr.amount)>max?Number(curr.amount):max,0)

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

  return(
        <div>
            <div className="header">
                <h1>Analytics</h1>
                <p>Your financial overview</p>
            </div>
            <div className="information">
                <div className="totalbalance">
                  <div className="titod1">
                    <p>Total balance</p>
                     <PiWalletFill size={24} color="green"/>
                  </div>
                    <h1> {(income1 - expense1).toLocaleString("id-ID")}</h1>
                </div>
                <div className="incomethis">
                  <div className="titod2">
                    <p>Income this month</p>
                    <FaArrowTrendUp size={24} color="green"/>
                  </div>
                    <h1>{income1.toLocaleString("id-ID")}</h1>
                </div>
                <div className="expensethis">
                  <div className="titod3">
                    <p>Expense this month</p>
                     <FaArrowTrendDown size={24} color="red"/>
                  </div>
                    <h1>{expense1.toLocaleString("id-ID")}</h1>
                </div>
            </div>
          <div className="chart">

    {/* LINE CHART */}
    <div className="chartbatang">
    
        <h1>Income VS Expense</h1>
        <ResponsiveContainer width="100%" height="70%">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#22c55e"
                    strokeWidth={4}
                />

                <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#ef4444"
                    strokeWidth={4}
                />
            </LineChart>
        </ResponsiveContainer>
     
    </div>

    {/* PIE CHART */}

 <div className="categorychart">
    <h1>Expense Category</h1>
    <ResponsiveContainer width="100%" height="70%">

        <PieChart>

            <Pie
                data={chartExpense}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="45%"
                outerRadius={95}
                innerRadius={45}
            >

                {chartExpense.map((item, index) => (

                    <Cell
                        key={item.category}
                        fill={COLORS[index % COLORS.length]}
                    />

                ))}

            </Pie>

            <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                    paddingTop: 12,
                    fontSize: 13,
                    lineHeight: "20px",
                }}
                formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontWeight: 500 }}>
                        {value}
                    </span>
                )}
            />

            <Tooltip
                content={({ active, payload }) => {

                    if (!active || !payload?.length) return null;

                    const item = payload[0].payload;

                    return (
                        <div
                            style={{
                                background: "#fff",
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "8px",
                                color: "#111827"
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: 600 }}>{item.category}</p>
                            <p style={{ margin: 0 }}>Rp {item.amount.toLocaleString("id-ID")}</p>
                        </div>
                    );

                }}
            />

        </PieChart>

    </ResponsiveContainer>

</div>

</div>

<div className="suggestion">

    <div className="topspending">
            <div className="judulspending">
                <h1>Top spending categories</h1>
            </div>
        {chartExpense.map((item) => {

            const percent = (item.amount / totalExpense) * 100;

            return (

                <div className="progressCard" key={item.category}>

                    <div className="progressHeader">

                        <span>{item.category}</span>

                        <span>{percent.toFixed(0)}%</span>

                    </div>

                    <div className="progressBar">

                        <div
                            className="progressFill"
                            style={{
                                width: `${percent}%`
                            }}
                        ></div>

                    </div>

                    <p>Rp {item.amount.toLocaleString("id-ID")}</p>

                </div>

            );

        })}

    </div>

    <div className="insight">
        <div className="judulinsight">
             <div className="iconinsight">
                <FaLightbulb color="yellow" size={18}/>
            </div>
            <h1>Insights</h1>
        </div>
        <div className="total">
             <div className="pengeluarann">
                <div className="shopping">
                 <FaCartShopping size={20}/>
                </div>
                 <p>Pengeluaran minggu ini:{formatRupiah(bapakkau)}</p>
             </div>
             <div className="pengeluaranterbesar">
                <div className="trendup">
                  <FaArrowTrendUp size={20} />
                </div>
                 <p>Pengeluaran terbesar:{formatRupiah(pengeluaranterbesar)}</p>
             </div>
             <div className="saving"> 
                <div className="bank">
                <FaPiggyBank size={20}/>
                </div>
                <p>Simpanan minggu ini:{formatRupiah(mamakau-bapakkau)}</p>
            </div>
        </div>
    </div>

</div>
        </div>
  )
}
export default Myanalytics