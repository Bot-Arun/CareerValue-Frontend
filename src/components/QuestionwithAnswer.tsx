import { useEffect, useState } from "react"
import { IoTriangle } from "react-icons/io5"
import { useAppSelector } from "../app/hooks"
import { Link, useNavigate } from "react-router-dom"
import { Answer } from "./Answer"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser'
import { getUserInfo } from "../reducers/userControl"
import { LINK } from ".."
export const QuestionwithAnswer = ({data ,refresh,setRefresh}:any) => {

  type bval = "yes" | "no" | ""
  const [selected, setSelected] = useState<bval>(data.your_vote)
  const [loading  , setLoading  ] = useState<boolean>(false)
  const [likeCount, SetlikeCount] = useState(0)
  const navigate = useNavigate()
  const jwt = useAppSelector(state => state.jwt)
  useEffect(() => {
    if (jwt) {
      setLoading(true) ;
      fetch(`${LINK}/question/like/`, {
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
    const handleAnswerPost = () => {
      fetch(`${LINK}/question/${data.pk}/answer/create/`, {
        method:'POST',
        body:JSON.stringify({
          credential:jwt,
          text:value,
        })
      } ).then(x => setValue("")).then(()=> setRefresh(refresh+1))
    }
    return (
      <div className=" px-2 text-lg">
        <div className=" question flex w-full list-disc ">
            <div className="w-40 flex flex-col ">
              <div className="avatar p-7">
                <div className=" mask mask-squircle">
                  <img src={data.url} />
                </div>
              </div>
              <div className="flex flex-col">
                <IoTriangle className="self-center my-2 hover:bg-gray-200 rounded-md" size={25} onClick={() => setSelected((selected!==undefined?selected:data.your_vote) === 'yes' && !loading ? '' : 'yes')} color={(selected!==undefined?selected:data.your_vote) === 'yes' && !loading ? "green" : "#677075"}></IoTriangle>
                <span className="self-center text-2xl font-bold text-[#677075]"> { likeCount ? likeCount: data?.votes }</span>
                <IoTriangle className="self-center my-2 rotate-180 hover:bg-gray-200 rounded-md" size={25} onClick={() => setSelected((selected!==undefined?selected:data.your_vote) === 'no' && !loading ? '' : 'no')} color={(selected!==undefined?selected:data.your_vote) === 'no' && !loading ? "red" : "#677075"}></IoTriangle>
              </div>
            </div>
            <div className="content flex-col w-full flex py-3">
            <div className="font-bold justify-between text-xl pt-3 flex flex-row">                 
              <span className="text-lg font-semibold">{data.name}</span>
              
            </div>
              <Link to={'/question/'+ data.pk } >
                <div className="question text-2xl flex pt-2 pb-10 pr-5  font-bold text-black">
                  <span>
                    {data?.title}
                  </span>
                  <span className="ml-10 badge-lg badge-primary badge badge-outline">{data.domain}</span>
                  <span className="badge ml-auto badge-ghost badge-lg"> Asked {data.date.slice(0,10)}</span>
                </div>
              </Link>
              <div className="answer text-lg my-auto pr-5 py-3 font-medium text-gray-700">
                {Parser(data.detailed_question)}
              </div>
            </div>
          </div>
              <div className="py-3 px-5  mr-4 my-4 justify-between">
                <div className="text-2xl font-bold my-4">
                  Answers
                </div>
                <div className=" py-2 my-2">
                  {data.answers.length >0 && data.answers.map( (x:any) => <Answer refresh={refresh} setRefresh={setRefresh} data={x} pk={data.pk}/>)}
                  {data.answers.length===0 && data &&(
                    <div className="text-xl bg-zinc-100 rounded-3xl shadow-lg text-center text-primary w-full font-bold py-6">
                       No Answers Yet
                    </div>
                  )}
                </div>
                
              </div>
              {getUserInfo(jwt).email !=="" && getUserInfo(jwt).email.slice( getUserInfo(jwt).email.length-data.domain.length )===data.domain && 
              <div className="m-5 mb-10 shadow-xl p-8 pb-20 rounded-3xl my-3 bg-gray-100">
                <div className="text-2xl flex justify-between font-semibold p-3 mb-5" >
                  <span>Post your answer here  </span>
                  <button className="btn btn-primary" onClick={handleAnswerPost} >Post</button>
                  </div>
               <ReactQuill theme="snow" className="h-[210px] text-xl" value={value} onChange={setValue} />

              </div>}
      </div>
    )
}