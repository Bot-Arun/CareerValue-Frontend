import React, { useState } from "react";
import {IoNotificationsSharp, IoTriangle} from 'react-icons/io5'
import { HiHome } from "react-icons/hi";
import { ImLifebuoy, ImProfile } from "react-icons/im";
import { RiQuestionnaireFill } from "react-icons/ri";
import { BiPoll } from "react-icons/bi";
import { BsTagsFill } from "react-icons/bs";
import { FaSearch, FaTrophy } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { MdFolderShared } from "react-icons/md";
type bval = "yes" | "no" | ""
function App() {
  const [selected, setSelected] = useState<bval>("")
  return (
    <div className="h-screen">
      <header className=" p-10 bg-[#272930] flex">
        <div className="w-[28%]">

        </div>
        <div className=" text-white font-bold  w-[44%] self-center flex justify-between ">
          <section className="my-auto">
            <a href="" className="mr-10 text-xl">
              Home
            </a>
            <a href="" className="mr-10 text-xl">
              About
            </a>
            <a href="" className="mr-10 text-xl">
              Blog
            </a>
            <a href="" className="mr-10 text-xl">
              Contact
            </a>
          </section>
          <section className=" flex justify-end px-2 bg-[#202228]">
            <input
              type="text"
              placeholder="Type somthing to search"
              className="bg-[#202228] text-gray-300 px-3 py-1 focus:outline-none enabled:border-gray-700 border-black"
            >
            </input>
              <FaSearch className="self-center" size={18}> </FaSearch>
          </section>
        </div>
        <div className="w-[28%] flex">
          <div className=" w-10 ml-20" >
          <div className="dropdown dropdown-bottom">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="favicon.ico" alt="" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
          </div>
          <div className="ml-4 text-sm" >
            <div className="text-gray-400 " >Logged in as </div>
            <div className="font-bold text-white">Arun Mugunthan</div>
            
          </div>
          <div className="dropdown">

          </div>
          <div className="self-center ml-4">
            <IoNotificationsSharp className="text-gray-400" size={24}></IoNotificationsSharp>
          </div>
        </div>
      </header>
      <main className="flex h-full ">
        <section className="w-[28%]  p-10 text-black justify-end bg-[#f2f2f2] flex ">
          <section  className="flex flex-col text-lg font-bold w-[200px]">
            <a href="" className="text-blue-500 py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><HiHome className="self-center mr-2" size={24}></HiHome> <span>Home</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><ImProfile className="self-center mr-2" size={24}></ImProfile> <span>User Profile</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><MdFolderShared className="self-center mr-2" size={24}></MdFolderShared> <span>Communities</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><RiQuestionnaireFill className="self-center mr-2" size={24}></RiQuestionnaireFill> <span>Question</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><BiPoll className="self-center mr-2" size={24}></BiPoll> <span>Polls</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><BsTagsFill className="self-center mr-2" size={24}></BsTagsFill> <span>Tags</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><FaTrophy className="self-center mr-2" size={24}></FaTrophy> <span>Badges</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><ImUsers className="self-center mr-2" size={24}></ImUsers> <span>Users</span> </a>
            <a href="" className="py-2 flex mt-3 hover:bg-gray-300 px-4 rounded-lg"><ImLifebuoy className="self-center mr-2" size={24}></ImLifebuoy> <span>Help</span> </a>

          </section>
        </section>
        <section className="w-[44%] ">
          <div className="flex-row px-2 flex h-fit text-gray-500 font-bold">
            <a className="px-5 py-7 text-black border-b-4 border-black ">Recent Question</a>
            <a className="px-5 py-7 ">Most Answered</a>
            <a className="px-5 py-7 ">Recent Answers</a>
            <a className="px-5 py-7 ">Most Visited</a>
            <a className="px-5 py-7 ">Most Voted</a>
          </div>
          <div className="questions flex">
            <div className="question flex w-full bg-gray-20 border-2" >
              <div className="w-40 flex flex-col ">
                <div className=" self-center  my-5 ">
                    <img src="favicon.ico" className="rounded-full"  alt="" />
                </div>
                <div className="flex flex-col">
                  <IoTriangle className="self-center my-2 hover:bg-gray-200 rounded-md" size={25} onClick={()=> setSelected( selected=== 'yes'? '':'yes')} color={selected==='yes'? "green" :"#677075"}   ></IoTriangle>
                  <span className="self-center text-2xl font-bold text-[#677075]"   >21</span>
                  <IoTriangle className="self-center my-2 rotate-180 hover:bg-gray-200 rounded-md" size={25} onClick={()=> setSelected( selected=== 'no'? '':'no')} color={ selected === 'no'?"red": "#677075"}  ></IoTriangle>
                </ div>
              </div>
              <div className="content flex-col w-full flex py-3">
                <div className="time and date flex" >
                <span className="tag px-2 py-1 bg-red-500 text-white font-medium"> Teacher</span>
                <span className=" px-2 self-center"> Asked March 28,2018</span>
                <span className="text-blue-400 px-2 self-center "> in Movies,Seris</span>

                </div>
                <div className="question text-2xl pr-5 py-3 font-bold text-black">
                  How to Claim OD ?
                </div>
                <div className="answer text-lg pr-5 py-3 font-medium text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nihil ut obcaecati corrupti nemo error vel unde suscipit, deleniti aliquid! Officiis voluptatum praesentium, dolorum ullam quibusdam suscipit perspiciatis nemo dicta eius sequi consequuntur? Rem, commodi quisquam! Explicabo assumenda, repellat quam, cumque natus accusantium exercitationem quia excepturi facilis corrupti, aut similique!
                </div>
                <div className="flex py-3 px-5 bg-[#f5f5f5] mr-4 my-4 justify-between">
                  <div className="border mr-5 px-2 py-2 bg-white">
                    14 answers
                  </div>
                  <div className="border px-3 mr-auto py-2 bg-white">
                    4 views
                  </div>
                  <div className="border px-3 py-2 bg-black text-white font-bold">
                    Answer
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="question flex w-full bg-gray-20 border-2" >
              <div className="w-40 flex flex-col ">
                <div className=" self-center  my-5 ">
                    <img src="favicon.ico" className="rounded-full"  alt="" />
                </div>
                <div className="flex flex-col">
                  <IoTriangle className="self-center my-2 hover:bg-gray-200 rounded-md" size={25} onClick={()=> setSelected( selected=== 'yes'? '':'yes')} color={selected==='yes'? "green" :"#677075"}   ></IoTriangle>
                  <span className="self-center text-2xl font-bold text-[#677075]"   >21</span>
                  <IoTriangle className="self-center my-2 rotate-180 hover:bg-gray-200 rounded-md" size={25} onClick={()=> setSelected( selected=== 'no'? '':'no')} color={ selected === 'no'?"red": "#677075"}  ></IoTriangle>
                </ div>
              </div>
              <div className="content flex-col w-full flex py-3">
                <div className="time and date flex" >
                <span className="tag px-2 py-1 bg-red-500 text-white font-medium"> Teacher</span>
                <span className=" px-2 self-center"> Asked March 28,2018</span>
                <span className="text-blue-400 px-2 self-center "> in Movies,Seris</span>

                </div>
                <div className="question text-2xl pr-5 py-3 font-bold text-black">
                  How to Claim OD ?
                </div>
                <div className="answer text-lg pr-5 py-3 font-medium text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nihil ut obcaecati corrupti nemo error vel unde suscipit, deleniti aliquid! Officiis voluptatum praesentium, dolorum ullam quibusdam suscipit perspiciatis nemo dicta eius sequi consequuntur? Rem, commodi quisquam! Explicabo assumenda, repellat quam, cumque natus accusantium exercitationem quia excepturi facilis corrupti, aut similique!
                </div>
                <div className="flex py-3 px-5 bg-[#f5f5f5] mr-4 my-4 justify-between">
                  <div className="border mr-5 px-2 py-2 bg-white">
                    14 answers
                  </div>
                  <div className="border px-3 mr-auto py-2 bg-white">
                    4 views
                  </div>
                  <div className="border px-3 py-2 bg-black text-white font-bold">
                    Answer
                  </div>
                </div>
              </div>
            </div>
        </section>
        <section className="w-[28%] p-4 text-black flex flex-col bg-[#f2f2f2] ">
           <div className=" bg-white w-[60%] h-full flex flex-col">
              <button className="bg-blue-500 m-5 text-white text-xl font-bold    py-4">Add A Question</button>
           </div>
        </section>

      </main>
      <footer className="bg-[#272930] px-[200px] pt-20 text-gray-400">
          <div className=" flex justify-around ">
            <div className="text-white flex font-bold  py-10">
              <div className=""><img src="favicon.ico" alt="" /></div>
              <div className="text-gray-400 text-sm w-[300px]">Career Value is the social question and answers engine which will help you establish your community and conneceted with other people.</div>
            </div>
            <div className="">
              <span className="text-white font-bold">Company</span>
              <div className="flex flex-col py-5">
                <div>Meet the Team</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact Us</div>
              </div>
            </div>
            <div className="">
              <span className="text-white font-bold">Legal Stuff</span>
              <div className="flex flex-col py-5">
                <div>Terms of Use</div>
                <div>Privacy Policy</div>
                <div>Cookie Policy</div>
              </div>
            </div>
            <div className="">
              <span className="text-white font-bold">Help</span>
              <div className="flex flex-col py-5">
                <div>Knowledge Base</div>
                <div>Support  </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-around pt-20 pb-5">
            <div className="text-gray-400 self-center">
              @2018 CareerValue. All Rights Reserved
            </div>
            <div className="text-gray-400 self-center">
              with Love by <span className="text-sky-600">Career Value</span>
            </div>
          </div>
      </footer>
      <div className="h-[] text-">

      </div>
    </div>  
  );
}

export default App;
