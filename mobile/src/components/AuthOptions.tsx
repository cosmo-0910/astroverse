import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleIcon, AppleIcon, EmailIcon } from './CustomIcons';

interface AuthOptionsProps {
  label: string;
  onPressOption?: (option: 'google' | 'apple' | 'email') => void;
}

export default function AuthOptions({ label, onPressOption }: AuthOptionsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>{label}</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => onPressOption?.('google')}
          activeOpacity={0.7}
          style={styles.socialBtn}
        >
          <GoogleIcon size={20} />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressOption?.('apple')}
          activeOpacity={0.7}
          style={styles.socialBtn}
        >
          <AppleIcon size={20} />
          <Text style={styles.socialText}>Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressOption?.('email')}
          activeOpacity={0.7}
          style={styles.socialBtn}
        >
          <EmailIcon color="#1F1936" size={18} />
          <Text style={styles.socialText}>Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ECE8F2',
  },
  dividerText: {
    fontSize: 11,
    color: '#8E8E9F',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginHorizontal: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF8FC',
    borderWidth: 1,
    borderColor: '#ECE8F2',
    borderRadius: 12,
    height: 48,
    marginHorizontal: 4,
  },
  socialText: {
    color: '#1F1936',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'System',
  },
});
