import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function keyBoardView({children}) {
    const ios = Platform.OS == 'ios';
  return (
    <KeyboardAvoidingView
       behavior={ios ? 'pading': 'height'}
       style={{flex: 1}} >
        <ScrollView 
            style={{flex: 1}}
            bounces={false}
            showsVerticalScrollIndicator={false}>
                {children}

        </ScrollView>
    </KeyboardAvoidingView>
  )
}