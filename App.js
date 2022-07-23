import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/main/Home'
import Settings from './src/screens/main/Settings'
import Login from './src/screens/auth/Login'
import Register from './src/screens/auth/Register'
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext'
import { Provider as PaperProvider } from 'react-native-paper';


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
              <Stack.Screen name="Settings" component={Settings} />
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