import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function home() {

    const {logout,user} = useAuth();
    const handleLogout = async()=>{
        await logout();
    }
    console.log("user data", user)
  return (
    <View className="flex-1 bg-white">
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
        <Text className="font-bold text-indigo-500 text-center">Sign Out</Text>
      </Pressable>
    </View>
  )
}