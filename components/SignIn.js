import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignIn = ({ toggleLogIn, toggleRegistration }) => {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [animation] = useState(new Animated.Value(0));
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR',
                expiresInMins: 30,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Received user data:', data);
                setUserData(data);
                setUsername(data ? data.username : '');
                setPassword(data ? data.lastName : ''); 
            })
            .catch(error => console.error('Error fetching login data:', error));
    }, []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, []);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '80%'],
    });

    const handleContinue = () => {
        console.log('Entered username:', username);
        console.log('Entered password:', password);
        console.log('User data:', userData);
        if (!username || !password) {
            setError('Error: Invalid Username or Password');
            return;
        }

        if (!userData || username !== userData.username || password !== userData.lastName) {
            if (!userData) {
                setError('Error: User data not available');
            } else {
                setError('Error: Invalid Username or Password');
            }
            return;
        }

        navigation.navigate('Posts', { userName: username });
    };

    return (
        <Animated.View style={[styles.registrationContainer, { height: formHeight }]}>
            <TouchableOpacity style={styles.arrowLeftContainer} onPress={toggleLogIn}>
                <Image
                    source={require('../assets/return_button_icon.png')}
                    style={styles.returnImage}
                />
            </TouchableOpacity>
            <View style={styles.accountContainer}>
                <Image
                    style={styles.accountImage}
                    source={require('../assets/login_profile_photo_icon.png')}
                />
                <View style={styles.registrationTextContainer}>
                    <Text style={styles.signUpText}>Login</Text>
                    <Text style={styles.registrationText}>Personal account</Text>
                </View>
            </View>
            <View style={styles.line}></View>
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                    style={[styles.input, { borderColor: error ? 'red' : '#ccc' }]}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[styles.passwordInputContainer, { borderColor: error ? 'red' : '#ccc' }]}>
                    <TextInput
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                        <Image
                            source={showPassword ? require('../assets/show_password_icon.png') : require('../assets/hidden_password_icon.png')}
                            style={styles.passwordVisibilityIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonContinue} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCreateAccountContainer} onPress={toggleRegistration}>
                <Text style={styles.buttonCreateAccount}>Create account</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    registrationContainer: {
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 30,
        color: '#606773',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
            web: {
                boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.2)',
            },
        }),
    },
    accountImage: {
        width: 48,
        height: 48
    },
    inputContainer: {
        marginBottom: 25,
    },
    inputLabel: {
        fontSize: 15,
        marginBottom: 10,
        marginLeft: 16,
        color: '#606773',
    },
    input: {
        width: '100%',
        height: 56,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    buttonContinue: {
        backgroundColor: '#FA8A34',
        height: 51,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
    accountContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 25
    },
    registrationTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    loginProfilePhotoIcon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registrationText: {
        color: '#606773',
        fontWeight: 200
    },
    line: {
        width: '120%',
        height: 1,
        left: -20,
        backgroundColor: '#EBEFF5',
        marginBottom: 25
    },
    arrowLeftContainer: {
        position: 'absolute',
        top: -75,
        left: 15,
        zIndex: 1,
    },
    returnImage: {
        height: 30,
        width: 15
    },
    buttonCreateAccount: {
        color: '#FA8A34',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 15,
        marginBottom: 25
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 25
    },
    passwordInput: {
        flex: 1,
        height: 56,
        fontSize: 15,
        borderWidth: 0,
    },
    passwordVisibilityIcon: {
        width: 24,
        height: 24
    },
    errorText: {
        marginLeft: 15,
        fontSize: 15,
        color: '#D63C41',
        marginBottom: 15
    }

});

export default SignIn;