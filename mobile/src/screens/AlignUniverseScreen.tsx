import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import GradientButton from '../components/GradientButton';
import { BackArrowIcon, CalendarIcon, ClockIcon, MapPinIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface AlignUniverseScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function AlignUniverseScreen({ onNavigate }: AlignUniverseScreenProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');

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
            onPress={() => onNavigate('CreateNewPassword')}
            activeOpacity={0.7}
            style={styles.backButtonCircle}
          >
            <BackArrowIcon color="#3A3258" size={16} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Title and Subtitle */}
            <Text style={styles.title}>Align Your Universe</Text>
            <Text style={styles.subtitle}>
              Enter your cosmic coordinates to synchronize with the stars and unveil your celestial blueprint.
            </Text>

            {/* Form Fields */}
            <View style={styles.form}>
              {/* Name Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Type here"
                  placeholderTextColor="#A0A0B0"
                  value={name}
                  onChangeText={setName}
                  style={styles.textInput}
                />
              </View>

              {/* Date & Time (Side-by-Side) */}
              <View style={styles.row}>
                <View style={[styles.fieldContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TouchableOpacity style={styles.selectorWrapper} activeOpacity={0.7}>
                    <Text style={styles.selectorPlaceholder}>{dob || 'Select Date'}</Text>
                    <CalendarIcon color="#8E8E9F" size={18} />
                  </TouchableOpacity>
                </View>

                <View style={[styles.fieldContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Time of Birth</Text>
                  <TouchableOpacity style={styles.selectorWrapper} activeOpacity={0.7}>
                    <Text style={styles.selectorPlaceholder}>{tob || 'Select Time'}</Text>
                    <ClockIcon color="#8E8E9F" size={18} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Place of Birth */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Place of Birth</Text>
                <View style={styles.searchWrapper}>
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor="#A0A0B0"
                    value={pob}
                    onChangeText={setPob}
                    style={styles.searchInputField}
                  />
                  <MapPinIcon color="#8E8E9F" size={16} />
                </View>
              </View>

              {/* Gender & Interests (Side-by-Side) */}
              <View style={styles.row}>
                <View style={[styles.fieldContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Gender</Text>
                  <TouchableOpacity style={styles.selectorWrapper} activeOpacity={0.7}>
                    <Text style={styles.selectorPlaceholder}>{gender || 'Select'}</Text>
                    <Text style={styles.dropdownArrow}>▾</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.fieldContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Interests</Text>
                  <TouchableOpacity style={styles.selectorWrapper} activeOpacity={0.7}>
                    <Text style={styles.selectorPlaceholder}>{interests || 'Select'}</Text>
                    <Text style={styles.dropdownArrow}>▾</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Warning/Precision box */}
              <View style={styles.noticeBox}>
                <Text style={styles.noticeText}>
                  Precision matters. Your exact birth time ensures a truly personalized chart alignment.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.bottomSection}>
          <GradientButton
            title="Continue"
            onPress={() => onNavigate('Dashboard')}
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
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
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
    marginBottom: 24,
    fontFamily: 'System',
  },
  form: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#3A3258',
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'System',
  },
  textInput: {
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    height: 52,
    paddingHorizontal: 16,
    color: '#1F1936',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  selectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    height: 52,
    paddingHorizontal: 16,
  },
  selectorPlaceholder: {
    color: '#A0A0B0',
    fontSize: 15,
    fontFamily: 'System',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#8E8E9F',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    height: 52,
    paddingHorizontal: 16,
  },
  searchInputField: {
    flex: 1,
    color: '#1F1936',
    fontSize: 15,
    height: '100%',
    padding: 0,
  },
  noticeBox: {
    backgroundColor: '#FCE7F3', // Light pink background
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  noticeText: {
    color: '#BE185D', // Deep pink
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: 'System',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueBtn: {
    width: '100%',
  },
});
