import { View, Text , Image,TextInput, TouchableOpacity, Pressable, Alert,ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomKeyBoardView from '../components/CustomKeyboardView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';
export default function SignUp() {

    const {register} = useAuth();
    const router = useRouter();
    const passwordRef = useRef("");
    const userNameRef = useRef("");
    const passwordConfirmRef = useRef("");
    const emailRef = useRef("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async ()=>{
        if(!emailRef.current || !passwordRef.current || !userNameRef.current || !passwordConfirmRef.current){
            Alert.alert("All fields are required Please fill all of them");
            return;
        }
        if (passwordConfirmRef.current != passwordRef.current){
            Alert.alert("Passwords did not match try again");
            return;
        }
        setLoading(true);

        let response = await register(emailRef.current, passwordRef.current, userNameRef.current )
    }
  return (
    <CustomKeyBoardView>
      <StatusBar  style="dark"/>
      <View style ={{paddingTop: hp(7), paddingHorizontal:(wp(5))}} className="flex-1 gap-12">
        <View className="items-center">
            <Image style={{height: hp(25),
                    width: hp(25), // Ensures a square aspect ratio
                    borderRadius: hp(10), // Adjust as needed for curvature
                    overflow: 'hidden',
                    backgroundColor: 'white', }} resizeMode='contain' source={require('../assets/images/loginIMG.png')} />
        </View>
        <View className= "gap-10">
            <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">
                Sign Up
            </Text>
            <View className="gap-4">
                <View style={{height:hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                    <Octicons name="mail" size={hp(2.7)} color="gray"/>
                    <TextInput 
                        onChangeText={value=>emailRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Email Address"
                        placeholderTextColor={'gray'}
                    />
                </View>
                <View style={{height:hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                    <Octicons name="person" size={hp(2.7)} color="gray"/>
                    <TextInput 
                        onChangeText={value=>userNameRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="User Name"
                        placeholderTextColor={'gray'}
                    />
                </View>
                <View className="gap-3">
                <View style={{height:hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                    <Octicons name="lock" size={hp(2.7)} color="gray"/>
                    <TextInput 
                                onChangeText={value => passwordRef.current= value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder="Password"
                                secureTextEntry
                                placeholderTextColor={'gray'}
/>

                </View>
                <View style={{height:hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                    <Octicons name="lock" size={hp(2.7)} color="gray"/>
                    <TextInput 
                                onChangeText={value => passwordConfirmRef.current= value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder="Confirm Password"
                                secureTextEntry
                                placeholderTextColor={'gray'}
/>

                </View>

                </View>

                {/*submit button */}

                <View>
                    {
                        loading ?(
                                 <View className="flex-1 justify-center pb-10">
                                  <ActivityIndicator size="large" color="gray" />
                                </View>
                        ):(
                            <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}}className="bg-indigo-500 rounded-xl justify-center items-center">
                            <Text style={{fontSize: hp(2.7)}} className="text-white font-bold tracking-wider">
                                Register
                            </Text>
                        </TouchableOpacity>
                        )
                    }
                </View>
              

                {/*sign up text*/}

                <View className="flex-row justify-center">
                    <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Already have an Account? </Text>
                    <Pressable onPress={()=>router.push('signin')}>
                    <Text style={{fontSize: hp(1.8)}}className="font-bold text-indigo-500">Sign In</Text>
                    </Pressable>
                   
                </View>
            </View>
        </View>
      </View>
      </CustomKeyBoardView>
  )
}