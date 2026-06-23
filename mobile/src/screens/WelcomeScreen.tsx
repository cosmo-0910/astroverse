import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import GradientButton from '../components/GradientButton';
import { ScreenType } from '../navigation/AppNavigator';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <ImageBackground
      source={require('../../assets/cosmic_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Top Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoBorder}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
          </View>
          <Text style={styles.title}>ASTROVERSE</Text>
          <Text style={styles.subtitle}>The Universe Connects Us</Text>
        </View>

        {/* Bottom Actions Section */}
        <View style={styles.bottomSection}>
          <GradientButton
            title="Create Account"
            onPress={() => onNavigate('SignUp')}
            style={styles.btn}
          />

          <TouchableOpacity
            onPress={() => onNavigate('SignIn')}
            activeOpacity={0.8}
            style={styles.signInBtn}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 2, 15, 0.45)', // subtle dark wash to keep text highly legible
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 50,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoBorder: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#7E22CE',
    padding: 2,
    backgroundColor: '#0F092A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#7E22CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 3,
    fontFamily: 'System',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#D4CDE6',
    fontWeight: '400',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
  bottomSection: {
    width: '100%',
    paddingBottom: 20,
  },
  btn: {
    marginBottom: 16,
    width: '100%',
  },
  signInBtn: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#261F4D',
    backgroundColor: 'rgba(15, 9, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
