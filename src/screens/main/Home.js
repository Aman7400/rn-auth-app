import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Button as PaperButton, Avatar as ProfileAvatar } from 'react-native-paper';


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
                        <ProfileAvatar.Image size={48} source={{uri: userProfile.profilePic || 'https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png'}} />
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