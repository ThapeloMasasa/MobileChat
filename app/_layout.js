import { View, Text } from 'react-native'

import { Slot, useRouter,useSegments  } from 'expo-router'
import "../global.css"
import { AuthContextProvider, useAuth} from '../context/authContext'
import React, { useEffect } from 'react'


const MainLayout = ()=>{
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();


    useEffect(()=>{
        //lest check if user if authenticated
        if (typeof isAuthenticated == 'undefined') return ;
        const inApp = segments[0]=='(app)';
        //if authenticated and in app
        if(isAuthenticated && !inApp){
            router.replace('home')
        }else if (isAuthenticated == false){
            router.replace('signin')
        }   
    },[isAuthenticated])

    return <Slot />

}      

export default function RootLayout() {
  return (
    <AuthContextProvider >
      <MainLayout/>
    </AuthContextProvider>
  )
}