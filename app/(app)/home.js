import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function home() {

    const {logout} = useAuth();
    const handleLogout = async()=>{
        await logout();
    }
  return (
    <View>
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}