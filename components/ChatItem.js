import { View, Text,Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';

export default function ChatItem({noBorder,router, item, index}) {
  return (

      <TouchableOpacity className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? "": "border-b border-b-neutral-200"}`}>
        <Image source= {{uri: item?.profilephoto}}  
        style={{height:hp(6), width: hp(6)}}
        className='rounded-full'/>

        <View className='flex-1 gap-1'>
            <View className='flex-row justify-between'>
                <Text style={{fontSize: hp(1.8)}} className='font-semibold text-neutral-800'>Masasa</Text>
                <Text style={{fontSize: hp(1.8)}} className='font-medium text-neutral-500'>Time</Text>
            </View>
            <Text style={{fontSize: hp(1.6)}} className='font-medium text-neutral-500'>Last Message</Text>
        </View>
      </TouchableOpacity>
  )
}