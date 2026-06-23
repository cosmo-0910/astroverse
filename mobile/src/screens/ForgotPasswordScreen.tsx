import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';
import { BackArrowIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={require('../../assets/celestial_lines.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* Top Header Bar with Back Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => onNavigate('SignIn')}
            activeOpacity={0.7}
            style={styles.backButtonCircle}
          >
            <BackArrowIcon color="#3A3258" size={16} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Title and Subtitle */}
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              If you've forgotten your password. Please enter your email or phone to reset.
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <InputField
                label="Email"
                placeholder="Type here"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>
        </ScrollView>

        {/* Continue Button at the bottom */}
        <View style={styles.bottomSection}>
          <GradientButton
            title="Continue"
            onPress={() => onNavigate('EnterOTP')}
            style={styles.continueBtn}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2F9',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  topBar: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  content: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#6E6782',
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 32,
    fontFamily: 'System',
  },
  form: {
    width: '100%',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueBtn: {
    width: '100%',
  },
});
