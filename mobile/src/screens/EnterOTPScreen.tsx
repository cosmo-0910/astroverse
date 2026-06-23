import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import GradientButton from '../components/GradientButton';
import { BackArrowIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface EnterOTPScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function EnterOTPScreen({ onNavigate }: EnterOTPScreenProps) {
  const [otp, setOtp] = useState(['6', '', '', '', '', '']);
  const [timer, setTimer] = useState(39);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  // Simple countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Focus previous input on backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

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
            onPress={() => onNavigate('SignUp')}
            activeOpacity={0.7}
            style={styles.backButtonCircle}
          >
            <BackArrowIcon color="#3A3258" size={16} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title and Subtitle */}
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit OTP that we sent to <Text style={styles.emailHighlight}>examples@gmail.com</Text>
          </Text>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            {otp.map((val, idx) => (
              <TextInput
                key={idx}
                ref={(ref) => { inputsRef.current[idx] = ref; }}
                value={val}
                onChangeText={(text) => handleChangeText(text, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpBox}
                selectTextOnFocus
                autoFocus={idx === 1} // Auto-focus second box as mock shows first filled
              />
            ))}
          </View>

          {/* Countdown timer */}
          <Text style={styles.timerText}>{formatTimer(timer)}</Text>
        </View>

        {/* Action Button */}
        <View style={styles.bottomSection}>
          <GradientButton
            title="Confirm"
            onPress={() => onNavigate('CreateNewPassword')}
            style={styles.confirmBtn}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
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
    marginBottom: 36,
    fontFamily: 'System',
  },
  emailHighlight: {
    fontWeight: '700',
    color: '#1F1936',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otpBox: {
    width: 48,
    height: 52,
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1936',
  },
  timerText: {
    fontSize: 14,
    color: '#3A3258',
    fontWeight: '600',
    marginTop: 8,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  confirmBtn: {
    width: '100%',
  },
});
