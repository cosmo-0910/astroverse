import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function GradientButton({ title, onPress, style, textStyle }: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.buttonContainer, style]}>
      {/* Deep cosmic purple base */}
      <View style={[styles.gradientBg, { backgroundColor: '#1A0E45' }]} />
      {/* Mid purple blend */}
      <View style={[styles.gradientBg, { backgroundColor: '#79247E', opacity: 0.65, left: '30%' }]} />
      {/* Bright neon pink end */}
      <View style={[styles.gradientBg, { backgroundColor: '#DB2F7E', opacity: 0.9, left: '60%', width: '60%' }]} />

      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#DB2F7E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
