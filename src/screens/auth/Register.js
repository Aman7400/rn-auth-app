import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HelperText, TextInput as PaperTextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import regex from '../../constants/regex';
import axios from 'axios';
import { BACKEND_URL } from "@env"


const Register = ({ navigation }) => {


    const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        }
    });



    const onRegister = async (data) => {
        try {

            const res = await axios.post(`${BACKEND_URL}/user/register`, { ...data })

            if (res.data.id) {

                alert("Account Created Successfully");
                reset({
                    fullName: '',
                    email: '',
                    password: '',
                });
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 3000);

            }


        } catch (error) {

            alert("Register Error: " + error.response.data.message)

        } finally {
        }
    }



    if (isSubmitting) {
        return <View style={{ flex: 1 }}>
            <ActivityIndicator style={{ flex: 1 }} />
        </View>
    }



    return (
        <SafeAreaView>

            <ScrollView alwaysBounceVertical={false}>
                <View style={{ paddingHorizontal: 30 }}>
                    {/* Illustration */}
                    <Image style={{
                        width: '100%',
                        height: 300,
                    }} source={require("../../../assets/images/register.png")} />
                    {/* Regsiter Form */}
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 16
                    }}>Create a new account</Text>

                    {/* Full Name */}

                    <Controller
                        control={control}
                        rules={{
                            required: 'Full Name is required',
                            minLength: {
                                value: 2,
                                message: 'Full Name must be at least 2 characters'
                            }

                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <PaperTextInput
                                label="Full Name"
                                onBlur={onBlur}
                                error={errors.fullName}
                                onChangeText={onChange}
                                value={value}
                                mode="outlined"
                                style={{ marginBottom: 8 }}
                                right={<PaperTextInput.Icon name="account" color={errors.fullName ? "red" : "blue"} />}
                            />
                        )}
                        name="fullName"
                    />
                    {errors.fullName &&
                        <HelperText type="error" visible={errors.fullName}>
                            {errors?.fullName?.message}
                        </HelperText>
                    }

                    {/* Email */}

                    <Controller
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: regex.emailRegex,
                                message: 'Please enter a valid email address'
                            }

                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <PaperTextInput
                                label="Email"
                                onBlur={onBlur}
                                error={errors.email}
                                onChangeText={onChange}
                                value={value}
                                mode="outlined"
                                style={{ marginBottom: 8 }}
                                right={<PaperTextInput.Icon name="email" color={errors.email ? "red" : "blue"} />}
                            />
                        )}
                        name="email"
                    />
                    {errors.email &&
                        <HelperText type="error" visible={errors.email}>
                            {errors?.email?.message}
                        </HelperText>
                    }

                    {/* Password */}

                    <Controller
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }

                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <PaperTextInput
                                label="Password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                mode="outlined"
                                error={errors.password}
                                secureTextEntry
                                style={{ marginBottom: 8 }}
                                right={<PaperTextInput.Icon name="lock" color={errors.password ? "tomato" : "blue"} />}
                            />
                        )}
                        name="password"
                    />
                    {errors.password &&
                        <HelperText type="error" visible={errors.password}>
                            {errors?.password?.message}
                        </HelperText>
                    }



                    <TouchableOpacity
                        style={{
                            backgroundColor: "blue",
                            padding: 16,
                            borderRadius: 8,
                            alignItems: "center",
                            marginVertical: 8
                        }}
                        onPress={handleSubmit(onRegister)}
                    >
                        <Text style={{
                            fontSize: 18,
                            color: "white",
                            fontWeight: "bold"
                        }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: 16,
                        color: "grey",
                        textAlign: "center",
                    }}>
                        Or, Sign up with
                    </Text>

                    {/* Social Media Login */}

                    <SocialMediaLogins />

                    {/* Register */}

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 12,
                        justifyContent: 'center',
                    }}>
                        <Text>
                            Already have an account?
                        </Text>
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={{
                                color: 'blue',
                                fontWeight: 'bold',
                                marginLeft: 4
                            }}>
                            Login.
                        </Text>
                    </View>




                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register


function SocialMediaLogins() {
    return (
        <View
            style={{
                marginVertical: 16,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
            <TouchableOpacity style={{
                borderColor: 'grey',
                borderWidth: .5,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8
            }}>
                <Image
                    style={{
                        width: 28,
                        height: 28
                    }} source={require("../../../assets/images/logo1.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={{
                borderColor: 'grey',
                borderWidth: .5,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8
            }}>
                <Image
                    style={{
                        width: 28,
                        height: 28
                    }} source={require("../../../assets/images/logo2.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={{
                borderColor: 'grey',
                borderWidth: .5,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8
            }}>
                <Image
                    style={{
                        width: 28,
                        height: 28
                    }} source={require("../../../assets/images/logo3.png")} />
            </TouchableOpacity>

        </View>
    )
}