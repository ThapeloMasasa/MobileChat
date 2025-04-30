import { createContext, useContext, useEffect, useState} from 'react'
import {onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { addDoc, getDoc, setDoc, doc} from 'firebase/firestore';


export const AuthContext = createContext();
export const AuthContextProvider = ({children})=> {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user=>{
            if (user){
                setIsAuthenticated(true);
                setUser(user);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
            return unsub;
        })

    },[])

    const login = async (email, password)=>{
        try{

        }catch(e){

        }
    }

    const logout = async ()=> {
        try{

        }catch(e){

        }
    }
    const register = async (email, password, username)=>{

        try{
            const response = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, "users", response?.user?.uid),{
                username,
                userId: response?.user?.uid
            });
            return {success:true, data: response?.user};

        }catch(e){
            return {success:false, data: e.message};
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
