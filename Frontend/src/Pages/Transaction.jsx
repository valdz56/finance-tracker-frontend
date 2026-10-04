import { useEffect, useState } from "react"
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import './Transaction.css'
import { createPortal } from "react-dom";
function Mytransaction({product,setproduct,income,setincome,expense,setexpense}){
     const [tampil,setTampil]=useState(false)
     const [data,setdata]=useState({
        type:"",
        amount:"",
        category:"",
        date:"",
        note:"",
     })
   
     const getdata=async()=>{
        const user_id=localStorage.getItem("user_id")
        try{
            const datanih= await fetch(
                `http://localhost:3000/transactions/${user_id}`
            );
            const jawaban= await datanih.json();
        
            setproduct(jawaban)
        }
        catch(err){

        }
     }

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
};
const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
};
       
useEffect(() => {

  
    getdata();

}, []);
     const [opsi,setopsi]=useState([])
     const [editIndex, setEditIndex] = useState(null);
     
     const [lagiupdate,setlagiupdate]=useState(false)
    
     const handlechange=(e)=>{
        setdata(prev=>({...prev,[e.target.name]:e.target.value}))
     }
     
     const submitarray=()=>{
        setopsi((prev)=>([...prev,opsitu]))
     }
     const menampilkan=async()=>{
    
        if(data.type===""){
            alert("fill the type please")
            return
        }
        setproduct(prev=>([...prev,data]))
        try{
            

        const response= await fetch("http://localhost:3000/transactions",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            } ,       
            body:JSON.stringify({ user_id: localStorage.getItem("user_id"),...data}),
          
        })
          const data2=await response.json();
          console.log("HASIL BACKEND:", data2);
console.log("ID:", data2.id);


         
          
            console.log(data2)
            
       }
       catch (err){
        console.log(err)
       }
        
        setdata({
            type: "",
           amount: "",
             category: "",
             date: "",
             note: "",
        });
    
     }
      
