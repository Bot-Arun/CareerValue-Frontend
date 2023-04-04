import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa"
import { IoNotificationsSharp } from "react-icons/io5"
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill'

export const  QuestionForm  = () => {
  const [univercities, setUnivercities] = useState<string[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const jwt = useAppSelector(state => state.jwt)
  const [value, setValue] = useState("")
  useEffect(() => {
    fetch('http://127.0.0.1:8000/univercities/')
    .then( x =>x.json())
    .then( x => setUnivercities(x))
  },[])
  const navigate = useNavigate()
  const handlePost = () => {
    fetch('http://127.0.0.1:8000/question/create',{
      method:'POST',
      body:JSON.stringify({
        credential:jwt,
        title:inputRef.current?.value,
        name :selectRef.current?.value,
        detailed_question:value
      })
    }).then(x =>navigate('/'))
  } 
    return (
      <form className="question shadow-xl bg-zinc-100 m-10 rounded-2xl text-black py-10 px-5">
          <div className="py-5">
            <span className="font-semibold px-10 py-5 text-2xl ">University</span>
            <select ref={selectRef} placeholder="Enter university here"  className="font-medium text-md border-gray-400 bg-zinc-50 input w-full max-w-xs" name='title' >
              { univercities.map( x => <option value={x}>{x}</option>)}
              {/* {()=> console.log(univercities)} */}
            </select>
          </div>
          <div className="flex flex-row">
            <div className="font-semibold px-10 py-5 text-2xl ">Question Tittle</div>
            <input ref={inputRef} type="text" placeholder="Enter title here" className="font-medium text-md border-gray-400 bg-zinc-50 input  min-w-[400px] self-center mx-12 px-5 py-2 rounded-lg" name='title' />
          </div>
          <div className="py-5 flex  flex-col">
            <div className="font-semibold px-10 self-start py-5 text-2xl ">Detailed Question :</div>
          <ReactQuill theme="snow" className="px-16 h-[210px] mb-10 text-xl" value={value} onChange={setValue} />
            
          </div>
         <div className="flex justify-center py-10">
          <button className="btn btn-info " onClick={x => {x.preventDefault() ; handlePost()}} type="submit">Post</button>

         </div>
         </form>    
      )
}