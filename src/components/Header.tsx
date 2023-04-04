import { FaSearch } from "react-icons/fa"
import { IoNotificationsSharp } from "react-icons/io5"
import { NavLink } from "react-router-dom"

import { getUserInfo, setJWT } from "../reducers/userControl"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import jwt_decode from 'jwt-decode'
import Cookies from "universal-cookie"


export const Header = () => {
  const jwt = useAppSelector(state => state.jwt)
  const login = useGoogleLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
      fetch('http://127.0.0.1:8000/login/',{
        method:'POST',
        body: JSON.stringify( {credential:credentialResponse}),
      } , ).then(res => {
        console.log(res.status)
        if(res.status == 200) {
          const credential = credentialResponse.access_token;
          console.log(credential ?jwt_decode(credential) :"no response")
          dispatch(setJWT(credential))
          const cookies = new Cookies();
          cookies.set('jwt', credential, { domain:'http://127.0.0.1:8000' });
        }
        else {
          console.log('unable to login');
        }
      })
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  const dispatch = useAppDispatch()
  const userInfo = getUserInfo(jwt);
  const handleLogout = () => {
    dispatch(setJWT(""));
    googleLogout()
  }
  
    return (
         <header className=" p-10 bg-[#272930] flex">
      <div className="w-[28%]">

      </div>
      <div className=" text-white font-bold  w-[44%] self-center flex justify-between ">
        <section className="my-auto">
          <NavLink to='/'>
            <a href="" className="mr-10 text-xl">
              Home
            </a>

          </NavLink>
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
      </div>{
        jwt!=="" ?(
          <div className="w-[28%] flex">
        <div className=" w-10 ml-20">
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={userInfo.picture} referrerPolicy="no-referrer" alt="" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
        <div className="ml-4 text-sm">
          <div className="text-gray-400 ">Logged in as </div>
          <div className="font-bold text-white">{userInfo.name}</div>

        </div>
        <div className="dropdown">

        </div>
        <div className="self-center ml-4">
          <IoNotificationsSharp className="text-gray-400" size={24}></IoNotificationsSharp>
        </div>
      </div>
        ):<button className="btn ml-10" onClick={() =>login()} >Login</button>
      }
      
    </header>)
  }