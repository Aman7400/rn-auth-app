import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Button as PaperButton } from 'react-native-paper';

const Home = ({navigation}) => {
    const {logout,userProfile} = React.useContext(AuthContext)
  return (
    <SafeAreaView>
        <View style={{
            padding:16
        }}>

            {/* Top */}
            <View style={{flexDirection:'row'}}>
                <Text style={{
                    fontSize:18
                }}>Hello</Text>
                <Text style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 18,
                }}>,{userProfile.fullName}</Text> 
            </View>
            <Button title=""  />
            <PaperButton icon="logout" mode="contained" onPress={() => logout()}>
            Log out
  </PaperButton>
        </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})