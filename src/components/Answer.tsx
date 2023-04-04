import { useState, useEffect } from "react"
import { IoTriangle } from "react-icons/io5"
import { useAppSelector } from "../app/hooks"

export const Answer = ({data,pk}:any) => {
    type bval = "yes" | "no" | ""
    const [selected, setSelected] = useState<bval>(data.your_vote)
    const [loading  , setLoading  ] = useState<boolean>(false)
    const [likeCount, SetlikeCount] = useState(0)
    const jwt = useAppSelector(state => state.jwt)
    useEffect(() => {
        if (jwt) {
        setLoading(true) ;
        fetch(`http://127.0.0.1:8000/question/${pk}/${data.pk}/like/`, {
            method:'POST',
            body:JSON.stringify({
            credential:jwt,
            option:selected
            })
        } )
        .then( x => { if (x.status !==200 ) setSelected("") ; return x.json()} )
        .then(x => {SetlikeCount(x['likes']);console.log(x['likes'],x)})
        .catch(x =>setSelected(""))
        .finally(() => setLoading(false))
        }
    }, [selected])
  
    return (
        <div className="answer flex flex-row">
            <div className="w-40 flex flex-col justify-start  ">
                <div className=" self-center  my-5 ">
                    <img src={data.url} referrerPolicy="no-referrer" className="rounded-full w-20" alt="" />
                </div>
                <div className="flex flex-col">
                <IoTriangle className="self-center my-2 hover:bg-gray-200 rounded-md" size={25} onClick={() => setSelected((selected!==undefined?selected:data.your_vote) === 'yes' && !loading ? '' : 'yes')} color={(selected!==undefined?selected:data.your_vote) === 'yes' && !loading ? "green" : "#677075"}></IoTriangle>
                <span className="self-center text-2xl font-bold text-[#677075]"> { likeCount ? likeCount: data?.votes }</span>
                <IoTriangle className="self-center my-2 rotate-180 hover:bg-gray-200 rounded-md" size={25} onClick={() => setSelected((selected!==undefined?selected:data.your_vote) === 'no' && !loading ? '' : 'no')} color={(selected!==undefined?selected:data.your_vote) === 'no' && !loading ? "red" : "#677075"}></IoTriangle>
                </div>
            </div>
            <div className="content text-xl self-start mt-5 flex-col w-full flex py-3">
                <div className="font-bold justify-between text-xl mb-3 flex flex-row">
                    <span>{data.name}</span>
                     <span className="mx-4 font-medium text-blue-500 text-lg italic"> Answered {data.date.slice(0,10)}</span>
                </div>
            {data.text}
            </div>
        </div>
    )
}