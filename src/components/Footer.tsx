export const Footer = () => {
    return ( <footer className="bg-[#272930]  px-[200px] pt-20 text-gray-400">
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
    )
};