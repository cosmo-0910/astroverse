import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { EyeIcon } from './CustomIcons';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}

export default function InputField({
  label,
  placeholder = 'Type here',
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#A0A0B0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          style={styles.input}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <EyeIcon color="#8E8E9F" size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    height: 52,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    color: '#1F1936',
    fontSize: 15,
    fontFamily: 'System',
    height: '100%',
    padding: 0,
  },
  eyeBtn: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
