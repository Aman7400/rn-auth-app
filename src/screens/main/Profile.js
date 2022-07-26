import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from "expo-image-picker";
import axios from 'axios'
import * as SecureStore from "expo-secure-store"


const Profile = () => {

    const [isLoading, setIsLoading] = React.useState(false)
    const { userProfile } = React.useContext(AuthContext)
    const [img, setImg] = React.useState(userProfile.profilePic ? `http://localhost:8000/api${userProfile.profilePic}` : null)

    const uploadImage = async () => {

        try {

            setIsLoading(true);


            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "Images",
                aspect: [4, 3],
                quality: 1,
            });


            setImg(result.uri);






            const formData = new FormData();
            formData.append("profilePic", {
                uri: result.uri,
                type: 'image/jpg',
                name: 'image.jpg',
            });



            let token = await SecureStore.getItemAsync("token")

            const res = await axios.post("http://localhost:8000/api/user/profile", formData, {
                headers: {
                    Authorization: "Bearer " + token
                },
                enctype: "multipart/form-data",
            })


        } catch (error) {

            alert('Upload Error' + error)

        } finally {
            setIsLoading(false);
        }

    }


    if (isLoading) {
        return <View style={{ flex: 1 }}>
            <ActivityIndicator style={{ flex: 1 }} />
        </View>
    }



    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
                position: 'relative',
            }}>

                <TouchableOpacity
                    onPress={uploadImage}
                    style={{
                        position: "relative",
                        top: 120,
                        left: 40,
                        zIndex: 3,
                        height: 36,
                        width: 36,
                        backgroundColor: "blue",
                        justifyContent: 'center',
                        alignItems: "center",
                        borderRadius: 100

                    }}>
                    <Icon name="camera" size={18} color="white" />
                </TouchableOpacity>

                <Image resizeMode="cover" style={{
                    width: 120, height: 120,
                    borderRadius: 100,
                    marginBottom: 16
                }} source={{ uri: img || 'https://i0.wp.com/themarvelreport.com/wp-content/uploads/2019/05/Tony-Stark-Iron-Man.jpg?ssl=1' }} />
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold"
                }}>{userProfile.fullName}</Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "500"
                }}>{userProfile.email}</Text>

                {/* Edit Profile */}
                <Button
                    mode="contained"
                    style={{
                        margin: 16,
                        borderRadius: 24,
                        padding: 2,
                        backgroundColor: "blue"
                    }}
                >
                    Edit Profile
                </Button>

                {/* Address */}
                <View style={{
                    width: "100%", marginVertical: 8,
                }}>
                    <Text style={{
                        padding: 8,
                        backgroundColor: "#94949440", color: "grey", fontWeight: "500", textTransform: "uppercase"
                    }}>
                        Content
                    </Text>

                    <TouchableOpacity style={{ flexDirection: 'row', padding: 8, alignItems: "center" }} >
                        <Icon name="heart-outline" size={18} />
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 8

                        }}>
                            Favourites
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', padding: 8, alignItems: "center" }} >
                        <Icon name="download-outline" size={18} />
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 8

                        }}>
                            Downloads
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={{
                    width: "100%", marginVertical: 16,
                }}>
                    <Text style={{
                        padding: 8,
                        backgroundColor: "#94949440", color: "grey", fontWeight: "500", textTransform: "uppercase"
                    }}>
                        Prefrences
                    </Text>

                    <TouchableOpacity style={{ flexDirection: 'row', padding: 8, alignItems: "center" }} >
                        <Icon name="globe-outline" size={18} />
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 8

                        }}>
                            Languages
                        </Text>
                        <Text style={{
                            marginLeft: 'auto',
                            marginRight: 8
                        }} >
                            English
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', padding: 8, alignItems: "center" }} >
                        <Icon name="moon-outline" size={18} />
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 8

                        }}>
                            Dark Mode
                        </Text>
                        <Switch value={false} style={{
                            marginLeft: 'auto'
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', padding: 8, alignItems: "center" }} >
                        <Icon name="wifi-outline" size={18} />
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 8

                        }}>
                            Only Download via wifi
                        </Text>
                        <Switch value={false} style={{
                            marginLeft: 'auto'
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', padding: 8, alignItems: "center" }} >
                        <Icon name="layers-outline" size={18} />
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 8

                        }}>
                            Play in Background
                        </Text>
                        <Switch value={false} style={{
                            marginLeft: 'auto'
                        }} />
                        {/* <Switch value={false} onValueChange={() => {}} />; */}
                    </TouchableOpacity>


                </View>






            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})