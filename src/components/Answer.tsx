import { useState, useEffect } from "react"
import { IoTriangle } from "react-icons/io5"
import { useAppSelector } from "../app/hooks"
import { Modal, Button} from 'react-daisyui'
import Parser from 'html-react-parser'
import { getUserInfo } from "../reducers/userControl"

export const Answer = ({data,pk,refresh,setRefresh}:any) => {
    type bval = "yes" | "no" | ""
    const [selected, setSelected] = useState<bval>(data.your_vote)
    const [loading  , setLoading  ] = useState<boolean>(false)
    const [likeCount, SetlikeCount] = useState(0)
    const [visible, setVisible] = useState(false)
    const jwt = useAppSelector(state => state.jwt)
    const  handleDeleteAnswer = () => {
        setVisible(false)
        fetch(`http://127.0.0.1:8000/answer/${data.pk}/delete/`, {
            method:'POST',
            body:JSON.stringify({
            credential:jwt,
            })
        } )
        .then( () => setRefresh(refresh +1) )
    }
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
        <div className="answer relative my-5 py-3 shadow-lg bg-zinc-100 rounded-3xl flex flex-row">
            <div className="w-40 flex flex-col justify-start  ">
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
            <div className="content  text-xl self-start mt-5 flex-col w-full flex py-3">
                <div className="font-bold justify-between text-xl mb-3 flex flex-row">
                    <span>{data.name}</span>
                     <span className="absolute bottom-5 right-5">{getUserInfo(jwt).picture === data.url && <button onClick={()=> setVisible(true)} className="btn mr-3 btn-error">Delete</button>}</span>
                     <span className="mx-4 badge "> Answered {data.date.slice(0,10)}</span>

                </div>
            {Parser(data.text)}
            </div>
            <Modal open={visible}>
                <Modal.Header>Alert</Modal.Header>
                <Modal.Body>Are you sure want to delete this Answer {data.pk} ?</Modal.Body>
                <Modal.Actions>
                  <Button className="btn btn-error" onClick={()=> handleDeleteAnswer()} >Confirm</Button>
                  <Button className="btn " onClick={()=> setVisible(false)} >Cancel</Button>
                </Modal.Actions>
              </Modal>
        </div>
    )
}