const updatemenampilkan = async () => {
    setproduct(prev =>
        prev.map((item, index) =>
            index === editIndex ? data : item
        )
    );
        try{
            const tambah= await fetch(`https://finance-tracker-backend-production-c551.up.railway.app/transactions/${data.id}`,{
                method:"PUT",
                  headers:{
                "Content-Type": "application/json"
            } ,  
         body: JSON.stringify(data)
            })
            const hasil=await tambah.json();
            console.log(hasil)
        }
        catch(err){
            console.log(err)
        }
    setlagiupdate(false);
    setEditIndex(null);
}
     const hapus=async(index)=>{
         setproduct(prev =>
        prev.filter((item, i) => i !== index)
    );
    const idmu=product[index].id     
    try{
        const jawaban=await fetch(`https://finance-tracker-backend-production-c551.up.railway.app/transactions/${idmu}`,{
            method:"DELETE"
        })

        const responsemu=await jawaban.json();
        console.log(responsemu)
    }
    catch(err){
        console.log(err)
    }
     
     }
     const updatedata=async(index)=>{
        setlagiupdate(true)
        setEditIndex(index)
        setdata(product[index])
     }
    return(
        <div className="boddy">
            <div className="judul">
                <div className="Pengenalan">
                <h1>Transaction</h1>
                <p>{product.length} records</p>
                </div>
                <div className="Addtransaction">
                    <button onClick={()=>setTampil(true)}>+ Add Transaction</button>
                </div>
            </div>
            <div className="tanggal">
                <button>All types</button>
            </div>
              <table>
                     <thead>
                         <tr>
                          <th>Transaction</th>
                          <th>Amount</th>
                          <th>Category</th>
                          <th>Date</th>
                
                          <th>Actions</th>
                         </tr>
                     </thead>

                      <tbody>
                       {product.map((item, index) => (
                         <tr key={index}>
                         <td>
                             <div className="first-column">
                             <span>{item.note}</span>
                                  <div className={item.type==="Expense"?"expensetu":"incometu"}>
                                 <span>{item.type}</span>
                                 </div>
                             </div>
                        </td>
                         <td>
                            <div className={item.type==="Expense"?"habis":"sisa"}>
                            {item.type==="Expense"?"-":""} {formatRupiah(item.amount)}
                            </div>
                         </td>
                         <td>{item.category}</td>
                         <td>{formatDate(item.date)}</td>
                  
                         <td>
                            <div className="actions">
                            <div className="edit">
                            <FaPenToSquare onClick={()=>{updatedata(index)}} />
                            </div>
                            <div className="hapus">
                            <FaTrashCan onClick={()=>hapus(index)}/>
                            </div>
                            </div>
                         </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            { tampil&& createPortal(
            <div className="overlay">
                <div className="popuphome">
                    <div className="jadoel">
                        <h1>Transaction</h1>
                        <button onClick={()=>setTampil(false)}>X</button>
                    </div>
                    <div className="type">
                        <h4>Type</h4>
                        <div className="typebutton">
                        <button onMouseEnter={()=>setdata(prev => ({...prev, type: "Income"})) } className="incomecug">Income</button>
                         <button onMouseEnter={()=>setdata(prev=>({...prev,type:"Expense"}))} className="expensecug">Expense</button>
                        </div>
                    </div>
                    <div className="Amount">
                        <h4>Amount</h4>
                        <input name="amount" type="number" value={data.amount} onChange={handlechange}placeholder="Amount..."/>
                    </div>
                  <div className="category">
                    <h4>Category</h4>

                 <select
                 name="category"
           value={data.category}
             onChange={handlechange}
>
    <option value="">Choose Category</option>

    {(data.type === "Income" ? income : expense).map((item) => (
        <option
            key={item.id}
            value={item.name}
        >
            {item.name}
        </option>
    ))}
</select>
                    </div>
                    <div className="date">
                        <h4>Date</h4>
                        <input  type="date" name="date" value={data.date} onChange={handlechange}/>
                    </div>
                    <div className="note">
                        <h4>Note(opsional)</h4>
                        <textarea  name="note" value={data.note} onChange={handlechange}/>
                    </div>
                    <div className="Buttonpart">
                        < button onClick={()=>setTampil(false)}>Cancel</button>
                        <button onClick={menampilkan}>Open</button>
                    </div>
                </div>
            </div>,document.body
            )
            }
  { lagiupdate&& createPortal(
            <div className="overlay">
                <div className="popuphome">
                    <div className="jadoel">
                        <h1>Transaction</h1>
                        <button onClick={()=>setlagiupdate(false)}>X</button>
                    </div>
                    <div className="type">
                        <h4>Type</h4>
                        <div className="typebutton">
                        <button onMouseEnter={()=>setdata(prev => ({...prev, type: "Income"})) }  className="incomecug">Income</button>
                         <button onMouseEnter={()=>setdata(prev=>({...prev,type:"Expense"}))} className="expensecug" >Expense</button>
                        </div>
                    </div>
                    <div className="Amount">
                        <h4>Amount</h4>
                        <input name="amount" type="number" value={data.amount} onChange={handlechange}placeholder="Amount..."/>
                    </div>
                  <div className="category">
                    <h4>Category</h4>

                     <select
                     name="category"
                      value={data.category}
                      onChange={handlechange} >
             <option value="">Choose Category</option>
         {(data.type === "Income" ? income : expense).map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
                     ))}
                     </select>
                    </div>
                    <div className="date">
                        <h4>Date</h4>
                        <input type="date" name="date" value={data.date} onChange={handlechange}/>
                    </div>
                    <div className="note">
                        <h4>Note(opsional)</h4>
                        <textarea  name="note" value={data.note} onChange={handlechange}/>
                    </div>
                    <div className="Buttonpart">
                        < button onClick={()=>setlagiupdate(false)}>Cancel</button>
                        <button onClick={updatemenampilkan}>Save Change</button>
                    </div>
                </div>
            </div>,document.body
            )
            }
        </div>
   
    )
}
export default Mytransaction