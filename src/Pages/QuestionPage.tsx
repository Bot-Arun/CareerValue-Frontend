import { Link, useParams } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { NavBar } from "../components/NavBar"
import { useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"
import { Question } from "../components/Question"
import { QuestionwithAnswer } from "../components/QuestionwithAnswer"

export const QuestionPage = () => {
    let { id} = useParams()
    const [data, setData] = useState();
    const jwt = useAppSelector( state => state.jwt)
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/question/${id}/`, 
      jwt ?{
        method:'POST',
        body:JSON.stringify({
          credential:jwt,
        })
      }:{})
      .then(x => x.json())
      .then(x => setData(x))
    }, [jwt])
    // useEffect(
    //   ()=>{
    //     console.log(data)
    //   }
    // ,[data])
    return (
        <>
      <Header/>
       <main className="flex h-full bg-[#f2f2f2] ">
      <NavBar/>
      <section className="w-[44%] border-0 my-5 shadow-2xl rounded-3xl bg-white ">
        <div className="questions flex flex-col">
            {data &&<QuestionwithAnswer data={data} ></QuestionwithAnswer>}
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