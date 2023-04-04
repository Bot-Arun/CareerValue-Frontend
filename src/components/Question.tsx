import { useEffect, useState } from "react"
import { IoTriangle } from "react-icons/io5"
import { useAppSelector } from "../app/hooks"
import { Link } from "react-router-dom"

export const Question = ({data,your_vote}:any) => {

  type bval = "yes" | "no" | ""
  const [selected, setSelected] = useState<bval>(your_vote)
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
          option:selected
        })
      } )
      .then( x =>  x.json() )
      .then(x => {SetlikeCount(x['likes']);console.log(x['likes'],x);setSelected(jwt? x['option']:selected )})
      // .catch(x =>setSelected(""))
      .finally(() => setLoading(false))
      console.log(data,'mydata')
    }
  }, [selected])
  
    return (
        <div className="question flex w-full rounded-3xl my-2 bg-white shadow-md ">
            <div className="w-40 flex flex-col ">
              <div className=" self-center  my-5 ">
                <img src={data.url} referrerPolicy="no-referrer" className="rounded-full" alt="" />
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
              <div className="answer text-lg pr-5 py-3 font-medium text-gray-700">
                {data.detailed_question}
              </div>
              <div className="flex py-3 px-5 bg-[#f5f5f5] mr-4 my-4 justify-between">
                <div className="border mr-5 px-2 py-2 bg-white">
                  14 answers
                </div>
                <div className="border px-3 mr-auto py-2 bg-white">
                  4 views
                </div>
                <div className="btn ">
                  Answer
                </div>
              </div>
            </div>
          </div>
    )
}