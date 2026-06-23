import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { BackArrowIcon, SendIcon, MicrophoneIcon, LikeIcon, TrashIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface ChatRoomScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function ChatRoomScreen({ onNavigate }: ChatRoomScreenProps) {
  const [chatText, setChatText] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Messages')} activeOpacity={0.7} style={styles.headerBtn}>
          <BackArrowIcon color="#1F1936" size={18} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Marvin McKinney</Text>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>Active now</Text>
            <Text style={styles.detailText}> • Aquarius 90%</Text>
          </View>
        </View>

        <Image source={require('../../assets/avatar.png')} style={styles.headerAvatar} />
      </View>

      <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
        {/* Outgoing Message */}
        <View style={styles.messageRowOutgoing}>
          <View style={styles.outgoingBubble}>
            <Text style={styles.outgoingText}>
              Curious how the community weighs these for long-term partnerships.
            </Text>
          </View>
          <Image source={require('../../assets/avatar.png')} style={styles.userAvatar} />
        </View>

        {/* Incoming Message */}
        <View style={styles.messageRowIncoming}>
          <Image source={require('../../assets/avatar.png')} style={styles.senderAvatar} />
          <View style={styles.incomingBubble}>
            <Text style={styles.incomingText}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </Text>
            {/* Action Buttons Underneath */}
            <View style={styles.messageActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Translate</Text>
              </TouchableOpacity>
              <View style={styles.actionGroupRight}>
                <TouchableOpacity style={styles.smallActionBtn}>
                  <LikeIcon color="#8E8E9F" size={14} />
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
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </Text>
          </View>
          <Image source={require('../../assets/avatar.png')} style={styles.userAvatar} />
        </View>

        {/* Typing Bubble */}
        <View style={styles.messageRowIncoming}>
          <Image source={require('../../assets/avatar.png')} style={styles.senderAvatar} />
          <View style={[styles.incomingBubble, styles.typingBubble]}>
            <Text style={styles.typingText}>Typing...</Text>
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
            placeholder="Type here..."
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
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
    fontFamily: 'System',
  },
  detailText: {
    fontSize: 11,
    color: '#8E8E9F',
    fontWeight: '500',
    fontFamily: 'System',
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  chatScroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  messageRowOutgoing: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    width: '100%',
  },
  outgoingBubble: {
    backgroundColor: '#79247E', // Simulating gradient bubble
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
  senderAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignSelf: 'flex-end',
    marginRight: 10,
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
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#8E8E9F',
    fontSize: 11,
    fontWeight: '600',
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#F5F2F9',
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
