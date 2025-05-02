import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { query } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
import CustomKeyBoardView from '../../components/CustomKeyboardView';
import { getRoomId } from '../../utils/common';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebaseConfig';
import { setDoc, Timestamp,doc, collection, addDoc, orderBy, onSnapshot } from 'firebase/firestore';

export default function ChatRoom({}) {

    const item = useLocalSearchParams();
    const router = useRouter();
    const {user} = useAuth();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);
    
    useEffect(()=>{
        console.log('hello', messages);
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId,item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        
        let unsub = onSnapshot(q, (snapshot)=>{
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data();
            })
            setMessages([...allMessages]);
        });

        return unsub;

    },[])

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;
    
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messageRef = collection(docRef, "messages");
            textRef.current = "";
            if (inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messageRef, {
                userId: user.userId,  // now guaranteed not undefined
                text: message,
                profilephoto: user.profilephoto || "",  // fallback in case
                SenderName: user.username,
                createdAt: Timestamp.fromDate(new Date())
            });
    
            console.log("New Message Id: ", newDoc?.id);
            
        } catch (e) {
            console.log("Error sending message: ", e.message);
        }
    }
    
    const createRoomIfNotExists = async()=>{
        try {
            let roomId = getRoomId(user?.uid, item?.userId);
            await setDoc(doc(db, "rooms", roomId), {
              roomId,
              createdAt: Timestamp.fromDate(new Date())
            });
            console.log('Room created successfully!');
          } catch (err) {
            console.error('Error creating room:', err);
          }

    }
    
  return (
    <CustomKeyBoardView inchat={true}>
    <View className='flex-1 bg-white'>
      <StatusBar style="dark" />
      <ChatRoomHeader  user={item} router = {router}/>
      <View className='h-3 border-b border-neutral-300'/>
      <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
        <View className='flex-1'>
            <MessageList messages={messages} currentUser= {user}/>
        </View>
        <View style={{marginBottom: hp(2.7)}} className='pt-2'>
            <View className='flex-row justify-between items-center mx-3'>
                <View className='flex-row justify-between bg-white border-neutral-300 p-2 rounded-full pl-5 '>
                    <TextInput
                        ref = {inputRef}
                        onChangeText={value => textRef.current = value} 
                        placeholder='Type Message...'
                        style={{fontSize:hp(2)}}
                        className='flex-1 mr-2'
                    />
                    <TouchableOpacity onPress = {handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
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