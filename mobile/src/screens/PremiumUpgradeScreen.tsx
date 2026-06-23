import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { BackArrowIcon, SupportIcon, CheckCircleIcon } from '../components/CustomIcons';
import { ScreenType } from '../navigation/AppNavigator';

interface PremiumUpgradeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function PremiumUpgradeScreen({ onNavigate }: PremiumUpgradeScreenProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const freeFeatures = [
    'charts alignment',
    'basic match',
    'limited readings',
    'advertisements',
    'basic forum access',
    'standard support',
  ];

  const proFeatures = [
    'detailed reports',
    'unlimited matching',
    'interactive chats',
    'daily readings',
    'advanced forums',
    'priority support',
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
          <TouchableOpacity onPress={() => onNavigate('CompatibilityCenter')} activeOpacity={0.7} style={styles.headerBtn}>
            <BackArrowIcon color="#1F1936" size={18} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.headerBtn}>
            <SupportIcon color="#1F1936" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Headline Title */}
          <Text style={styles.title}>ASTROVERSE PRO</Text>
          <Text style={styles.subtitle}>
            Unlock your full destiny and connect with alignments in a deeper structure.
          </Text>

          {/* Billing Period Toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              onPress={() => setBillingPeriod('monthly')}
              activeOpacity={0.8}
              style={[styles.toggleBtn, billingPeriod === 'monthly' && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, billingPeriod === 'monthly' && styles.toggleTextActive]}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBillingPeriod('yearly')}
              activeOpacity={0.8}
              style={[styles.toggleBtn, billingPeriod === 'yearly' && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, billingPeriod === 'yearly' && styles.toggleTextActive]}>Yearly</Text>
            </TouchableOpacity>
          </View>

          {/* Card 1: FREE Tier */}
          <View style={styles.tierCard}>
            <View style={styles.tierHeader}>
              <Text style={styles.priceText}>FREE</Text>
              <Text style={styles.tierSub}>Smart charts</Text>
            </View>
            
            {/* Features Checklist */}
            <View style={styles.featureList}>
              {freeFeatures.map((feat, idx) => (
                <View key={idx} style={styles.featureItem}>
                  <CheckCircleIcon color="#10B981" size={16} />
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.activeBtn} disabled>
              <Text style={styles.activeBtnText}>Active</Text>
            </TouchableOpacity>
          </View>

          {/* Card 2: PRO Tier */}
          <View style={[styles.tierCard, styles.proCard]}>
            <View style={styles.badgeRow}>
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>POPULAR</Text>
              </View>
              <View style={styles.chatBadge}>
                <Text style={styles.chatBadgeText}>Free chat</Text>
              </View>
            </View>

            <View style={styles.tierHeader}>
              <Text style={styles.priceText}>
                {billingPeriod === 'monthly' ? '$9' : '$79'}
                <Text style={styles.periodText}> / {billingPeriod === 'monthly' ? 'mo' : 'yr'}</Text>
              </Text>
              <Text style={styles.tierSub}>Celestial Efficacy</Text>
            </View>

            {/* Features Checklist */}
            <View style={styles.featureList}>
              {proFeatures.map((feat, idx) => (
                <View key={idx} style={styles.featureItem}>
                  <CheckCircleIcon color="#A855F7" size={16} />
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => onNavigate('Dashboard')}
              activeOpacity={0.8}
              style={styles.upgradeBtn}
            >
              {/* Simulated gradient button overlay */}
              <View style={styles.upgradeBtnBg} />
              <Text style={styles.upgradeBtnText}>Subscribe</Text>
            </TouchableOpacity>
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
  title: {
    fontSize: 22,
    color: '#1F1936',
    fontWeight: '700',
    letterSpacing: 1.5,
    fontFamily: 'System',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6782',
    fontFamily: 'System',
    marginTop: 6,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#FAF8FC',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    marginBottom: 24,
    width: 160,
    alignSelf: 'center',
  },
  toggleBtn: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#79247E', // Simulating gradient toggler active
  },
  toggleText: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '500',
    fontFamily: 'System',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ECE8F2',
  },
  proCard: {
    borderColor: '#C084FC',
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  popularBadge: {
    backgroundColor: '#FDE8E8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  popularText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
  },
  chatBadge: {
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#F3E8FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chatBadgeText: {
    color: '#A855F7',
    fontSize: 10,
    fontWeight: '700',
  },
  tierHeader: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  priceText: {
    fontSize: 28,
    color: '#1F1936',
    fontWeight: '800',
  },
  periodText: {
    fontSize: 14,
    color: '#8E8E9F',
    fontWeight: '400',
  },
  tierSub: {
    fontSize: 12,
    color: '#8E8E9F',
    fontWeight: '600',
    marginTop: 4,
  },
  featureList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 13,
    color: '#6E6782',
    marginLeft: 10,
    textTransform: 'capitalize',
    fontFamily: 'System',
  },
  activeBtn: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#ECE8F2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  activeBtnText: {
    color: '#8E8E9F',
    fontSize: 14,
    fontWeight: '600',
  },
  upgradeBtn: {
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  upgradeBtnBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#79247E', // Simulating active gradient button
  },
  upgradeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    zIndex: 1,
  },
});
