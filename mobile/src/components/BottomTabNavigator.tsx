import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { TabHomeIcon, TabDiscoverIcon, TabChatIcon, TabForumsIcon, TabMessagesIcon } from './CustomIcons';

export type TabType = 'Home' | 'Discover' | 'AIChat' | 'Forums' | 'Messages';

interface BottomTabNavigatorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomTabNavigator({ activeTab, onTabChange }: BottomTabNavigatorProps) {
  const tabs = [
    { key: 'Home' as TabType, label: 'Home', Icon: TabHomeIcon },
    { key: 'Discover' as TabType, label: 'Discover', Icon: TabDiscoverIcon },
    { key: 'AIChat' as TabType, label: 'Chat', Icon: TabChatIcon },
    { key: 'Forums' as TabType, label: 'Forums', Icon: TabForumsIcon },
    { key: 'Messages' as TabType, label: 'Messages', Icon: TabMessagesIcon },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const { Icon } = tab;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.85}
              style={[
                styles.tabButton,
                isActive ? styles.tabButtonActive : styles.tabButtonInactive,
              ]}
            >
              {isActive ? (
                // Active Gradient Simulator
                <View style={styles.activeBg}>
                  <Icon color="#FFFFFF" size={16} />
                  <Text style={styles.activeText}>{tab.label}</Text>
                </View>
              ) : (
                <Icon color="#8E8E9F" size={20} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    height: 64,
    width: width - 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  tabButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonInactive: {
    flex: 1,
  },
  tabButtonActive: {
    flex: 2.2, // Gives the active tab more space for the text label
    borderRadius: 24,
    overflow: 'hidden',
  },
  activeBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#79247E', // Simulating active gradient starting color
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  activeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'System',
  },
});
