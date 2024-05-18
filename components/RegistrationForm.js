import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Platform, Image, Alert } from 'react-native';

const RegistrationForm = ({ toggleRegistration }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, []);

    const formHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '80%'],
    });

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\sа-яА-ЯїЇіІєЄґҐ]+$/;
        return name.trim() !== '' && nameRegex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return email.trim() !== '' && email.includes('@') && emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
        return passwordRegex.test(password);
    };

    const handleContinue = () => {
        console.log("Continue button pressed");

        if (!validateName(username)) {
            console.log("Invalid name entered:", username);
            Alert.alert('Please enter a valid name.');
            return;
        }

        if (!validateEmail(email)) {
            console.log("Invalid email entered:", email);
            Alert.alert('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            console.log("Invalid password entered:", password);
            Alert.alert('Please enter a valid password (8-64 characters, at least one uppercase letter, one lowercase letter, and one special character).');
            return;
        }

        console.log("All fields are valid");
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Animated.View style={[styles.registrationContainer, { height: formHeight }]}>
            <TouchableOpacity style={styles.arrowLeftContainer} onPress={toggleRegistration}>
                <Image
                    source={require('../assets/return_button_icon.png')}
                    style={styles.returnImage}
                />
            </TouchableOpacity>
            <View style={styles.accountContainer}>
                <Image
                    source={require('../assets/sign_up_profile_photo_icon.png')}
                    style={styles.signUpProfilePhotoIcon}
                />
                <View style={styles.registrationTextContainer}>
                    <Text style={styles.signUpText}>Sign up</Text>
                    <Text style={styles.registrationText}>Personal account</Text>
                </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordInputContainer}>
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
            default: {}, 
        }),
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
        marginBottom: 25
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
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
    signUpProfilePhotoIcon: {
        width: 48,
        height: 48,
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
    returnImage:{
        height: 30,
        width: 15
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 30
    },
    passwordInput: {
        flex: 1,
        height: 56,
        fontSize: 15,
        outline: 'none'
    },
    passwordVisibilityIcon: {
        width: 24, 
        height: 24 
    }

});

export default RegistrationForm;
