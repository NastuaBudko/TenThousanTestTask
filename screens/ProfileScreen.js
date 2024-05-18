import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // импорт AsyncStorage
import NavComponent from '../components/NavComponent';

const ProfileScreen = ({ route, navigation }) => {
    const { userName } = route.params;

    useEffect(() => {
        AsyncStorage.setItem('userName', userName);
    }, []);

    const handleReturn = () => {
        navigation.goBack();
    };

    const handleLogout = () => {
        navigation.navigate('Authentication');
    };

    const handleLanguageSelect = () => {
        navigation.navigate('LanguageSelection', { userName: userName });
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleReturn}>
                <Image
                    source={require('../assets/return_button_icon.png')}
                    style={styles.returnIcon}
                />
            </TouchableOpacity>
            <Text style={styles.settingsText}>Settings</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.settingProfileIcon}>
                </View>
                <Text style={styles.usernameText}>{userName}</Text>
            </View>
            <Text style={styles.settingsDescriptionText}>Basic</Text>
            <TouchableOpacity onPress={handleLanguageSelect}>
                <View style={styles.settingsContainer}>
                    <Image
                        source={require('../assets/language_icon.png')}
                        style={styles.settingsIcon}
                    />
                    <Text style={styles.logoutButtonText}>Language</Text>
                    <Image
                        source={require('../assets/arrow_right_icon.png')}
                        style={styles.arrowIconLanguage}
                    />
                </View>
            </TouchableOpacity>
            <Text style={styles.settingsDescriptionText}>Other</Text>
            <TouchableOpacity onPress={handleLogout}>
                <View style={styles.settingsContainer}>
                    <Image
                        source={require('../assets/log_out_icon.png')}
                        style={styles.settingsIcon}
                    />
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                    <Image
                        source={require('../assets/arrow_right_icon.png')}
                        style={styles.arrowIconLogOut}
                    />
                </View>
            </TouchableOpacity>
            <NavComponent username={userName} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        backgroundColor: 'white'
    },
    settingsText: {
        marginHorizontal: 25,
        fontSize: 22,
        fontWeight: 600,
        marginBottom: 40
    },
    settingsContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#CED5E0',
        gap: 15
    },
    settingsDescriptionText: {
        color: '#606773',
        marginHorizontal: 25,
        marginBottom: 10
    },

    settingProfileIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#EBEFF5',
        borderRadius: 50
    },
    usernameText: {
        fontSize: 15,
    },
    arrowIconLanguage: {
        width: 24,
        height: 24,
        marginLeft: 170
    },
    arrowIconLogOut: {
        width: 24,
        height: 24,
        marginLeft: 180
    },
    settingsIcon: {
        width: 24,
        height: 24
    },
    logoutButtonText: {
        fontSize: 15,
        fontWeight: 500
    },
    returnIcon: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginBottom: 30
    }
});

export default ProfileScreen;
