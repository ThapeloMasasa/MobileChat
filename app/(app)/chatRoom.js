import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';

import { Feather } from '@expo/vector-icons';
import CustomKeyBoardView from '../../components/CustomKeyboardView';

export default function ChatRoom() {

    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
  return (
    <CustomKeyBoardView>
    <View className='flex-1 bg-white'>
      <StatusBar style="dark" />
      <ChatRoomHeader  user={item} router = {router}/>
      <View className='h-3 border-b border-neutral-300'/>
      <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
        <View className='flex-1'>
            <MessageList messages={messages}/>
        </View>
        <View style={{marginBottom: hp(2.7)}} className='pt-2'>
            <View className='flex-row justify-between items-center mx-3'>
                <View className='flex-row justify-between bg-white border-neutral-300 p-2 rounded-full pl-5 '>
                    <TextInput 
                        placeholder='Type Message...'
                        style={{fontSize:hp(2)}}
                        className='flex-1 mr-2'
                    />
                    <TouchableOpacity className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                        <Feather name='send' size={hp(2.7)} color="#737373" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

      </View>
    </View>
    </CustomKeyBoardView>
  )
}