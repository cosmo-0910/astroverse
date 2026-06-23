import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import BottomTabNavigator, { TabType } from '../components/BottomTabNavigator';
import { ScreenType } from '../navigation/AppNavigator';
import { SearchIcon, PlusIcon } from '../components/CustomIcons';

interface MessagesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTabChange: (tab: TabType) => void;
}

export default function MessagesScreen({ onNavigate, onTabChange }: MessagesScreenProps) {
  const [searchText, setSearchText] = useState('');

  const conversations = [
    { name: 'Marvin McKinney', time: '2h', msg: 'Curious how the community weighs these for l...', unread: 2 },
    { name: 'Jenny Wilson', time: '2h', msg: 'Curious how the community weighs these for l...', unread: 2 },
    { name: 'Jacob Jones', time: '2h', msg: 'Curious how the community weighs these for long-t...', unread: 0 },
    { name: 'Ronald Richards', time: '2h', msg: 'Curious how the community weighs these for long-t...', unread: 0 },
    { name: 'Eleanor Pena', time: '2h', msg: 'Curious how the community weighs these for long-t...', unread: 0 },
    { name: 'Guy Hawkins', time: '2h', msg: 'Curious how the community weighs these for long-t...', unread: 0 },
    { name: 'Cameron Williamson', time: '2h', msg: 'Curious how the community weighs these for long-t...', unread: 0 },
    { name: 'Floyd Miles', time: '2h', msg: 'Curious how the community weighs these for long-t...', unread: 0 },
    { name: 'Jacob Jones (2)', time: '2h', msg: 'Curious how the community weighs these for long-t...', unread: 0 },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/celestial_lines.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* Top Header Bar Search */}
        <View style={styles.header}>
          <Image source={require('../../assets/logo.png')} style={styles.headerLogo} />
          
          <View style={styles.searchWrapper}>
            <SearchIcon color="#8E8E9F" size={16} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#A0A0B0"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>

          <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
        </View>

        {/* Conversations Header */}
        <View style={styles.conversationsHeader}>
          <Text style={styles.sectionTitle}>Conversations</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.plusBtn}>
            <PlusIcon color="#FFFFFF" size={16} />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.listCard}>
            {conversations.map((chat, idx) => (
              <TouchableOpacity key={idx} onPress={() => onNavigate('ChatRoom')} activeOpacity={0.7} style={styles.chatItem}>
                <Image source={require('../../assets/avatar.png')} style={styles.chatAvatar} />
                <View style={styles.chatInfo}>
                  <View style={styles.chatHeaderRow}>
                    <Text style={styles.chatName}>{chat.name}</Text>
                    <Text style={styles.chatTime}>{chat.time}</Text>
                  </View>
                  <View style={styles.chatMessageRow}>
                    <Text style={styles.chatMessage} numberOfLines={1}>
                      {chat.msg}
                    </Text>
                    {chat.unread > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{chat.unread}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Floating Bottom Tab Bar */}
        <BottomTabNavigator activeTab="Messages" onTabChange={onTabChange} />
      </ImageBackground>
    </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 15,
  },
  headerLogo: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7E22CE',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1F1936',
    marginLeft: 6,
    padding: 0,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  conversationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  plusBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1', // indigo plus button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120, // tab spacer
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#FAF8FC',
  },
  chatAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 14,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  chatTime: {
    fontSize: 12,
    color: '#8E8E9F',
    fontWeight: '400',
  },
  chatMessageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMessage: {
    fontSize: 13,
    color: '#6E6782',
    fontFamily: 'System',
    flex: 1,
    paddingRight: 10,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EC4899', // Pink unread badge
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'System',
  },
});
