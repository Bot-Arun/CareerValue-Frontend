import { NavBar } from "../components/NavBar";
import { GoogleOAuthProvider, useGoogleOneTapLogin ,} from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import jwt_decode from "jwt-decode"
import { setJWT } from "../reducers/userControl";
import { useAppDispatch } from "../app/hooks";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
export const Login = () => {
  const dispatch = useAppDispatch();

  return (
    <>
    <Header/>
    <main className="flex flex-row">
      <NavBar />
      <div className="w-[48%] bg-">
         <GoogleLogin
            onSuccess={ credentialResponse => {
          console.log(credentialResponse);
          fetch('http://127.0.0.1:8000/login/',{
            method:'POST',
            body: JSON.stringify( credentialResponse),
          } , ).then(res => {
            console.log(res.status)
            if(res.status == 200) {
              const credential = credentialResponse.credential;
              console.log(credential ?jwt_decode(credential) :"no response")
              dispatch(setJWT(credential))
              const cookies = new Cookies();
              cookies.set('jwt', credential, { domain:'http://127.0.0.1:8000' });
            }
            else {
              console.log('unable to login');
            }
          })
        }}
        onError={() => {
          console.log('Login Failed');
        }}
            />;        
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
  );
};
