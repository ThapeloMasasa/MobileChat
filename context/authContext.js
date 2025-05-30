import { createContext, useContext, useEffect, useState} from 'react'
import {onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import {  getDoc, setDoc, doc} from 'firebase/firestore';


export const AuthContext = createContext();
export const AuthContextProvider = ({children})=> {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user=>{
            //console.log("log User", user)
            if (user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
            return unsub;
        })

    },[])

    const updateUserData = async (userId)=>{

        const docRef = doc(db,'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username:data.username, userId: data.userId, profilephoto:data.profilephoto})
        }

    }

    const login = async (email, password)=>{
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            //console.log( 'your response',response)
            return {success: true};
        }catch(e){
            let msg = e.message;
            if (msg.includes("auth/invalid-email")) msg = "Invalid Email format";
            return {success: false, msg}
        }
    }

    const logout = async ()=> {
        try{
            await signOut(auth);
            return {success:true}
        }catch(e){
            return {success:false, message: e.message, error: e}
        }
    }
    const register = async (email, password, username, profilephoto)=>{

        try{
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log('response user', response?.user)

            await setDoc(doc(db, "users", response?.user?.uid),{
                username,
                profilephoto,
                userId: response?.user?.uid
            });
            return {success:true, data: response?.user};

        }catch(e){
            let msg = e.message;
            if (msg.includes('auth/invalid-email')) msg = 'Invalid email';
            if (msg.includes('auth/email-already-in-use')) msg = 'Email already in use';
            return {success:false, data: msg};
        }
        
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}} >
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error("UseAuth must be wrapped inside AuthContextProvider");
    }
    return value;
}
