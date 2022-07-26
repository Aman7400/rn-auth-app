import * as React from "react"
const AuthContext = React.createContext();
import * as SecureStore from "expo-secure-store"
import axios from "axios";

const AuthContextProvider = ({children}) => {

const [isLoading,setIsLoading] = React.useState(false);
const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [userProfile,setUserProfile]  = React.useState();



 async function login({email,password}) {
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

        alert("Login Error :" + error.response.data.message)

        
    } finally {
        setIsLoading(false);
    }
   
  }
 async function logout(){
   await SecureStore.deleteItemAsync("token")
    setIsLoggedIn(false);
  }


  const bootStrapAsync = async () => {
    try {
        setIsLoading(true);

        let token = await SecureStore.getItemAsync("token")
        
        if (token){
            const res = await axios.get("http://localhost:8000/api/user/profile",{
                headers : {
                    Authorization: "Bearer " + token
                }
            })

            if (res.data.message === 'Profile') {

                setUserProfile(res.data.user)
                setIsLoggedIn(true);

                
            }

        }
    } catch (error) {
        alert("Starting App Error: " + error.response.data.message);
    } finally {
        setIsLoading(false)
    }
}

  React.useEffect(() => {

    bootStrapAsync();

  },[isLoggedIn])

    return (
        <AuthContext.Provider value={{isLoggedIn,login,isLoading,logout,setIsLoading,userProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider,AuthContext}
