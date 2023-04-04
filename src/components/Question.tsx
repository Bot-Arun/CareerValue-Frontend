import { useEffect, useState } from "react"
import { IoTriangle } from "react-icons/io5"
import { useAppSelector } from "../app/hooks"
import { Link, NavLink, useNavigate } from "react-router-dom"
import Parser from 'html-react-parser'
import  { Modal, Button} from 'react-daisyui'
import { getUserInfo } from "../reducers/userControl"
export const Question = ({data,your_vote,refresh,setRefresh}:any) => {

  type bval = "yes" | "no" | ""
  const [selected, setSelected] = useState<bval>(your_vote)
  const [loading  , setLoading  ] = useState<boolean>(false)
  const [likeCount, SetlikeCount] = useState(0)
  const jwt = useAppSelector(state => state.jwt)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const handleDeletePost = () => {
    setVisible(false);
    fetch(`http://127.0.0.1:8000/question/${data.pk}/delete/`, {
        method:'POST',
        body:JSON.stringify({
          credential:jwt,
        })
      } ).then (()=> setRefresh(refresh+1))
  } 
  useEffect(() => {
    if (jwt) {
      setLoading(true) ;
      fetch('http://127.0.0.1:8000/question/like/', {
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
            <div className="font-bold justify-between text-xl mb-1 flex flex-row">                 
              <span>{data.name}</span>
              <span className="mx-4 badge-ghost badge-lg badge"> Asked {data.date.slice(0,10)}</span>
            </div>
              <NavLink to={'/question/'+ data.pk } >
                <div className="question text-2xl  pr-5 py-3 font-bold text-black">
                  <span>
                    {data?.title}
                  </span>
                  <span className="ml-10 badge-lg badge badge-outline badge-primary">{data.domain}</span>
                </div>
              </NavLink>
              <div className="answer text-lg pr-5 py-3 font-medium text-gray-700">
                {Parser(data.detailed_question)}
              </div>
              <div className="flex py-3 px-5 mr-4 my-4 justify-end">
                  {getUserInfo(jwt).picture === data.url && <button onClick={()=> setVisible(true)} className="btn mr-3 btn-error">Delete</button>}
                  <button className="btn " onClick={()=>navigate('/question/'+ data.pk )} >
                    View Answers
                  </button>
              </div>
            </div>
            <Modal open={visible}>
                <Modal.Header>Alert</Modal.Header>
                <Modal.Body>Are you sure want to delete this post {data.pk} ?</Modal.Body>
                <Modal.Actions>
                  <Button className="btn btn-error" onClick={()=> handleDeletePost()} >Confirm</Button>
                  <Button className="btn " onClick={()=> setVisible(false)} >Cancel</Button>
                </Modal.Actions>
              </Modal>
          </div>
    )
}