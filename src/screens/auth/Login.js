import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { HelperText, Snackbar, TextInput as PaperTextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import regex from '../../constants/regex';


const Login = ({ navigation }) => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });


    const { login } = React.useContext(AuthContext);

    const onSubmit = data => login(data)


    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 30 }}>
                {/* Illustration */}
                <Image style={{
                    width: '100%',
                    height: 300,
                }} source={require("../../../assets/images/login.png")} />
                {/* Login Form */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: 16
                }}>Welcome back,</Text>

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

                <Controller
                    control={control}
                    rules={{
                        required: 'Password is required',
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


                <View style={{
                    alignItems: "flex-end",
                    margintop: 8
                }}>
                    <Text>
                        Forgot Password?
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "blue",
                        padding: 16,
                        borderRadius: 8,
                        alignItems: "center",
                        marginVertical: 16
                    }}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={{
                        fontSize: 18,
                        color: "white",
                        fontWeight: "bold"
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 16,
                    color: "grey",
                    textAlign: "center",
                }}>
                    Or, Login with
                </Text>

                {/* Social Media Login */}

                <SocialMediaLogins />

                {/* Register */}

                <View style={{
                    flexDirection: 'row',
                    marginTop: 32,
                    justifyContent: 'center',
                }}>
                    <Text>
                        New Here?
                    </Text>
                    <Text
                        onPress={() => navigation.navigate('Register')}
                        style={{
                            color: 'blue',
                            fontWeight: 'bold',
                            marginLeft: 4
                        }}>
                        Register.
                    </Text>
                </View>




            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})


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