import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';

const NavComponent = ({ username }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const route = useRoute();
    const [activeIcon, setActiveIcon] = useState('');

    useEffect(() => {
        if (isFocused) {
            switch (route.name) {
                case 'Posts':
                    setActiveIcon('home');
                    break;
                case 'ProfileScreen':
                    setActiveIcon('profile')
                    break;
                case 'LanguageSelection':
                    setActiveIcon('profile');
                    break;
                default:
                    setActiveIcon('');
                    break;
            }
        }
    }, [isFocused, route]);

    const handleIconPress = (icon) => {
        setActiveIcon(icon);
        switch (icon) {
            case 'home':
                navigation.navigate('Posts', { userName: username });
                break;
            case 'profile':
                navigation.navigate('ProfileScreen', { userName: username });
                break;
            case 'search':
                navigation.navigate('PostsSearchScreen', { userName: username });
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.bottomNavigation}>
            <TouchableOpacity onPress={() => handleIconPress('home')}>
                <Image
                    source={activeIcon === 'home' ? require('../assets/home_active_icon.png') : require('../assets/home_icon.png')}
                    style={styles.navBarIcon}
                />
            </TouchableOpacity>
            <Image
                source={require('../assets/portfolio_icon.png')}
                style={styles.navBarIcon}
            />
            <TouchableOpacity onPress={() => handleIconPress('search')}>
                <Image
                    source={require('../assets/search_icon.png')}
                    style={styles.navBarIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress('profile')}>
                <Image
                    source={activeIcon === 'profile' ? require('../assets/profile_active_icon.png') : require('../assets/profile_icon.png')}
                    style={styles.navBarIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNavigation: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        height: 83,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: '#C1C4CB'
    },
    navBarIcon: {
        width: 76,
        height: 49,
    }
});

export default NavComponent;
