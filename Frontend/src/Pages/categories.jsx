import { useEffect, useState } from "react"
import './categories.css'
import { FaXmark } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
function Mycategories({income,setincome,expense,setexpense}){
    const [muncul,setmuncul]=useState(false);
    const [jenis,setjenis]=useState("")
    const [kitod,setkitod]=useState("")
     const getCategories = async () => {

        try {

            const user_id = localStorage.getItem("user_id");

            const response = await fetch(
    `http://localhost:3000/categories/${user_id}`
);

            const result = await response.json();

            const incomeData = result.filter(
                item => item.type === "Income"
            );

            const expenseData = result.filter(
                item => item.type === "Expense"
            );

            setincome(incomeData);
            setexpense(expenseData);

        } catch (err) {

            console.log(err);

        }

    };

useEffect(() => {

  
    getCategories();

}, []);
    const addcategorie = async () => {

    if (kitod === "") {
        alert("Choose type");
        return;
    }

    if (jenis === "") {
        alert("Input category");
        return;
    }


    try {

        const response = await fetch("http://localhost:3000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                type: kitod,
                name: jenis
            })
        });
 
        const result = await response.json();
        console.log({result})
     
          getCategories();

    } catch (err) {

        console.log(err);

    }

}

    return(
        <div>
            <div className="head1">
             <div className="bagianatas">
                 <div className="judul1">
                <h1>Categories</h1>
                <p>manage your transaction categories</p>
                </div>
                <div className="button1">
                    <button onClick={()=>setmuncul(!muncul)}>{muncul?"Cancel":"Add Category"}</button>
                </div>
             </div>
                { muncul &&(
                    <div className="adding">
                        <div className="beginning">
                            <h1> New Category</h1>
                        </div>
                        <div className="sectioncategory">
                        <div className="buttonchoose">
                            <button onMouseEnter={()=>setkitod("Income")}className="incomela">Income</button>
                             <button onMouseEnter={()=>setkitod("Expense")} className="expensela">expense</button>
                        </div>
                        <div className="emoji">
                            <input placeholder="input your emmoji"/>
                        </div>
                        <div className="namecategories">
                            <input onChange={(e)=>setjenis(e.target.value)} value={jenis} placeholder="input your categories"/>
                        </div>
                        <div className="buttonadd">
                            <button onClick={addcategorie}>ADD</button>
                        </div>
                        </div>
                    </div>
                )
                }
        <div className="kelasincomeexpense">
                <div className="bagianincome">
                          <div className="judulincome">
                                <div className="judulta">
                                    <div className="trendupnih">
                                      <FaArrowTrendUp  size={22} color="green"/>
                                    </div>
                                    <h1>income</h1>
                                </div>
                                <p>{income.length} Categories</p>
                            </div>
                <div className="tud1">
                {
                    income.map((item,index)=>(
                        <div className="judulenak" key={index}>
                        <div className="enak">
                         {item.name}
                         </div>
                          <div className="mantap"> default</div>
                        </div>
                    ))
                }
                </div>
                </div>
                      <div className="bagianexpense">
                          <div className="judulexpense">
                                <div className="judulta">
                                    <div className="trendownnih">
                                     <FaArrowTrendDown size={22} color="red" />
                                    </div>
                                <h1>expense</h1>
                                </div>
                                <p>{expense.length} Categories</p>
                          </div>
                <div className="tud2">
                 {
               
                    expense.map((item,index)=>(
                        <div  className="judulenak2" key={index}>
                        <div className="enak2">
                         {item.name}
                         </div>
                         <div className="mantap2"> default</div>
                        </div>
                    ))
                }
                </div>
        </div>
                </div>
            </div>
        </div>
    )
}
export default Mycategories