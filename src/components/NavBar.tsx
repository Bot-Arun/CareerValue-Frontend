import { BiPoll } from "react-icons/bi"
import { BsTagsFill } from "react-icons/bs"
import { FaTrophy } from "react-icons/fa"
import { HiHome } from "react-icons/hi"
import { ImProfile, ImUsers, ImLifebuoy } from "react-icons/im"
import { MdFolderShared } from "react-icons/md"
import { RiQuestionnaireFill } from "react-icons/ri"
import { NavLink } from "react-router-dom"

export const NavBar = () => {
    return (<section className="w-[28%]   text-black justify-end bg-[#f2f2f2] flex ">
  
      <ul className="menu font-bold bg-base-100 p-2 rounded-box shadow-xl  px-4 text-lg py-5  mr-5 mt-4 h-fit    min-w-[250px]">
        <NavLink to='/'>
          <li>
            <a ><HiHome className="self-center mr-2" size={24}></HiHome> <span>Home</span> </a>
          </li>
        </NavLink>
        <li>
            <a ><ImProfile className="self-center mr-2" size={24}></ImProfile> <span>User Profile</span></a>
        </li>
        <li>
            <a ><ImUsers className="self-center mr-2" size={24}></ImUsers> <span>Users</span> </a>
        </li>
        <NavLink  to='/question'>
            <li>
                <a ><RiQuestionnaireFill className="self-center mr-2" size={24}></RiQuestionnaireFill> <span>Question</span> </a>
            </li>
        </NavLink>
        <li>
            <a ><BiPoll className="self-center mr-2" size={24}></BiPoll> <span>Polls</span> </a>
        </li>
        <li>
            <a ><BsTagsFill className="self-center mr-2" size={24}></BsTagsFill> <span>Tags</span> </a>
        </li>
        

      </ul>
    </section>
    )
  }
