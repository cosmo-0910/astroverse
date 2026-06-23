import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { BackArrowIcon, SparklesIcon, CloseIcon, HeartIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface CompatibilityCenterScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function CompatibilityCenterScreen({ onNavigate }: CompatibilityCenterScreenProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'friend' | 'date'>('all');
  const [activeSubTab, setActiveSubTab] = useState<'sun' | 'connection' | 'detail'>('sun');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/celestial_lines.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* Top Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('Dashboard')} activeOpacity={0.7} style={styles.headerBtn}>
            <BackArrowIcon color="#1F1936" size={18} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.headerBtn}>
            <SparklesIcon color="#79247E" size={18} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Main Title */}
          <Text style={styles.headerTitle}>COMPATIBILITY CENTER</Text>
          <Text style={styles.headerSubtitle}>Deep dive astrological comparison reports for you.</Text>

          {/* Toggle Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setActiveTab('all')}
              activeOpacity={0.8}
              style={[styles.tabBtn, activeTab === 'all' && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('friend')}
              activeOpacity={0.8}
              style={[styles.tabBtn, activeTab === 'friend' && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, activeTab === 'friend' && styles.tabTextActive]}>Friendship</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('date')}
              activeOpacity={0.8}
              style={[styles.tabBtn, activeTab === 'date' && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, activeTab === 'date' && styles.tabTextActive]}>Dating</Text>
            </TouchableOpacity>
          </View>

          {/* Main Swiper Match Card */}
          <View style={styles.matchCard}>
            <View style={styles.cardHeader}>
              <Image source={require('../../assets/avatar.png')} style={styles.cardAvatar} />
              <View style={styles.cardMeta}>
                <Text style={styles.cardName}>Aaron, 26</Text>
                <Text style={styles.cardZodiac}>Pisces Sun • Capricorn Moon</Text>
                <Text style={styles.cardRising}>Scorpio Rising</Text>
              </View>
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>91%</Text>
              </View>
            </View>
            <View style={styles.cardButtonsRow}>
              <TouchableOpacity style={styles.cardBtnSec}>
                <Text style={styles.cardBtnTextSec}>View Report</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate('Messages')} style={styles.cardBtnPri}>
                <Text style={styles.cardBtnTextPri}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Compatibility Analysis Circular Stats */}
          <Text style={styles.sectionHeader}>Compatibility Analysis</Text>
          <View style={styles.analysisContainer}>
            <View style={styles.analysisItem}>
              <View style={styles.circleProgress}>
                <Text style={styles.progressText}>82%</Text>
              </View>
              <Text style={styles.progressLabel}>Intellectual Resonance</Text>
            </View>

            <View style={styles.analysisItem}>
              <View style={[styles.circleProgress, { borderColor: '#EC4899' }]}>
                <Text style={styles.progressText}>87%</Text>
              </View>
              <Text style={styles.progressLabel}>Communication Flow</Text>
            </View>

            <View style={styles.analysisItem}>
              <View style={[styles.circleProgress, { borderColor: '#F59E0B' }]}>
                <Text style={styles.progressText}>73%</Text>
              </View>
              <Text style={styles.progressLabel}>Romantic Alignment</Text>
            </View>
          </View>

          {/* Synastry Insights Details */}
          <View style={styles.insightsCard}>
            <Text style={styles.insightLabel}>Synastry Insights</Text>
            <Text style={styles.insightText}>
              Aries Moon in Pisces forms a harmonious trine with your Scorpio Rising, suggesting an immediate, almost psychic emotional bond. Her Venus in Leo sparks intense passion, though it may require conscious effort to balance your more reserved approach.
            </Text>

            {/* Sub Tabs */}
            <View style={styles.subTabsRow}>
              <TouchableOpacity
                onPress={() => setActiveSubTab('sun')}
                style={[styles.subTab, activeSubTab === 'sun' && styles.subTabActive]}
              >
                <Text style={[styles.subTabText, activeSubTab === 'sun' && styles.subTabTextActive]}>Sun</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveSubTab('connection')}
                style={[styles.subTab, activeSubTab === 'connection' && styles.subTabActive]}
              >
                <Text style={[styles.subTabText, activeSubTab === 'connection' && styles.subTabTextActive]}>Connection</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveSubTab('detail')}
                style={[styles.subTab, activeSubTab === 'detail' && styles.subTabActive]}
              >
                <Text style={[styles.subTabText, activeSubTab === 'detail' && styles.subTabTextActive]}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Carousel Swiper Match Card */}
          <Text style={styles.sectionHeader}>Compatibility Analysis</Text>
          <View style={styles.matchCardCarousel}>
            <View style={styles.cardHeader}>
              <Image source={require('../../assets/avatar.png')} style={styles.cardAvatar} />
              <View style={styles.cardMeta}>
                <Text style={styles.cardName}>Aaron, 26</Text>
                <Text style={styles.cardZodiac}>Pisces Sun • Capricorn Moon</Text>
              </View>
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>91%</Text>
              </View>
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity activeOpacity={0.8} style={styles.circleBtn}>
                <CloseIcon color="#6E6782" size={16} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onNavigate('ShareMatchCard')} activeOpacity={0.8} style={styles.circleBtnLogo}>
                <Image source={require('../../assets/logo.png')} style={styles.innerLogo} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={[styles.circleBtn, styles.heartBtn]}>
                <HeartIcon color="#FFFFFF" size={16} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Analysis Categories Grid */}
          <Text style={styles.sectionHeader}>Compatibility Analysis</Text>
          <View style={styles.gridRow}>
            <View style={styles.gridCard}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconTxt}>🌀</Text>
              </View>
              <Text style={styles.gridTitle}>Synastry Calculations</Text>
              <Text style={styles.gridSub}>24 Factors</Text>
            </View>

            <View style={styles.gridCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#FDF2F8' }]}>
                <Text style={[styles.iconTxt, { color: '#DB2F7E' }]}>🌸</Text>
              </View>
              <Text style={styles.gridTitle}>Natal Alignment Details</Text>
              <Text style={styles.gridSub}>16 Factors</Text>
            </View>
          </View>

          {/* Upgrade Banner */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onNavigate('PremiumUpgrade')}
            style={styles.upgradeBanner}
          >
            <View style={styles.bannerPinkCircle} />
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>⚡</Text>
            </View>
            <Text style={styles.upgradeTitle}>Celestial Master</Text>
            <Text style={styles.upgradeSub}>
              Deepen relationships with fully analyzed premium charts.
            </Text>
            <View style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const { width } = Dimensions.get('window');

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
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 22,
    color: '#1F1936',
    fontWeight: '700',
    letterSpacing: 1.5,
    fontFamily: 'System',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6E6782',
    fontFamily: 'System',
    marginTop: 6,
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FAF8FC',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    height: 36,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#79247E', // Simulating active gradient tab
  },
  tabText: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '500',
    fontFamily: 'System',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  cardMeta: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  cardZodiac: {
    fontSize: 12,
    color: '#6E6782',
    marginTop: 2,
  },
  cardRising: {
    fontSize: 11,
    color: '#8E8E9F',
    marginTop: 1,
  },
  matchBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
  },
  matchBadgeText: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '700',
  },
  cardButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBtnSec: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardBtnTextSec: {
    color: '#1F1936',
    fontSize: 13,
    fontWeight: '600',
  },
  cardBtnPri: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#79247E', // Simulating active gradient button
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtnTextPri: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 16,
    color: '#1F1936',
    fontWeight: '700',
    marginBottom: 14,
    fontFamily: 'System',
  },
  analysisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  analysisItem: {
    flex: 1,
    alignItems: 'center',
  },
  circleProgress: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#1F1936',
    fontWeight: '700',
  },
  progressLabel: {
    fontSize: 10,
    color: '#8E8E9F',
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 8,
    lineHeight: 14,
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  insightLabel: {
    fontSize: 11,
    color: '#8E8E9F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  insightText: {
    fontSize: 13,
    color: '#1F1936',
    lineHeight: 20,
    fontFamily: 'System',
    marginBottom: 16,
  },
  subTabsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#FAF8FC',
    paddingTop: 12,
  },
  subTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  subTabActive: {
    borderBottomWidth: 1.5,
    borderColor: '#79247E',
    paddingBottom: 4,
  },
  subTabText: {
    fontSize: 12,
    color: '#8E8E9F',
    fontWeight: '600',
  },
  subTabTextActive: {
    color: '#79247E',
  },
  matchCardCarousel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#FAF8FC',
    paddingTop: 12,
    marginTop: 8,
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBtnLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FAF8FC',
    borderWidth: 1,
    borderColor: '#ECE8F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLogo: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  heartBtn: {
    backgroundColor: '#EC4899',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'flex-start',
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconTxt: {
    fontSize: 16,
    color: '#6366F1',
  },
  gridTitle: {
    fontSize: 13,
    color: '#1F1936',
    fontWeight: '700',
    lineHeight: 18,
    fontFamily: 'System',
  },
  gridSub: {
    fontSize: 11,
    color: '#8E8E9F',
    fontWeight: '500',
    marginTop: 4,
  },
  upgradeBanner: {
    height: 140,
    borderRadius: 24,
    backgroundColor: '#EAE5F5',
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    shadowColor: '#7E22CE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  bannerPinkCircle: {
    position: 'absolute',
    right: -25,
    top: -25,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FBCFE8',
    opacity: 0.5,
  },
  bannerBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerBadgeText: {
    fontSize: 12,
    color: '#D97706',
  },
  upgradeTitle: {
    fontSize: 16,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  upgradeSub: {
    fontSize: 12,
    color: '#6E6782',
    fontFamily: 'System',
    marginTop: 4,
    width: '70%',
    lineHeight: 16,
  },
  upgradeBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#79247E', // Simulating active gradient button
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 2,
  },
  upgradeBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
});
