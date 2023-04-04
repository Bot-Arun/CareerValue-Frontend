import { useEffect, useState } from "react"
import { IoTriangle } from "react-icons/io5"
import { useAppSelector } from "../app/hooks"
import { Link } from "react-router-dom"
import { Answer } from "./Answer"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser'
export const QuestionwithAnswer = ({data}:any) => {

  type bval = "yes" | "no" | ""
  const [selected, setSelected] = useState<bval>(data.your_vote)
  const [loading  , setLoading  ] = useState<boolean>(false)
  const [likeCount, SetlikeCount] = useState(0)
  const jwt = useAppSelector(state => state.jwt)
  useEffect(() => {
    if (jwt) {
      setLoading(true) ;
      fetch('http://127.0.0.1:8000/like/', {
        method:'POST',
        body:JSON.stringify({
          credential:jwt,
          pk:data.pk,
          option:selected,
        })
      } )
      .then( x => { if (x.status !==200 ) setSelected("") ; return x.json()} )
      .then(x => {SetlikeCount(x['likes']);console.log(x['likes'],x)})
      .catch(x =>setSelected(""))
      .finally(() => setLoading(false))
      console.log(data,'mydata')
    }
  }, [selected])
    const [value, setValue] = useState("")
    useEffect(
      ()=> console.log(value) , [value]
    )
    return (
      <div className=" px-2 text-lg">
          <div   >{Parser(value)}</div>
        <div className=" question flex w-full list-disc ">
            <div className="w-40 flex flex-col ">
              <div className=" self-center  my-5 ">
                <img src={data.url} referrerPolicy="no-referrer" className="rounded-full w-20" alt="" />
              </div>
              <div className="flex flex-col">
                <IoTriangle className="self-center my-2 hover:bg-gray-200 rounded-md" size={25} onClick={() => setSelected((selected!==undefined?selected:data.your_vote) === 'yes' && !loading ? '' : 'yes')} color={(selected!==undefined?selected:data.your_vote) === 'yes' && !loading ? "green" : "#677075"}></IoTriangle>
                <span className="self-center text-2xl font-bold text-[#677075]"> { likeCount ? likeCount: data?.votes }</span>
                <IoTriangle className="self-center my-2 rotate-180 hover:bg-gray-200 rounded-md" size={25} onClick={() => setSelected((selected!==undefined?selected:data.your_vote) === 'no' && !loading ? '' : 'no')} color={(selected!==undefined?selected:data.your_vote) === 'no' && !loading ? "red" : "#677075"}></IoTriangle>
              </div>
            </div>
            <div className="content flex-col w-full flex py-3">
            <div className="font-bold justify-between text-xl mb-1 flex flex-row">                 
              <span>{data.name}</span>
              <span className="mx-4 font-medium text-blue-500 text-lg italic"> Asked {data.date.slice(0,10)}</span>
            </div>
              <Link to={'/question/'+ data.pk } >
                <div className="question text-2xl  pr-5 py-3 font-bold text-black">
                  <span>
                    {data?.title}
                  </span>
                  <span className="ml-10 badge-lg badge badge-accent">{data.domain}</span>
                </div>
              </Link>
              <div className="answer text-lg my-auto pr-5 py-3 font-medium text-gray-700">
                {data.detailed_question}
              </div>
            </div>
          </div>
              <div className="py-3 px-5  mr-4 my-4 justify-between">
                <div className="text-2xl font-bold my-4">
                  Answers
                </div>
                <div className="bg-gray-100 py-2 shadow-lg my-2 rounded-3xl">
                  {data.answers && data.answers.map( (x:any) => <Answer data={x} pk={data.pk}/>)}
                </div>
                
              </div>
              <div className="p-5 pb-20 rounded-3xl my-3 bg-gray-100">
                <div className="text-2xl flex justify-between font-semibold p-3 mb-5" >
                  <span>Post your answer here  </span>
                  <button className="btn btn-success">Post</button>
                  </div>
                <ReactQuill theme="snow" className="h-[210px] text-xl" value={value} onChange={setValue} />

              </div>
      </div>
    )
}