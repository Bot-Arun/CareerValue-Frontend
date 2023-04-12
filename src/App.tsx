import {Home} from "./Pages/Home";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import { Questions } from "./Pages/CreateQuestions";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";
import jwt_decode from "jwt-decode"
import { Login } from "./Pages/Login";
import { GoogleOAuthProvider, useGoogleOneTapLogin  } from "@react-oauth/google";
import { useAppDispatch } from "./app/hooks";
import { setJWT } from "./reducers/userControl";
import Cookies from "universal-cookie";
import { QuestionPage } from "./Pages/QuestionPage";
import { Question } from "./components/Question";
import { LINK } from ".";

const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/'   >
      <Route path='/'  element={<Home/>}></Route>
      <Route path='question'   >
        <Route path="/question" element={<Questions></Questions>}  ></Route>
        <Route path=':id' element={<QuestionPage/>}/>
      </Route>
      <Route path='Login' element={<Login/>}></Route>
    </Route>
  )
)
function App() {
  const dispatch = useAppDispatch()
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
          console.log(credentialResponse);
          fetch(`${LINK}/login/`,{
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
        },
        onError: () => {
          console.log('Login Failed');
        },
    })
  return (
    <div className="bg-[#f2f2f2]">
      
        <RouterProvider router={router}></RouterProvider>
      
    </div>  
  );

  

  
}

export default App;

