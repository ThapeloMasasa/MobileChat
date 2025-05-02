import { View, Text,Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';

export default function ChatItem({item, index}) {
  return (

      <TouchableOpacity className='flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-b-neutral-200'>
        <Image source= {require('../assets/images/user1.png')}  
        style={{height:hp(6), width: hp(6)}}
        className='rounded-full'/>
      </TouchableOpacity>
  )
}