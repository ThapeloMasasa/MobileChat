import { View, Text } from 'react-native'
import React from 'react'
import { Slot, useRouter } from 'expo-router'
import "../global.css"
import { AuthContext, useAuth } from '../context/authContext'


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
            router.replace('signIn')
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