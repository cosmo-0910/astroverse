import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import BottomTabNavigator, { TabType } from '../components/BottomTabNavigator';
import { ScreenType } from '../navigation/AppNavigator';
import { CloseIcon, UndoIcon, HeartIcon } from '../components/CustomIcons';

interface DiscoverScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTabChange: (tab: TabType) => void;
}

export default function DiscoverScreen({ onNavigate, onTabChange }: DiscoverScreenProps) {
  const [activeToggle, setActiveToggle] = useState<'dating' | 'friend'>('dating');

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
          
          {/* Dating vs Friend Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setActiveToggle('dating')}
              activeOpacity={0.8}
              style={[styles.toggleBtn, activeToggle === 'dating' && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, activeToggle === 'dating' && styles.toggleTextActive]}>Dating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveToggle('friend')}
              activeOpacity={0.8}
              style={[styles.toggleBtn, activeToggle === 'friend' && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, activeToggle === 'friend' && styles.toggleTextActive]}>Friend</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => onNavigate('UserProfile')} activeOpacity={0.8}>
            <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        {/* Profile Card Container */}
        <View style={styles.cardContainer}>
          <ImageBackground
            source={require('../../assets/elena.png')}
            imageStyle={styles.cardImage}
            style={styles.profileCard}
          >
            {/* Top Compatibility Badge */}
            <View style={styles.badgeRow}>
              <View style={styles.compatibilityBadge}>
                <Text style={styles.compatibilityText}>Compatibility Match</Text>
                <View style={styles.percentageCircle}>
                  <Text style={styles.percentageText}>90%</Text>
                </View>
              </View>
            </View>

            {/* Gradient Overlay for Text Legibility */}
            <View style={styles.cardOverlay}>
              {/* Name & Basic Details */}
              <View style={styles.detailsRow}>
                <Text style={styles.nameText}>Elena</Text>
                <Text style={styles.infoText}>DOB ♑</Text>
              </View>

              <Text style={styles.bioText}>
                Architect by day, jazz pianist by night. Tea over coffee, stars over screens.
              </Text>

              {/* Astrological Tag Chips */}
              <View style={styles.tagRow}>
                <View style={styles.tagChip}>
                  <Text style={styles.tagChipText}>Sun Pisces</Text>
                </View>
                <View style={styles.tagChip}>
                  <Text style={styles.tagChipText}>Moon Cancer</Text>
                </View>
                <View style={styles.tagChip}>
                  <Text style={styles.tagChipText}>Rising Libra</Text>
                </View>
              </View>

              {/* AI Astrological Compatibility Insights */}
              <View style={styles.insightBox}>
                <Text style={styles.insightText}>
                  "Your Venus-Mars connection is powerful. A magnetic spark suggests deep-emotional alignment."
                </Text>
              </View>

              {/* Circular Action Buttons */}
              <View style={styles.actionsRow}>
                {/* Dislike/Cross */}
                <TouchableOpacity activeOpacity={0.8} style={styles.circleBtn}>
                  <CloseIcon color="#6E6782" size={20} />
                </TouchableOpacity>

                {/* Rewind/Play */}
                <TouchableOpacity activeOpacity={0.8} style={[styles.circleBtn, styles.rewindBtn]}>
                  <UndoIcon color="#FFFFFF" size={18} />
                </TouchableOpacity>

                {/* Like/Heart */}
                <TouchableOpacity activeOpacity={0.8} style={[styles.circleBtn, styles.heartBtn]}>
                  <HeartIcon color="#FFFFFF" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Floating Bottom Tab Bar */}
        <BottomTabNavigator activeTab="Discover" onTabChange={onTabChange} />
      </ImageBackground>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FAF8FC',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    width: 140,
    justifyContent: 'space-between',
  },
  toggleBtn: {
    flex: 1,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '500',
    fontFamily: 'System',
  },
  toggleTextActive: {
    color: '#1F1936',
    fontWeight: '600',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 110, // space for bottom tabs
  },
  profileCard: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  cardImage: {
    borderRadius: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  compatibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 4,
  },
  compatibilityText: {
    fontSize: 11,
    color: '#1F1936',
    fontWeight: '600',
    marginRight: 6,
    fontFamily: 'System',
  },
  percentageCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#7E22CE',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  percentageText: {
    fontSize: 10,
    color: '#7E22CE',
    fontWeight: '700',
    fontFamily: 'System',
  },
  cardOverlay: {
    backgroundColor: 'rgba(5, 2, 15, 0.5)', // gradient fade-up tint for text visibility
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  nameText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'System',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#E2E8F0',
    fontWeight: '500',
    fontFamily: 'System',
  },
  bioText: {
    fontSize: 13,
    color: '#FAF8FC',
    lineHeight: 18,
    fontFamily: 'System',
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagChipText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'System',
  },
  insightBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  insightText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 18,
    fontFamily: 'System',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  rewindBtn: {
    backgroundColor: '#79247E', // Simulating gradient background active rewind
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  heartBtn: {
    backgroundColor: '#DB2F7E',
  },
});
