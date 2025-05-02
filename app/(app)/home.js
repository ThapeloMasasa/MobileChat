import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function home() {

  return (
    <View className="flex-1 bg-white">
      <Text>home</Text>
    </View>
  )
}