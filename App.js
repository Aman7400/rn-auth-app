import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/main/Home'
import Login from './src/screens/auth/Login'
import Register from './src/screens/auth/Register'
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext'
import { Provider as PaperProvider } from 'react-native-paper';
import Profile from './src/screens/main/Profile'


const Stack = createNativeStackNavigator()


const App = () => {


  return (
    <PaperProvider>
       <AuthContextProvider>

<MainNavigator />

</AuthContextProvider>
    </PaperProvider>
   

  )
}

function MainNavigator() {
  const { isLoggedIn, isLoading } = React.useContext(AuthContext);
  if (isLoading) {
    return <View style={{ flex: 1 }}>
      <ActivityIndicator style={{ flex: 1 }} />
    </View>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }
        }
      >

        {
          isLoggedIn
            ?
            <>
              <Stack.Screen name="Home"  component={Home} />
              <Stack.Screen options={{
                headerShown:true
              }} name="Profile" component={Profile} />
            </>
            :
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>

        }


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App