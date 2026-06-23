import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch, ImageBackground } from 'react-native';
import { BellIcon, ChevronRightIcon, EditIcon } from '../components/CustomIcons';
import BottomTabNavigator, { TabType } from '../components/BottomTabNavigator';
import { ScreenType } from '../navigation/AppNavigator';

interface UserProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTabChange: (tab: TabType) => void;
}

export default function UserProfileScreen({ onNavigate, onTabChange }: UserProfileScreenProps) {
  const [dailyReminder, setDailyReminder] = useState(true);

  const settingsList = [
    { title: 'Natal Chart', desc: 'My zodiac details', route: 'AlignUniverse' as ScreenType },
    { title: 'Compatibility', desc: 'Compare matching with friends/dates', route: 'CompatibilityCenter' as ScreenType },
    { title: 'Mod Actions', desc: 'Manage reported posts', route: 'Dashboard' as ScreenType },
    { title: 'Saved Readings', desc: 'Offline daily guidance readings', route: 'Dashboard' as ScreenType },
    { title: 'Direct Forums', desc: 'Direct communities threads', route: 'Forums' as ScreenType },
    { title: 'Notification Settings', desc: 'Custom alerts triggers', route: 'Notifications' as ScreenType },
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
          <Image source={require('../../assets/logo.png')} style={styles.headerLogo} />
          
          <TouchableOpacity onPress={() => onNavigate('Notifications')} activeOpacity={0.7} style={styles.headerBtn}>
            <BellIcon color="#1F1936" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Profile Section Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Image source={require('../../assets/avatar.png')} style={styles.avatarImage} />
              <View style={styles.editBadge}>
                <EditIcon color="#1F1936" size={12} />
              </View>
            </View>
            <View style={styles.proBadge}>
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.nameText}>Lyra Astro</Text>
            <Text style={styles.astrologyText}>Sun: Taurus | Moon: Pisces | Rising: Scorpio</Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <Text style={styles.statsCount}>47</Text>
                <Text style={styles.statsLabel}>Matches</Text>
              </View>
              <View style={styles.statsDivider} />
              <View style={styles.statsItem}>
                <Text style={styles.statsCount}>120</Text>
                <Text style={styles.statsLabel}>Chart Alignments</Text>
              </View>
              <View style={styles.statsDivider} />
              <View style={styles.statsItem}>
                <Text style={styles.statsCount}>12</Text>
                <Text style={styles.statsLabel}>Forums</Text>
              </View>
            </View>
          </View>

          {/* Profile Completion Card */}
          <View style={styles.completionCard}>
            <View style={styles.completionBg} />
            <View style={styles.completionBadge}>
              <Text style={styles.completionBadgeText}>📈</Text>
            </View>
            <View style={styles.completionInfo}>
              <Text style={styles.completionTitle}>Complete your profile</Text>
              <Text style={styles.completionSub}>67% completed, add birth details.</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigate('AlignUniverse')} style={styles.completionArrow}>
              <ChevronRightIcon color="#79247E" size={16} />
            </TouchableOpacity>
          </View>

          {/* Settings Options List */}
          <View style={styles.optionsCard}>
            {/* Daily Reminder option with Switch */}
            <View style={styles.optionItem}>
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>⏰</Text>
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Daily Reminder</Text>
                <Text style={styles.optionDesc}>Daily alerts</Text>
              </View>
              <Switch
                value={dailyReminder}
                onValueChange={setDailyReminder}
                trackColor={{ false: '#ECE8F2', true: '#C084FC' }}
                thumbColor={dailyReminder ? '#7E22CE' : '#F3F4F6'}
              />
            </View>

            {/* General Arrow list settings */}
            {settingsList.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  if (item.route === 'Forums') {
                    onTabChange('Forums');
                  } else if (item.route === 'Notifications') {
                    onNavigate('Notifications');
                  } else {
                    onNavigate(item.route);
                  }
                }}
                activeOpacity={0.7}
                style={[
                  styles.optionItem,
                  idx === settingsList.length - 1 && styles.lastOptionItem
                ]}
              >
                <View style={[styles.optionIconContainer, { backgroundColor: '#F3F4F6' }]}>
                  <Text style={styles.optionIcon}>
                    {idx === 0 ? '🪐' : idx === 1 ? '💖' : idx === 2 ? '🛡️' : idx === 3 ? '📖' : idx === 4 ? '🗣️' : '🔔'}
                  </Text>
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionDesc}>{item.desc}</Text>
                </View>
                <ChevronRightIcon color="#8E8E9F" size={16} />
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
    paddingBottom: 120, // space for bottom navigator
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  proBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#C084FC',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  proText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  nameText: {
    fontSize: 20,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
    marginBottom: 6,
  },
  astrologyText: {
    fontSize: 12,
    color: '#6E6782',
    fontFamily: 'System',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#FAF8FC',
    paddingTop: 16,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  statsCount: {
    fontSize: 18,
    color: '#1F1936',
    fontWeight: '700',
  },
  statsLabel: {
    fontSize: 11,
    color: '#8E8E9F',
    fontWeight: '500',
    marginTop: 4,
  },
  statsDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#ECE8F2',
  },
  completionCard: {
    backgroundColor: '#EAE5F5',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  completionBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#EAE5F5', // Simulating gradient background
  },
  completionBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    zIndex: 1,
  },
  completionBadgeText: {
    fontSize: 18,
  },
  completionInfo: {
    flex: 1,
    zIndex: 1,
  },
  completionTitle: {
    fontSize: 14,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  completionSub: {
    fontSize: 11,
    color: '#6E6782',
    fontFamily: 'System',
    marginTop: 2,
  },
  completionArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 10,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#FAF8FC',
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionIcon: {
    fontSize: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  optionDesc: {
    fontSize: 11,
    color: '#8E8E9F',
    fontFamily: 'System',
    marginTop: 2,
  },
});
