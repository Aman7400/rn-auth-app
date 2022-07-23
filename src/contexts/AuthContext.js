import * as React from "react"
const AuthContext = React.createContext();
import * as SecureStore from "expo-secure-store"
import { useNavigation } from "@react-navigation/native";

const AuthContextProvider = ({children}) => {

const [isLoading,setIsLoading] = React.useState(false);
const [isLoggedIn, setIsLoggedIn] = React.useState(false);


 async function login({email,password}) {
    console.log({email,password});
    try {
        setIsLoading(true);
       await SecureStore.setItemAsync("token","12345678")
        setIsLoggedIn(true);
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

    const bootStrapAysnc = async () => {
        console.log("Starting App");
        try {
            setIsLoading(true)
            let token;
            token = await SecureStore.getItemAsync("token");
            if (token){
                console.log("Token Found");
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log("Starting App Error: " + error);
        } finally {
            setIsLoading(false)
        }
    }

    bootStrapAysnc();

  },[])

    return (
        <AuthContext.Provider value={{isLoggedIn,login,isLoading,logout,setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider,AuthContext}
