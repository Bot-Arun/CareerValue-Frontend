import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa"
import { IoNotificationsSharp } from "react-icons/io5"
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

export const  QuestionForm  = () => {
  const [univercities, setUnivercities] = useState<string[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const jwt = useAppSelector(state => state.jwt)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/univercities/')
    .then( x =>x.json())
    .then( x => setUnivercities(x))
  },[])
  const navigate = useNavigate()
  const handlePost = () => {
    fetch('http://127.0.0.1:8000/questions/',{
      method:'POST',
      body:JSON.stringify({
        credential:jwt,
        title:inputRef.current?.value,
        name :selectRef.current?.value,
        detailed_question:textAreaRef.current?.value
      })
    }).then(x =>navigate('/'))
  } 
    return (
      <form className="question bg-gray-100 m-10 rounded-2xl text-gray-800 py-10 px-5">
          <div className="py-5">
            <span className="font-medium px-10 py-5 text-2xl ">University</span>
            <select ref={selectRef} placeholder="Enter university here"  className="font-medium text-md border-gray-400 bg-gray-200 input w-full max-w-xs" name='title' >
              { univercities.map( x => <option value={x}>{x}</option>)}
              {/* {()=> console.log(univercities)} */}
            </select>
          </div>
          <div className="flex flex-row">
            <div className="font-medium px-10 py-5 text-2xl ">Question Tittle</div>
            <input ref={inputRef} type="text" placeholder="Enter title here" className="font-medium text-md border-gray-400 bg-gray-200 input  min-w-[400px] self-center mx-12 px-5 py-2 rounded-lg" name='title' />
          </div>
          <div className="py-5 flex flex-col">
            <div className="font-medium px-10 self-start py-5 text-2xl ">Detailed Question :</div>
            <textarea ref={textAreaRef} className="font-medium text-xl px-10 py-8 border-gray-400 bg-gray-200 border-1 w-[550px] rounded-lg border-2 self-center" name="detailedQuestion" id="" cols={30} rows={9}></textarea>
          </div>
         <div className="flex justify-center py-10">
          <button className="btn btn-info " onClick={x => {x.preventDefault() ; handlePost()}} type="submit">Post</button>

         </div>
         </form>    
      )
}