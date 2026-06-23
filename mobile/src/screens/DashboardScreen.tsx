import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import BottomTabNavigator, { TabType } from '../components/BottomTabNavigator';
import { ScreenType } from '../navigation/AppNavigator';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTabChange: (tab: TabType) => void;
}

export default function DashboardScreen({ onNavigate, onTabChange }: DashboardScreenProps) {
  const planetaryPositions = [
    { name: 'Sun', sign: 'Pisces', deg: '23°' },
    { name: 'Moon', sign: 'Scorpio', deg: '11°' },
    { name: 'Mercury', sign: 'Aries', deg: '04°' },
    { name: 'Venus', sign: 'Aquarius', deg: '17°' },
    { name: 'Mars', sign: 'Capricorn', deg: '23°' },
    { name: 'Saturn', sign: 'Pisces', deg: '08°' },
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
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Good Morning, Lyra</Text>
            <Text style={styles.dateText}>Friday, Jun 5</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('UserProfile')} activeOpacity={0.8}>
            <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Moon Phase Circular Section */}
          <View style={styles.moonCard}>
            <View style={styles.moonRing}>
              <Text style={styles.moonSub}>Moon Phase</Text>
              <Text style={styles.moonTitle}>Waxing Gibbous</Text>
              <Text style={styles.moonDetail}><Text style={styles.boldText}>78%</Text> Illumination</Text>
            </View>
          </View>

          {/* Daily Horoscope Card */}
          <View style={styles.card}>
            <View style={styles.horoscopeHeader}>
              <Text style={styles.cardSectionTitle}>Daily Horoscope</Text>
              <Text style={styles.horoscopeTag}>PISCES SEASON</Text>
            </View>
            <Text style={styles.horoscopeQuote}>
              "Mars enters your tenth house — precision is your ally."
            </Text>
            <Text style={styles.horoscopeText}>
              Avoid the urge to rush the process of becoming. A conversation arrives near dusk that reframes a quiet ambition.
            </Text>
          </View>

          {/* Ask Astra Anything Banner */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onTabChange('AIChat')}
            style={styles.astraBanner}
          >
            <View style={styles.bannerBackground} />
            <View style={styles.bannerPinkCircle} />
            <View style={styles.bannerContent}>
              <View style={styles.bannerHeader}>
                <View style={styles.astraBadge}>
                  <Text style={styles.astraBadgeText}>✨</Text>
                </View>
                <View style={styles.arrowIcon}>
                  <Text style={styles.arrowIconText}>↗</Text>
                </View>
              </View>
              <Text style={styles.bannerTitle}>Ask Astra anything</Text>
              <Text style={styles.bannerSubtitle}>"How does Saturn affect my career?"</Text>
            </View>
          </TouchableOpacity>

          {/* Planetary Positions */}
          <Text style={styles.sectionHeader}>Planetary Positions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.planetaryScroll}>
            {planetaryPositions.map((planet, idx) => (
              <View key={idx} style={styles.planetCard}>
                <Text style={styles.planetLabel}>{planet.name}</Text>
                <Text style={styles.planetSign}>{planet.sign}</Text>
                <Text style={styles.planetDeg}>{planet.deg}</Text>
              </View>
            ))}
          </ScrollView>

          {/* For You Tonight Card */}
          <View style={[styles.card, styles.lastCard]}>
            <Text style={styles.cardSectionTitle}>For You Tonight</Text>
            <Text style={styles.forYouText}>
              Journal under the gibbous moon. Write what you wish to release before the full moon in three days.
            </Text>
          </View>
        </ScrollView>

        {/* Floating Bottom Tab Bar */}
        <BottomTabNavigator activeTab="Home" onTabChange={onTabChange} />
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
    paddingBottom: 15,
  },
  headerLogo: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7E22CE',
  },
  greetingContainer: {
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 16,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  dateText: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '500',
    marginTop: 2,
    fontFamily: 'System',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120, // space for floating bottom tab
  },
  moonCard: {
    alignItems: 'center',
    marginVertical: 15,
  },
  moonRing: {
    width: width * 0.72,
    height: width * 0.72,
    borderRadius: (width * 0.72) / 2,
    borderWidth: 12,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
    // Custom simulated coordinate marks
    borderStyle: 'solid',
  },
  moonSub: {
    fontSize: 12,
    color: '#8E8E9F',
    fontWeight: '500',
    fontFamily: 'System',
  },
  moonTitle: {
    fontSize: 22,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
    marginVertical: 6,
  },
  moonDetail: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '400',
    fontFamily: 'System',
  },
  boldText: {
    fontWeight: '700',
    color: '#1F1936',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  horoscopeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardSectionTitle: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  horoscopeTag: {
    fontSize: 11,
    color: '#6E6782',
    fontWeight: '700',
    letterSpacing: 1,
  },
  horoscopeQuote: {
    fontSize: 20,
    color: '#1F1936',
    fontWeight: '700',
    lineHeight: 26,
    fontFamily: 'System',
    marginBottom: 10,
  },
  horoscopeText: {
    fontSize: 14,
    color: '#6E6782',
    lineHeight: 20,
    fontFamily: 'System',
  },
  astraBanner: {
    height: 120,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#7E22CE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#EAE5F5', // Simulating light purple gradient base
  },
  bannerPinkCircle: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FBCFE8',
    opacity: 0.6,
  },
  bannerContent: {
    zIndex: 1,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  astraBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  astraBadgeText: {
    fontSize: 14,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  arrowIconText: {
    fontSize: 14,
    color: '#79247E',
    fontWeight: '700',
  },
  bannerTitle: {
    fontSize: 18,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#6E6782',
    fontFamily: 'System',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    color: '#1F1936',
    fontWeight: '700',
    marginBottom: 14,
    fontFamily: 'System',
  },
  planetaryScroll: {
    paddingBottom: 12,
  },
  planetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 96,
    padding: 16,
    marginRight: 10,
    alignItems: 'flex-start',
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  planetLabel: {
    fontSize: 11,
    color: '#8E8E9F',
    fontWeight: '500',
    fontFamily: 'System',
    marginBottom: 8,
  },
  planetSign: {
    fontSize: 15,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
    marginBottom: 4,
  },
  planetDeg: {
    fontSize: 12,
    color: '#8E8E9F',
    fontWeight: '400',
    fontFamily: 'System',
  },
  forYouText: {
    fontSize: 14,
    color: '#1F1936',
    lineHeight: 20,
    fontFamily: 'System',
    marginTop: 8,
  },
  lastCard: {
    marginBottom: 20,
  },
});
