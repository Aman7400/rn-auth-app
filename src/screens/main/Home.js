import { Alert, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Button as PaperButton, Avatar as ProfileAvatar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';


const Home = ({ navigation }) => {

    const { logout, userProfile } = React.useContext(AuthContext)



    
    return (
        <SafeAreaView>
            <View style={{
                padding: 18
            }}>



                {/* Top */}
                <View style={{ flexDirection: 'row', justifyContent: "space-between",alignItems:"center",marginBottom:16 }} >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 24
                        }}>Hello</Text>
                        <Text style={{
                            color: 'blue',
                            fontWeight: 'bold',
                            fontSize: 24,
                        }}>, {userProfile.fullName}</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <ProfileAvatar.Image size={48} source={{uri: userProfile.profilePic ? `http://localhost:8000/api${userProfile.profilePic}` : null }} />
                    </TouchableOpacity>
                </View>
                <PaperButton icon="logout" mode="contained" onPress={() => logout()}>
                    Log out
                </PaperButton>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})