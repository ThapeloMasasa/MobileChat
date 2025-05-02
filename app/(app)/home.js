import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar'
import ChatList from '../../components/ChatList';
import { getDocs, query,where} from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';
export default function home() {
    const {user} = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        //console.log("Current USer", user);
        if(user?.uid){
           // console.log("    Here")
            getUsers();

           // console.log('    After')
        }

    },[])

    const getUsers = async ()=>{
        //console.log("In getUsers");
        const q = query(usersRef, where('userId', "!=", user?.uid));

        const querySnapShot = await getDocs(q);
        let data = [];
        console.log("SnapSHott        ")
        //console.log(querySnapShot)
        querySnapShot.forEach(doc=>{
            data.push(doc.data())
        })
        console.log("here are Users", data)
        setUsers(data)

    }

  return (
    <View className="flex-1 bg-white">
      <StatusBar  style='light'/>

      {
        users.length > 0 ? (
            <ChatList users = {users} />
        ):(
    

            <View className='flex items-center' style={{top: hp(30)}}>
                < ActivityIndicator size="large"/>
            </View>
        )
      }
    </View>
  )
}