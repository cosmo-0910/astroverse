import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { BackArrowIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface NotificationsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const notifications = [
    { type: 'system', icon: '🪐', title: 'Your Chart Aligned', desc: 'A study of planetary coordinates with your natal blueprint is complete.', time: '2h ago' },
    { type: 'message', icon: '✉️', title: 'New Message: Aaron', desc: 'Aaron sent you a message: Hey Lyra, let\'s connect and discuss...', time: '2h ago' },
    { type: 'forum', icon: '🗣️', title: 'Forums: Astro Question of the Day', desc: 'Have you answered the rising sign bio question yet?', time: '1d ago' },
    { type: 'match', avatar: require('../../assets/avatar.png'), title: 'Compatibility Match', desc: 'Lyra, you matched with Aaron (90% Compatibility).', time: '2d ago' },
    { type: 'match', avatar: require('../../assets/elena.png'), title: 'Compatibility Match', desc: 'Lyra, you matched with Elena (90% Compatibility).', time: '2d ago' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/celestial_lines.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* Top Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('Messages')} activeOpacity={0.7} style={styles.headerBtn}>
            <BackArrowIcon color="#1F1936" size={18} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Title and Subtitle */}
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Stay updated with your personal movements.</Text>

          {/* Filter Pills */}
          <View style={styles.filterRow}>
            {['All', 'System', 'Personal'].map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  activeOpacity={0.8}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Notifications List */}
          <View style={styles.list}>
            {notifications.map((item, idx) => (
              <View key={idx} style={styles.notifyItem}>
                <View style={styles.iconCol}>
                  {item.avatar ? (
                    <Image source={item.avatar} style={styles.notifyAvatar} />
                  ) : (
                    <View style={[
                      styles.notifyIconBox,
                      item.type === 'system' ? styles.bgSystem : item.type === 'message' ? styles.bgMessage : styles.bgForum
                    ]}>
                      <Text style={styles.notifyIcon}>{item.icon}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.contentCol}>
                  <View style={styles.notifyHeaderRow}>
                    <Text style={styles.notifyTitle}>{item.title}</Text>
                    <Text style={styles.notifyTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.notifyDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  headerBtn: {
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6782',
    fontFamily: 'System',
    marginTop: 6,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECE8F2',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#79247E', // Simulating active gradient chip
    borderColor: '#79247E',
  },
  filterText: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    width: '100%',
  },
  notifyItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  iconCol: {
    marginRight: 12,
    justifyContent: 'center',
  },
  notifyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  notifyIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgSystem: {
    backgroundColor: '#EEF2FF',
  },
  bgMessage: {
    backgroundColor: '#FDF2F8',
  },
  bgForum: {
    backgroundColor: '#F0FDF4',
  },
  notifyIcon: {
    fontSize: 16,
  },
  contentCol: {
    flex: 1,
  },
  notifyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notifyTitle: {
    fontSize: 13,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
    flex: 1,
    paddingRight: 6,
  },
  notifyTime: {
    fontSize: 11,
    color: '#8E8E9F',
  },
  notifyDesc: {
    fontSize: 12,
    color: '#6E6782',
    lineHeight: 16,
    fontFamily: 'System',
  },
});
