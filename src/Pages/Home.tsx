import { useEffect, useState } from "react"
import { BiPoll } from "react-icons/bi"
import { BsTagsFill } from "react-icons/bs"
import { FaTrophy } from "react-icons/fa"
import { HiHome } from "react-icons/hi"
import { ImLifebuoy, ImProfile, ImUsers } from "react-icons/im"
import { IoTriangle } from "react-icons/io5"
import { MdFolderShared } from "react-icons/md"
import { RiQuestionnaireFill } from "react-icons/ri"
import { NavBar } from "../components/NavBar"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"
import { Question } from "../components/Question"
import { useAppSelector } from "../app/hooks"

export const Home = () => {
  const jwt = useAppSelector(state => state.jwt)
  const [pools, setPools] = useState<any[]>([])
  const [refresh, setRefresh] = useState(0)
  useEffect(() => {
    console.log(jwt,"changed")
    fetch('http://127.0.0.1:8000/questions/',
    
    jwt ?{
      method:'POST',
      body: JSON.stringify( {
        credential:jwt,
      })
    } : {}
    )
    .then(data =>  data.json())
    .then( data => {
      const result = []
        for (let x of data) {
          result.push({...x})
        }
        setPools([...result])
    } )
  }, [jwt,refresh])
  
    return (
      <>
      <Header/>
       <main className="flex h-full ">
      <NavBar/>
      <section className="w-[44%] ">
        {/* <div className="flex-row px-2 flex h-fit text-gray-500 font-bold">
          <a className="px-5 py-7 text-black border-b-4 border-black ">Recent Question</a>
          <a className="px-5 py-7 ">Most Answered</a>
          <a className="px-5 py-7 ">Recent Answers</a>
          <a className="px-5 py-7 ">Most Visited</a>
          <a className="px-5 py-7 ">Most Voted</a>
        </div> */}
        <div className="questions flex flex-col bg-[#f2f2f2]">
        {pools.length > 0 && pools.map( x  => <Question data={x} refresh={refresh} setRefresh={setRefresh} your_vote={x.your_vote}></Question>) }  
        </div>
      </section>
      <section className="w-[28%] p-4 text-black flex flex-col bg-[#f2f2f2] ">
        <div className=" bg-white  w-[60%] justify-between py-5 h-fit rounded-3xl flex flex-col">
          <div className="text-xl font-bold px-5 mb-5">What to add an Question ? </div>
          <div className="mx-3">
          <Link to='/question'>
            <button className="btn btn-xl w-full  btn-primary">Add A Question</button>  
          </Link>

          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
    )

    }
