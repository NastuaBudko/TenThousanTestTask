import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground } from 'react-native';
import RegistrationForm from '../components/RegistrationForm';
import SignIn from '../components/SignIn';

const AuthenticationScreen = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const toggleRegistration = () => {
    setShowRegistration(prevState => !prevState);
    setShowButtons(!showButtons); 
  };

  const toggleLogIn = () => {
    setShowLogIn(prevState => !prevState);
    setShowButtons(!showButtons); 
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background_pattern.png')} style={styles.backgroundImage} resizeMode="contain">
      {showRegistration &&  (
        <RegistrationForm toggleRegistration={toggleRegistration} toggleButtons={toggleButtons} />
      ) }
      {showLogIn &&  (
        <SignIn toggleLogIn={toggleLogIn} toggleButtons={toggleButtons} />
      ) }
      {showRegistration == false && showLogIn == false ? (
        <View style={styles.descriptionColumns}>
          <View style={styles.leftContainer}>
            <View style={styles.topLeftContainer}>
              <Image
                source={require('../assets/bitcoin_icon.png')}
                style={styles.bitcoinImage}
              />
            </View>
            <View style={styles.middleLeftContainer}>
              <Image
                source={require('../assets/middle_left_block_icon.png')}
                style={styles.blockIcon}
              />
              <Text style={styles.descriptionText}>Crowd real estate</Text>
            </View>
            <View style={styles.bottomLeftContainer}>
              <Image
                source={require('../assets/bottom_left_block_icon.png')}
                style={styles.blockIcon}
              />
              <Text style={styles.descriptionText}>ETFs</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.topRightContainer}>
              <Image
                source={require('../assets/top_right_block_icon.png')}
                style={{width: 111, height: 72}}
              />
            </View>
            <View style={styles.middleRightContainer}>
              <Image
                source={require('../assets/middle_right_block_icon.png')}
                style={{width: 104, height: 72}}
              />
            </View>
            <View style={styles.bottomRightContainer}>
              <Image
                source={require('../assets/bottom_right_block_icon.png')}
                style={styles.blockIcon}
              />
              <Text style={styles.descriptionText}>Crypto</Text>
            </View>
          </View>
        </View>
      ) : <></>}
      
      {showButtons && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonSignIn} onPress={toggleLogIn}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSignUpContainer} onPress={toggleRegistration}>
            <View style={styles.buttonSignUp}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ededed',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundSize: '100px 100px',
  },
  blockIcon: {
    width: 104,
    height: 48
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonSignIn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonSignUpContainer: {
    width: '100%',
  },
  buttonSignUp: {
    backgroundColor: '#FA8A34',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  signInText: {
    color: '#FA8A34',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter-Medium'
  },
  signUpText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'Inter-Medium'
  },
  descriptionColumns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: '25%',
  },
  topLeftContainer: {
    backgroundColor: '#FA8A34',
    width: '100%',
    height: 136,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleLeftContainer: {
    width: '100%',
    height: 136,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLeftContainer: {
    width: '100%',
    height: 136,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRightContainer: {
    width: '100%',
    height: 136,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRightContainer: {
    width: '100%',
    height: 136,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRightContainer: {
    width: '100%',
    height: 136,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    gap: 25,
    alignItems: 'center',
    marginTop: '18%',
  },
  rightContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
  },
  bitcoinImage: {
    width: 61,
    height: 81,
  },
  descriptionText: {
    fontWeight: 200,
    fontSize: 12,
    color: '#606773',
    marginTop: 8,
  },
});

export default AuthenticationScreen;
