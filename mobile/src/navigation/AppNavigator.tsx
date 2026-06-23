import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EnterOTPScreen from '../screens/EnterOTPScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPasswordScreen';
import AlignUniverseScreen from '../screens/AlignUniverseScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import AIChatScreen from '../screens/AIChatScreen';
import ForumsScreen from '../screens/ForumsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import CompatibilityCenterScreen from '../screens/CompatibilityCenterScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PremiumUpgradeScreen from '../screens/PremiumUpgradeScreen';
import ShareMatchCardScreen from '../screens/ShareMatchCardScreen';
import { TabType } from '../components/BottomTabNavigator';

export type ScreenType =
  | 'Welcome'
  | 'SignIn'
  | 'SignUp'
  | 'ForgotPassword'
  | 'EnterOTP'
  | 'CreateNewPassword'
  | 'AlignUniverse'
  | 'Dashboard'
  | 'Discover'
  | 'AIChat'
  | 'Forums'
  | 'Messages'
  | 'ChatRoom'
  | 'CompatibilityCenter'
  | 'UserProfile'
  | 'Notifications'
  | 'PremiumUpgrade'
  | 'ShareMatchCard';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('Welcome');

  const navigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'Home') navigate('Dashboard');
    else if (tab === 'Discover') navigate('Discover');
    else if (tab === 'AIChat') navigate('AIChat');
    else if (tab === 'Forums') navigate('Forums');
    else if (tab === 'Messages') navigate('Messages');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Welcome' && (
        <WelcomeScreen onNavigate={navigate} />
      )}
      {currentScreen === 'SignIn' && (
        <SignInScreen onNavigate={navigate} />
      )}
      {currentScreen === 'SignUp' && (
        <SignUpScreen onNavigate={navigate} />
      )}
      {currentScreen === 'ForgotPassword' && (
        <ForgotPasswordScreen onNavigate={navigate} />
      )}
      {currentScreen === 'EnterOTP' && (
        <EnterOTPScreen onNavigate={navigate} />
      )}
      {currentScreen === 'CreateNewPassword' && (
        <CreateNewPasswordScreen onNavigate={navigate} />
      )}
      {currentScreen === 'AlignUniverse' && (
        <AlignUniverseScreen onNavigate={navigate} />
      )}
      {currentScreen === 'Dashboard' && (
        <DashboardScreen onNavigate={navigate} onTabChange={handleTabChange} />
      )}
      {currentScreen === 'Discover' && (
        <DiscoverScreen onNavigate={navigate} onTabChange={handleTabChange} />
      )}
      {currentScreen === 'AIChat' && (
        <AIChatScreen onNavigate={navigate} onTabChange={handleTabChange} />
      )}
      {currentScreen === 'Forums' && (
        <ForumsScreen onNavigate={navigate} onTabChange={handleTabChange} />
      )}
      {currentScreen === 'Messages' && (
        <MessagesScreen onNavigate={navigate} onTabChange={handleTabChange} />
      )}
      {currentScreen === 'ChatRoom' && (
        <ChatRoomScreen onNavigate={navigate} />
      )}
      {currentScreen === 'CompatibilityCenter' && (
        <CompatibilityCenterScreen onNavigate={navigate} />
      )}
      {currentScreen === 'UserProfile' && (
        <UserProfileScreen onNavigate={navigate} onTabChange={handleTabChange} />
      )}
      {currentScreen === 'Notifications' && (
        <NotificationsScreen onNavigate={navigate} />
      )}
      {currentScreen === 'PremiumUpgrade' && (
        <PremiumUpgradeScreen onNavigate={navigate} />
      )}
      {currentScreen === 'ShareMatchCard' && (
        <ShareMatchCardScreen onNavigate={navigate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A051D',
  },
});
