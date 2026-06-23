import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import BottomTabNavigator, { TabType } from '../components/BottomTabNavigator';
import { ScreenType } from '../navigation/AppNavigator';
import { HomeIcon, HamburgerIcon, SendIcon, MicrophoneIcon, LikeIcon, DislikeIcon, TrashIcon, UndoIcon } from '../components/CustomIcons';

interface AIChatScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTabChange: (tab: TabType) => void;
}

export default function AIChatScreen({ onNavigate, onTabChange }: AIChatScreenProps) {
  const [chatText, setChatText] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onTabChange('Home')} activeOpacity={0.7} style={styles.headerBtn}>
          <HomeIcon color="#1F1936" size={20} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Astra</Text>
          <Text style={styles.headerSubtitle}>Cosmic Intelligence</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={[styles.headerBtn, { marginLeft: 8 }]}>
            <HamburgerIcon color="#1F1936" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
        {/* Outgoing Message */}
        <View style={styles.messageRowOutgoing}>
          <View style={styles.outgoingBubble}>
            <Text style={styles.outgoingText}>
              Officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </Text>
          </View>
          <Image source={require('../../assets/avatar.png')} style={styles.userAvatar} />
        </View>

        {/* Incoming Message */}
        <View style={styles.messageRowIncoming}>
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>A</Text>
          </View>
          <View style={styles.incomingBubble}>
            <Text style={styles.incomingText}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </Text>
            {/* Action Buttons Underneath */}
            <View style={styles.messageActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <UndoIcon color="#8E8E9F" size={14} />
                <Text style={styles.actionBtnText}>Regenerate</Text>
              </TouchableOpacity>
              <View style={styles.actionGroupRight}>
                <TouchableOpacity style={styles.smallActionBtn}>
                  <LikeIcon color="#8E8E9F" size={14} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallActionBtn}>
                  <DislikeIcon color="#8E8E9F" size={14} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallActionBtn}>
                  <TrashIcon color="#8E8E9F" size={14} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Outgoing Message */}
        <View style={styles.messageRowOutgoing}>
          <View style={styles.outgoingBubble}>
            <Text style={styles.outgoingText}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </Text>
          </View>
          <Image source={require('../../assets/avatar.png')} style={styles.userAvatar} />
        </View>

        {/* Typing Bubble */}
        <View style={styles.messageRowIncoming}>
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>A</Text>
          </View>
          <View style={[styles.incomingBubble, styles.typingBubble]}>
            <Text style={styles.typingText}>Typing</Text>
          </View>
        </View>
      </ScrollView>

      {/* Chat Footer Box Input */}
      <View style={styles.footer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.micBtn}>
            <MicrophoneIcon color="#8E8E9F" size={18} />
          </TouchableOpacity>
          <TextInput
            placeholder="Ask about your destiny..."
            placeholderTextColor="#8E8E9F"
            value={chatText}
            onChangeText={setChatText}
            style={styles.textInput}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.sendBtn}>
            <SendIcon color="#FFFFFF" size={14} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Bottom Tab Bar */}
      <BottomTabNavigator activeTab="AIChat" onTabChange={onTabChange} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ECE8F2',
    backgroundColor: '#FFFFFF',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8E8E9F',
    fontWeight: '500',
    marginTop: 2,
    fontFamily: 'System',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: '#FFF1F2',
    borderColor: '#FFE4E6',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  premiumText: {
    color: '#E11D48',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'System',
  },
  chatScroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 180, // Extra padding to keep inputs above bottom tabs
  },
  messageRowOutgoing: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    width: '100%',
  },
  outgoingBubble: {
    backgroundColor: '#79247E', // Simulating active gradient bubble
    borderRadius: 16,
    borderBottomRightRadius: 2,
    padding: 14,
    maxWidth: '80%',
    marginRight: 10,
  },
  outgoingText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'System',
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignSelf: 'flex-end',
  },
  messageRowIncoming: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F092A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  botAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  incomingBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomLeftRadius: 2,
    padding: 14,
    maxWidth: '82%',
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  incomingText: {
    color: '#1F1936',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'System',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#FAF8FC',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#8E8E9F',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionGroupRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallActionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  typingText: {
    color: '#8E8E9F',
    fontStyle: 'italic',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 96, // Sits above bottom tabs
    left: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 12,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F1936',
    height: '100%',
    paddingHorizontal: 10,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#581C87',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
