import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';
import AuthOptions from '../components/AuthOptions';
import { BackArrowIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface SignUpScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

type TabType = 'email' | 'phone';

export default function SignUpScreen({ onNavigate }: SignUpScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
              <Text style={styles.title}>Create an Account</Text>
              <Text style={styles.subtitle}>
                Provide your details or continue with sign-in to unlock our amazing features.
              </Text>
            </View>

            {/* Social Authentication */}
            <AuthOptions label="Sign-In With" />

            {/* Custom Tab Selector */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setActiveTab('email')}
                activeOpacity={0.8}
                style={[
                  styles.tabButton,
                  activeTab === 'email' ? styles.tabButtonActive : styles.tabButtonInactive
                ]}
              >
                {activeTab === 'email' ? (
                  // Simulating the gradient border active tab
                  <View style={styles.activeGradientBorder}>
                    <Text style={styles.tabTextActive}>With Email</Text>
                  </View>
                ) : (
                  <Text style={styles.tabTextInactive}>With Email</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab('phone')}
                activeOpacity={0.8}
                style={[
                  styles.tabButton,
                  activeTab === 'phone' ? styles.tabButtonActive : styles.tabButtonInactive
                ]}
              >
                {activeTab === 'phone' ? (
                  <View style={styles.activeGradientBorder}>
                    <Text style={styles.tabTextActive}>With Phone</Text>
                  </View>
                ) : (
                  <Text style={styles.tabTextInactive}>With Phone</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Input Form based on Active Tab */}
            <View style={styles.form}>
              {activeTab === 'email' ? (
                <InputField
                  label="Email"
                  placeholder="Type here"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              ) : (
                <View style={styles.phoneInputContainer}>
                  <Text style={styles.phoneLabel}>Phone</Text>
                  <View style={styles.phoneWrapper}>
                    <TouchableOpacity style={styles.countrySelector} activeOpacity={0.7}>
                      <Text style={styles.countryText}>{countryCode}</Text>
                      <Text style={styles.dropdownArrow}>▾</Text>
                    </TouchableOpacity>
                    <View style={styles.phoneDivider} />
                    <TextInput
                      placeholder="Type here"
                      placeholderTextColor="#A0A0B0"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      style={styles.phoneInputField}
                    />
                  </View>
                </View>
              )}

              <InputField
                label="Name"
                placeholder="Type here"
                value={name}
                onChangeText={setName}
              />
              <InputField
                label="Password"
                placeholder="Type here"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <InputField
                label="Retype - Password"
                placeholder="Type here"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
            </View>

            {/* Submit Button */}
            <GradientButton
              title="Create Account"
              onPress={() => onNavigate('EnterOTP')}
              style={styles.submitBtn}
            />

            {/* Back to Login Button */}
            <TouchableOpacity
              onPress={() => onNavigate('SignIn')}
              activeOpacity={0.7}
              style={styles.backButton}
            >
              <View style={styles.backIconCircle}>
                <BackArrowIcon color="#3A3258" size={14} />
              </View>
              <Text style={styles.backText}>Back to login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FAF8FC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E879F9', // gradient outline simulator
  },
  tabButtonInactive: {
    backgroundColor: 'transparent',
  },
  activeGradientBorder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  tabTextActive: {
    color: '#1F1936',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
  tabTextInactive: {
    color: '#6E6782',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'System',
  },
  form: {
    width: '100%',
  },
  phoneInputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  phoneLabel: {
    fontSize: 14,
    color: '#3A3258',
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'System',
  },
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    height: 52,
    paddingHorizontal: 16,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  countryText: {
    fontSize: 15,
    color: '#1F1936',
    fontWeight: '500',
    marginRight: 4,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#8E8E9F',
  },
  phoneDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#ECE8F2',
    marginHorizontal: 12,
  },
  phoneInputField: {
    flex: 1,
    color: '#1F1936',
    fontSize: 15,
    height: '100%',
    padding: 0,
  },
  submitBtn: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  backIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  backText: {
    color: '#6E6782',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
