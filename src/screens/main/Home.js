import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Button as PaperButton, Avatar as ProfileAvatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL } from "@env"


const Home = ({ navigation }) => {


    const { logout, userProfile, isDarkModeOn } = React.useContext(AuthContext)

    console.log(`${BACKEND_URL}${userProfile.profilePic}`);



    return (
        <SafeAreaView>
            <View style={{
                padding: 18
            }}>

                <Icon name={isDarkModeOn ? "moon" : "sunny"} size={48} />

                {/* Top */}
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: 16 }} >
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
                        <ProfileAvatar.Image size={48} source={{ uri: userProfile.profilePic ? `${BACKEND_URL}${userProfile.profilePic}` : null }} />
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
