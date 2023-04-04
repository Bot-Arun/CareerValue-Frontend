import {createSlice} from '@reduxjs/toolkit'
import { useAppSelector } from '../app/hooks'
import jwt_decode from 'jwt-decode'

export interface JWTProps {
    jwt:string    
}

const initialState :JWTProps = {
    jwt:""
}

const formSlice = createSlice ({
    name:'ping',
    initialState,
    reducers :{
        setJWT: (state , action ) => {
            state.jwt = action.payload ;
        },
        
    }
})
export interface UserProps  {
    name :string,
    picture :string,
    email:string,
}
export function getUserInfo  (jwt:string) :UserProps {
    if (jwt!== "" ) {

        const userInfo :UserProps = jwt_decode(jwt)
        return {
            name :userInfo.name ,
            picture : userInfo.picture  , 
            email:userInfo.email
        } 
    }
    return {
        name :"" ,
        picture : ""  , 
        email:""
    }

}

export const { setJWT }     = formSlice.actions
export default formSlice.reducer; 