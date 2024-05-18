import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavComponent from '../components/NavComponent';

const LanguageSelectionScreen = ({ route }) => {
  const { userName } = route.params;
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleReturn}>
        <Image
          source={require('../assets/return_button_icon.png')}
          style={styles.returnIcon}
        />
      </TouchableOpacity>
      <Text style={styles.settingsText}>Language</Text>
      <TouchableOpacity onPress={() => handleLanguageChange('English')}>
        <View style={styles.settingsContainer}>
          <Image
            source={require('../assets/language_icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.logoutButtonText}>English</Text>
          <Image
            source={selectedLanguage === 'English' ? require('../assets/language_selection_active.png') : require('../assets/language_selection_disabled.png')}
            style={styles.settingsIconLanguageChosen}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLanguageChange('Arabic')}>
        <View style={styles.settingsContainer}>
          <Image
            source={require('../assets/language_icon.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.logoutButtonText}>Arabic</Text>
          <Image
            source={selectedLanguage === 'Arabic' ? require('../assets/language_selection_active.png') : require('../assets/language_selection_disabled.png')}
            style={styles.settingsIconLanguageChosen}
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
        backgroundColor: 'white',
        fontFamily: 'Inter-Regular'
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

    settingsIcon: {
        width: 24,
        height: 24
    },

    settingsIconLanguageChosen: {
        width: 32,
        height: 32,
        marginLeft: 185
    },
    returnIcon: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginBottom: 30
    }
});

export default LanguageSelectionScreen;
