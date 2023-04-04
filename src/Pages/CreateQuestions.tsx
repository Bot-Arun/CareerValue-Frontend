import { useState, useEffect } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { NavBar } from "../components/NavBar"
import { QuestionForm } from "../components/QuestionForm"
import { Link } from "react-router-dom"

export const Questions = () => {
  
    
    return (
      <>
      <Header/>
        <main className="flex flex-row">
        <NavBar/>
        <div className="w-[48%] bg-">
          <QuestionForm></QuestionForm>
        </div>
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