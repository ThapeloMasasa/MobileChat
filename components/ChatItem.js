import { View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { blurhash, formateDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({currentUser, noBorder,router, item, index}) {


    const [lastMessage, setLastMessage] = useState(undefined);
    const openChatRoom = ()=>{
        router.push({pathname: '/chatRoom', params: item})
    }
    useEffect(()=>{
    
            let roomId = getRoomId(currentUser?.userId,item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            const q = query(messagesRef, orderBy('createdAt', 'desc'));
            
            let unsub = onSnapshot(q, (snapshot)=>{
                let allMessages = snapshot.docs.map(doc=>{
                    return doc.data();
                })
                setLastMessage(allMessages[0] ? allMessages[0]: null);
            });
    
            return unsub;
    
        },[])

        const renderTime = ()=>{
            if(lastMessage){
                let date = lastMessage?.createdAt;
                return formateDate(new Date(date?.seconds*1000))
            }
        }
        const renderLastMessage = ()=>{
            if(typeof lastMessage == 'undefined') return 'Loading...';
            console.log("lets see:  ", lastMessage)
            if(lastMessage){
                if(currentUser?.userId == lastMessage?.userId) return "You: "+ lastMessage?.text;
                return lastMessage?.text;
            }else{
                return 'Hi there 😜'
            }
        }

  return (

      <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? "": "border-b border-b-neutral-200"}`}>
        
        <Image 
            style={{height: hp(6), width: hp(6), borderRadius: 100}}
            source ={item.profilephoto}
            placeholder = {blurhash}
            transition = {500}
        />
        <View className='flex-1 gap-1'>
            <View className='flex-row justify-between'>
                <Text style={{fontSize: hp(1.8)}} className='font-semibold text-neutral-800'>{item.username}</Text>
                <Text style={{fontSize: hp(1.8)}} className='font-medium text-neutral-500'>{renderTime()}</Text>
            </View>
            <Text style={{fontSize: hp(1.6)}} className='font-medium text-neutral-500'>{renderLastMessage()}</Text>
        </View>
      </TouchableOpacity>
  )
}