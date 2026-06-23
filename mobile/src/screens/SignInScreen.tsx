import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';
import AuthOptions from '../components/AuthOptions';
import { ScreenType } from '../navigation/AppNavigator';

interface SignInScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function SignInScreen({ onNavigate }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Top Logo and Header */}
            <View style={styles.headerSection}>
              <View style={styles.logoBorder}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
              </View>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Provide your details or continue with sign-in to unlock our amazing features.
              </Text>
            </View>

            {/* Social Authentication */}
            <AuthOptions label="Sign-In With" />

            {/* Input Form */}
            <View style={styles.form}>
              <InputField
                label="Email"
                placeholder="Type here"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <InputField
                label="Password"
                placeholder="Type here"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            {/* Login Button */}
            <GradientButton
              title="Login"
              onPress={() => onNavigate('Dashboard')}
              style={styles.loginBtn}
            />

            {/* Forgot Password */}
            <TouchableOpacity onPress={() => onNavigate('ForgotPassword')} style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Create Account Redirection */}
            <View style={styles.footer}>
              <Text style={styles.footerLabel}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => onNavigate('SignUp')}>
                <Text style={styles.footerLink}>Create an Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2F9', // light gray-lavender background
  },
  background: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoBorder: {
    width: 68,
    height: 68,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#7E22CE',
    padding: 2,
    backgroundColor: '#0F092A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6782',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
    fontFamily: 'System',
  },
  form: {
    width: '100%',
    marginTop: 8,
  },
  loginBtn: {
    width: '100%',
    marginTop: 8,
    marginBottom: 20,
  },
  forgotBtn: {
    paddingVertical: 8,
    marginBottom: 30,
  },
  forgotText: {
    color: '#3A3258',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'System',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  footerLabel: {
    color: '#8E8E9F',
    fontSize: 14,
    fontFamily: 'System',
  },
  footerLink: {
    color: '#1F1936',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'System',
  },
});
