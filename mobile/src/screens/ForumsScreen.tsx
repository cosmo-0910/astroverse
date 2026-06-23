import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import BottomTabNavigator, { TabType } from '../components/BottomTabNavigator';
import { ScreenType } from '../navigation/AppNavigator';
import { SearchIcon, ImageIcon, VideoIcon, PollIcon, ShareIcon, TabChatIcon, LikeIcon } from '../components/CustomIcons';

interface ForumsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTabChange: (tab: TabType) => void;
}

export default function ForumsScreen({ onNavigate, onTabChange }: ForumsScreenProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [postText, setPostText] = useState('');
  const [searchText, setSearchText] = useState('');

  const filters = ['All', 'Zodiac Signs', 'Relationships', 'Synastry', 'Spiritual'];

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
          <Text style={styles.headerTitle}>Forums</Text>
          <TouchableOpacity onPress={() => onNavigate('UserProfile')} activeOpacity={0.8}>
            <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Post Box */}
          <View style={styles.postBoxCard}>
            <TextInput
              placeholder="What is in your mind?"
              placeholderTextColor="#A0A0B0"
              value={postText}
              onChangeText={setPostText}
              style={styles.postInput}
              multiline
            />
            <View style={styles.postActionsRow}>
              <View style={styles.mediaIconGroup}>
                <TouchableOpacity style={styles.mediaBtn}>
                  <ImageIcon color="#8E8E9F" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaBtn}>
                  <VideoIcon color="#8E8E9F" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaBtn}>
                  <PollIcon color="#8E8E9F" size={18} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.postSubmitBtn}>
                <Text style={styles.postSubmitText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search bar */}
          <View style={styles.searchContainer}>
            <SearchIcon color="#8E8E9F" size={16} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#A0A0B0"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>

          {/* Filters Horizontal List */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {filters.map((filter, idx) => {
              const isActive = filter === activeFilter;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setActiveFilter(filter)}
                  activeOpacity={0.8}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Question of the Day */}
          <View style={styles.qotdCard}>
            <Text style={styles.qotdLabel}>Astra's Question of the Day</Text>
            <Text style={styles.qotdTitle}>
              "If your rising sign wrote your dating bio, what would the first line be?"
            </Text>
            <TouchableOpacity style={styles.answerBtn} activeOpacity={0.7}>
              <Text style={styles.answerBtnText}>Answer Now</Text>
              <Text style={styles.answerArrow}>↗</Text>
            </TouchableOpacity>
          </View>

          {/* Post Card 1 (with Image) */}
          <View style={styles.postCard}>
            <View style={styles.postAuthorRow}>
              <Image source={require('../../assets/avatar.png')} style={styles.authorAvatar} />
              <View style={styles.authorMeta}>
                <Text style={styles.authorName}>Mira K.</Text>
                <Text style={styles.authorDetails}>Aquarius • 2h</Text>
              </View>
              <View style={styles.retrogradeBadge}>
                <Text style={styles.retrogradeText}>Retrogrades</Text>
              </View>
            </View>
            <Text style={styles.postTitle}>Composite chart vs. synastry — which do you trust more?</Text>
            <Image source={require('../../assets/zodiac_wheel.png')} style={styles.postImage} resizeMode="cover" />
            
            {/* Post Interactions */}
            <View style={styles.postInteractions}>
              <TouchableOpacity style={styles.interactBtn}>
                <LikeIcon color="#8E8E9F" size={16} />
                <Text style={styles.interactText}>45</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactBtn}>
                <TabChatIcon color="#8E8E9F" size={16} />
                <Text style={styles.interactText}>45</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactBtn}>
                <ShareIcon color="#8E8E9F" size={16} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Post Card 2 (with Poll) */}
          <View style={styles.postCard}>
            <View style={styles.postAuthorRow}>
              <Image source={require('../../assets/avatar.png')} style={styles.authorAvatar} />
              <View style={styles.authorMeta}>
                <Text style={styles.authorName}>Mira K.</Text>
                <Text style={styles.authorDetails}>Aquarius • 2h</Text>
              </View>
              <View style={styles.retrogradeBadge}>
                <Text style={styles.retrogradeText}>Retrogrades</Text>
              </View>
            </View>
            <Text style={styles.postTitle}>Composite chart vs. synastry — which do you trust more?</Text>
            <Text style={styles.postBody}>
              Curious how the community weighs these for long-term partnerships. My Astra reading leaned hard into composite.
            </Text>

            {/* Poll Elements */}
            <View style={styles.pollContainer}>
              <TouchableOpacity style={styles.pollOption} activeOpacity={0.8}>
                <View style={[styles.pollProgress, { width: '75%' }]} />
                <View style={styles.pollLabelRow}>
                  <Text style={styles.pollOptionText}>Yes</Text>
                  <Text style={styles.pollPercentage}>75%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pollOption} activeOpacity={0.8}>
                <View style={[styles.pollProgress, { width: '25%', backgroundColor: '#FFF1F2' }]} />
                <View style={styles.pollLabelRow}>
                  <Text style={styles.pollOptionText}>No</Text>
                  <Text style={styles.pollPercentage}>25%</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Post Interactions */}
            <View style={styles.postInteractions}>
              <TouchableOpacity style={styles.interactBtn}>
                <LikeIcon color="#8E8E9F" size={16} />
                <Text style={styles.interactText}>45</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactBtn}>
                <TabChatIcon color="#8E8E9F" size={16} />
                <Text style={styles.interactText}>45</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactBtn}>
                <ShareIcon color="#8E8E9F" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Floating Bottom Tab Bar */}
        <BottomTabNavigator activeTab="Forums" onTabChange={onTabChange} />
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
  headerTitle: {
    fontSize: 18,
    color: '#1F1936',
    fontWeight: '700',
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
    paddingBottom: 120, // tab spacer
  },
  postBoxCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  postInput: {
    fontSize: 14,
    color: '#1F1936',
    minHeight: 50,
    textAlignVertical: 'top',
    padding: 0,
    fontFamily: 'System',
  },
  postActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#FAF8FC',
    paddingTop: 12,
    marginTop: 8,
  },
  mediaIconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaBtn: {
    marginRight: 16,
  },
  postSubmitBtn: {
    backgroundColor: '#79247E', // Simulating gradient submit button
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  postSubmitText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F1936',
    marginLeft: 8,
    padding: 0,
  },
  filterScroll: {
    paddingBottom: 16,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
  },
  filterChipActive: {
    backgroundColor: '#79247E', // Simulating active gradient chip
    borderColor: '#79247E',
  },
  filterText: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '500',
    fontFamily: 'System',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  qotdCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#F472B6', // pink accent border
  },
  qotdLabel: {
    fontSize: 11,
    color: '#BE185D',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  qotdTitle: {
    fontSize: 16,
    color: '#1F1936',
    fontWeight: '700',
    lineHeight: 22,
    fontFamily: 'System',
    marginBottom: 14,
  },
  answerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF8FC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ECE8F2',
  },
  answerBtnText: {
    color: '#1F1936',
    fontSize: 13,
    fontWeight: '600',
  },
  answerArrow: {
    fontSize: 13,
    color: '#79247E',
    fontWeight: '700',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F092A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  postAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    color: '#1F1936',
    fontWeight: '700',
    fontFamily: 'System',
  },
  authorDetails: {
    fontSize: 12,
    color: '#8E8E9F',
    fontWeight: '400',
    marginTop: 2,
  },
  retrogradeBadge: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  retrogradeText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'System',
  },
  postTitle: {
    fontSize: 16,
    color: '#1F1936',
    fontWeight: '700',
    lineHeight: 22,
    fontFamily: 'System',
    marginBottom: 10,
  },
  postBody: {
    fontSize: 13,
    color: '#6E6782',
    lineHeight: 18,
    fontFamily: 'System',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  pollContainer: {
    marginBottom: 12,
  },
  pollOption: {
    backgroundColor: '#FAF8FC',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ECE8F2',
    overflow: 'hidden',
  },
  pollProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FEF3C7', // golden yellow fill
  },
  pollLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  pollOptionText: {
    fontSize: 13,
    color: '#1F1936',
    fontWeight: '600',
    fontFamily: 'System',
  },
  pollPercentage: {
    fontSize: 13,
    color: '#1F1936',
    fontWeight: '600',
    fontFamily: 'System',
  },
  postInteractions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#FAF8FC',
    paddingTop: 12,
  },
  interactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  interactText: {
    color: '#8E8E9F',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
});
