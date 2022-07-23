import * as React from "react"
const AuthContext = React.createContext();
import * as SecureStore from "expo-secure-store"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AuthContextProvider = ({children}) => {

const [isLoading,setIsLoading] = React.useState(false);
const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [userProfile,setUserProfile]  = React.useState();


 async function login({email,password}) {
    console.log({email,password});
    try {
        setIsLoading(true);
        const res = await axios.post("http://localhost:8000/api/user/login",{
            email,password
        })

        if (res.data.token) {
            await SecureStore.setItemAsync("token",res.data.token)
            setIsLoggedIn(true);
        }

    } catch (error) {

        console.log("Login error: " + error);
        
    } finally {
        setIsLoading(false);
    }
   
  }
 async function logout(){
   await SecureStore.deleteItemAsync("token")
    setIsLoggedIn(false);
  }


  React.useEffect(() => {

    const bootStrapAsync = async () => {
        console.log("Starting App");
        try {
            setIsLoading(true);

            let token = await SecureStore.getItemAsync("token")
            
            if (token){
                console.log({token});
                const res = await axios.get("http://localhost:8000/api/user/profile",{
                    headers : {
                        Authorization: "Bearer " + token
                    }
                })

                if (res.data.message === 'Profile') {

                    console.log(res.data.user);

                    setUserProfile(res.data.user)
                    setIsLoggedIn(true);

                    
                }

            }
        } catch (error) {
            console.log("Starting App Error: " + error);
        } finally {
            setIsLoading(false)
        }
    }

    bootStrapAsync();

  },[isLoggedIn])

    return (
        <AuthContext.Provider value={{isLoggedIn,login,isLoading,logout,setIsLoading,userProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider,AuthContext}
