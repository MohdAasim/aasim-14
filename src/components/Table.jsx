import React,{useEffect,useState} from 'react'
import axios from 'axios'
export const Table = () => {
    const [state, setstate] = useState([])
    const [inp ,setinp] = useState("")
    const [isavil,setavail] =  useState(true)
    const [selectValue,setselectValue] = useState(" ")
    useEffect( () => {
    const apidata =async ()=>{
      const data = await axios.get('https://api.jsonbin.io/b/615d7a459548541c29bece60/2')
      console.log(data.data)
      setstate(data.data)
    }
    apidata();
    },[isavil])
    const handleEvent =(e)=>{
        setavail(false)
        console.log(e.target.value);
        setinp(e.target.value)
        const data = state.filter((value)=>{
            return value.status.includes(inp)
        })
        setstate(data)
        if(inp.length===1){
            setavail(true)
        }
    }
    const handleChange =(e)=>{
        setavail(false) 
        setselectValue(e.target.value)
       console.log(e.target.value) 
       if(e.target.value==="Phase"){
        setavail(true) 
       const data = state.filter((value)=>{
        return value.phase.includes(selectValue)
       })
      setstate(data)
    }else if(e.target.value==="Active"){
        setavail(true) 
        const data = state.filter((value)=>{
            return value.status.match(selectValue)
           })
          setstate(data)
    }
    //  setavail(false) 
      }
    return (
        <div>
        <input value={inp} onChange={handleEvent} placeholder='searchstatus'/>
        <select value={selectValue} 
        onChange = {handleChange}>
        <option value="Active" >
        status
        </option><option value="Phase">
        phase
        </option>
        </select>
        <div className="card m-2  ">
           <div className="row mt-2 ">
                <div className="col text-center"><p >studyId</p></div>
                <div className="col text-center"><p>status</p></div>
                <div className="col text-center"><p>phase</p></div>
                <div className="col text-center"><p>trialID</p></div>
                </div>
                </div>
        {
        state.map((value)=>{
            return (
                <div className="card m-2  " key={value.trialID}>
                <div className="row mt-2 dropdown dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            
                <div className="col text-center " ><p >{value.studyId}</p></div>
                <div className="col text-center"><p>{value.status}</p></div>
                <div className="col text-center"><p>{value.phase}</p></div>
                <div className="col text-center"><p>{value.trialID}</p></div>
                
                <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                <div className='row '>
                <div className="col text-center " ><p >{value.trialSites.siteId}</p></div>
                <div className="col text-center"><p>{value.trialSites.status}</p></div>
                <div className="col text-center"><p>{value.trialSites.phase}</p></div>
                <div className="col text-center"><p>{value.trialSites.noOfCandidates}</p></div>
                </div>
                </div>
                </div>
                </div>
            )
        })
       
        }  
        </div>
    )
}
export default Table
