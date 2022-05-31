import { useState,useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import { RestaurantDetails } from './components/RestaurantDetails';

function App() {
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [data,setData] = useState([]);
  const [page,setPage] = useState(1)
  const [ratingOrder,setRatingOrder] = useState("asc");
  const [costOrder,setCostOrder] = useState("asc")
  const [filterRating,setFilterRating] = useState(0);
  const [q,setQ] = useState("")
  const [text,setText] = useState("");
  const [cash,setCash] = useState("null")
  const [card,setCard] = useState("null")
  const [upi,setUpi] = useState("null")
  

  useEffect(()=>{
   FetchData({page,ratingOrder,costOrder,filterRating,q,cash,card,upi})
  },[page,ratingOrder,costOrder,filterRating,q,cash,card,upi])

  const FetchData = async({page,ratingOrder,costOrder,filterRating,q,cash,card,upi})=>{
    setLoading(true);
    const paramsForPayment={}
    if(cash!==null)paramsForPayment["paymentMethods.cash"]=cash;
    if(card!==null)paramsForPayment["paymentMethods.card"]=card;
    if(upi!==null)paramsForPayment["paymentMethods.upi"]=upi;
    axios({
      method:"GET",
      url:" http://localhost:8010/food",
      params:{
        _page:page,
        _limit:5,
        _sort:"rating,cost",
        _order:`${ratingOrder},${costOrder}`,
        rating_gte:filterRating,
        q:q,
        ...paramsForPayment
      }
    })
    .then((res)=>{
      setData(res.data)    
      setLoading(false)
    })
    .catch((err)=>{
      setError(true)
      setLoading(false)
    })
  }

  console.log(data)

  return (
    <div className="App">
        <div> <h1>Swiggy</h1></div>
        <div>
          {loading && <div>...loading</div>}
          <div>
            <input value={text}  onChange={(e)=>setText(e.target.value)} ></input>
            <button onClick={()=>setQ(text)} >Search</button>
          </div>
          <div>
            <button disabled={ratingOrder==="desc"} onClick={()=>setRatingOrder("desc")} >SORT BY RATING DESC</button>
            <button disabled={ratingOrder==="asc"} onClick={()=>setRatingOrder("asc")} >SORT BY RATING ASC</button>
          </div>
          <div>
            <h4>Filter Ratings</h4>
            <button onClick={()=>setFilterRating(4)} >greater than 4</button>
            <button onClick={()=>setFilterRating(3)} >greater than 3</button>
            <button onClick={()=>setFilterRating(2)} >greater than 2</button>
            <button onClick={()=>setFilterRating(1)} >greater than 1</button>
            <button onClick={()=>setFilterRating(0)} >All</button>
          </div>
          <div>
            <button disabled={costOrder==="desc"} onClick={()=>setCostOrder("desc")} >SORT BY COST DESC</button>
            <button disabled={costOrder==="asc"} onClick={()=>setCostOrder("asc")} >SORT BY COST ASC</button>
          </div>
          <div>
            <button disabled={page===1} onClick={()=>setPage(page-1)} >Prev</button>
           <Pagination currentPage={page} lastPage={5} onPageChange={setPage} />
            <button onClick={()=>setPage(page+1)} >Next</button>
          </div>
          <div>
            <h4>Cash Payment</h4>
            <button onClick={()=>setCash(!cash)} >Cash - {cash?"true":"false"} </button>
            <button onClick={()=>setCard(!card)} >Card - {card?"true":"false"}</button>
            <button onClick={()=>setUpi(!upi)} >Upi - {upi?"true":"false"}</button>
          </div>
      {data.map((item)=>(
        <RestaurantDetails key={item.id} {...item} />
      ))}
       </div>
    </div>
  )
}

const Pagination =({
  currentPage,lastPage,onPageChange
})=>{
  const arr = new Array(lastPage).fill(0)
    return(
      <div>
        {
          arr.map((item,page)=>(
            <button onClick={()=>onPageChange(page+1)} disabled={(page+1)===currentPage}  >{page+1}</button>
          ))
        }
      </div>
    )
}

export default App
