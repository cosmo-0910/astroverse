import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface IconProps {
  color?: string;
  size?: number;
}

export const BackArrowIcon = ({ color = '#333333', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={[styles.line, { backgroundColor: color, width: size * 0.5, height: 2, top: 0 }]} />
    <View style={[styles.line, { backgroundColor: color, width: size * 0.35, height: 2, transform: [{ rotate: '-45deg' }], top: -size * 0.12, left: -size * 0.08 }]} />
    <View style={[styles.line, { backgroundColor: color, width: size * 0.35, height: 2, transform: [{ rotate: '45deg' }], top: size * 0.12, left: -size * 0.08 }]} />
  </View>
);

export const EyeIcon = ({ color = '#888888', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size, height: size * 0.6, borderWidth: 1.5, borderColor: color, borderRadius: size * 0.3, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, backgroundColor: color }} />
    </View>
  </View>
);

export const GoogleIcon = ({ size = 18 }: IconProps) => (
  <View style={{ width: size, height: size, backgroundColor: '#EA4335', borderRadius: size / 2, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: size * 0.6, lineHeight: size * 0.75 }}>G</Text>
  </View>
);

export const AppleIcon = ({ size = 18 }: IconProps) => (
  <View style={{ width: size, height: size, backgroundColor: '#000000', borderRadius: size / 2, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: size * 0.65, lineHeight: size * 0.75 }}></Text>
  </View>
);

export const EmailIcon = ({ color = '#333333', size = 18 }: IconProps) => (
  <View style={{ width: size, height: size * 0.7, borderWidth: 1.5, borderColor: color, borderRadius: 2, justifyContent: 'flex-start' }}>
    <View style={{ width: '70%', height: '50%', borderBottomWidth: 1.5, borderRightWidth: 1.5, transform: [{ rotate: '45deg' }], alignSelf: 'center', borderColor: color, top: -2 }} />
  </View>
);

export const CalendarIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={{ width: size, height: size, borderWidth: 1.5, borderColor: color, borderRadius: 3 }}>
    <View style={{ height: 3, width: '100%', backgroundColor: color }} />
  </View>
);

export const ClockIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size, borderWidth: 1.5, borderColor: color, borderRadius: size / 2 }]}>
    <View style={{ width: 1.5, height: size * 0.3, backgroundColor: color, position: 'absolute', top: size * 0.18 }} />
    <View style={{ width: size * 0.25, height: 1.5, backgroundColor: color, position: 'absolute', left: size * 0.45 }} />
  </View>
);

export const MapPinIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size * 1.2 }]}>
    <View style={{ width: size * 0.8, height: size * 0.8, borderRadius: (size * 0.8) / 2, borderWidth: 1.5, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.25, height: size * 0.25, borderRadius: (size * 0.25) / 2, backgroundColor: color }} />
    </View>
  </View>
);

// Tab Navigation Icons
export const TabHomeIcon = ({ color = '#8E8E9F', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1.5, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.7, height: 1.5, backgroundColor: color, transform: [{ rotate: '45deg' }], position: 'absolute' }} />
      <View style={{ width: size * 0.7, height: 1.5, backgroundColor: color, transform: [{ rotate: '-45deg' }], position: 'absolute' }} />
      <View style={{ width: size * 0.4, height: size * 0.4, borderRadius: size * 0.2, backgroundColor: '#FAF8FC', borderWidth: 1.5, borderColor: color, position: 'absolute' }} />
    </View>
  </View>
);

export const TabDiscoverIcon = ({ color = '#8E8E9F', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, borderWidth: 1.5, borderColor: color, position: 'absolute', top: 0, left: 0 }} />
    <View style={{ width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, borderWidth: 1.5, borderColor: color, position: 'absolute', bottom: 0, right: 0 }} />
    <View style={{ width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, borderWidth: 1.5, borderColor: color, position: 'absolute', top: size * 0.3, left: size * 0.3 }} />
    <View style={{ width: size * 0.7, height: 1, backgroundColor: color, transform: [{ rotate: '45deg' }], position: 'absolute' }} />
  </View>
);

export const TabChatIcon = ({ color = '#8E8E9F', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size, height: size * 0.8, borderRadius: 6, borderWidth: 1.5, borderColor: color }}>
      <View style={{ width: 4, height: 4, borderLeftWidth: 1.5, borderBottomWidth: 1.5, borderColor: color, transform: [{ rotate: '-45deg' }], position: 'absolute', bottom: -3, left: 4, backgroundColor: '#FAF8FC' }} />
    </View>
  </View>
);

export const TabForumsIcon = ({ color = '#8E8E9F', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.45, height: size * 0.45, borderRadius: size * 0.22, borderWidth: 1.5, borderColor: color, position: 'absolute', top: 0 }} />
    <View style={{ width: size * 0.45, height: size * 0.45, borderRadius: size * 0.22, borderWidth: 1.5, borderColor: color, position: 'absolute', bottom: 0, left: 0 }} />
    <View style={{ width: size * 0.45, height: size * 0.45, borderRadius: size * 0.22, borderWidth: 1.5, borderColor: color, position: 'absolute', bottom: 0, right: 0 }} />
  </View>
);

export const TabMessagesIcon = ({ color = '#8E8E9F', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size, height: size * 0.8, borderRadius: 6, borderWidth: 1.5, borderColor: color, justifyContent: 'center', paddingHorizontal: 2 }}>
      <View style={{ width: '80%', height: 1.5, backgroundColor: color, marginBottom: 2 }} />
      <View style={{ width: '60%', height: 1.5, backgroundColor: color }} />
      <View style={{ width: 4, height: 4, borderRightWidth: 1.5, borderBottomWidth: 1.5, borderColor: color, transform: [{ rotate: '45deg' }], position: 'absolute', bottom: -3, right: 4, backgroundColor: '#FAF8FC' }} />
    </View>
  </View>
);

// General UI Icons
export const HeartIcon = ({ color = '#FF2D55', size = 24 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size, fontWeight: 'bold', lineHeight: size * 1.1 }}>♥</Text>
  </View>
);

export const CloseIcon = ({ color = '#6E6782', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.8, height: 2, backgroundColor: color, transform: [{ rotate: '45deg' }], position: 'absolute' }} />
    <View style={{ width: size * 0.8, height: 2, backgroundColor: color, transform: [{ rotate: '-45deg' }], position: 'absolute' }} />
  </View>
);

export const UndoIcon = ({ color = '#FFFFFF', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.9, fontWeight: 'bold' }}>⟲</Text>
  </View>
);

export const SearchIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.65, height: size * 0.65, borderRadius: (size * 0.65) / 2, borderWidth: 1.5, borderColor: color, left: -2, top: -2 }} />
    <View style={{ width: size * 0.4, height: 1.5, backgroundColor: color, transform: [{ rotate: '45deg' }], position: 'absolute', bottom: 2, right: 2 }} />
  </View>
);

export const PlusIcon = ({ color = '#FFFFFF', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.8, height: 2, backgroundColor: color, position: 'absolute' }} />
    <View style={{ width: 2, height: size * 0.8, backgroundColor: color, position: 'absolute' }} />
  </View>
);

export const SendIcon = ({ color = '#FFFFFF', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.95, transform: [{ rotate: '45deg' }] }}>▲</Text>
  </View>
);

export const MicrophoneIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.4, height: size * 0.7, borderRadius: size * 0.2, borderWidth: 1.5, borderColor: color, position: 'absolute', top: 0 }} />
    <View style={{ width: size * 0.65, height: size * 0.4, borderBottomWidth: 1.5, borderLeftWidth: 1.5, borderRightWidth: 1.5, borderColor: color, borderBottomLeftRadius: size * 0.3, borderBottomRightRadius: size * 0.3, position: 'absolute', bottom: 2 }} />
    <View style={{ width: 1.5, height: size * 0.2, backgroundColor: color, position: 'absolute', bottom: 0 }} />
  </View>
);

export const ImageIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={{ width: size, height: size * 0.8, borderWidth: 1.5, borderColor: color, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: color, position: 'absolute', top: 2, left: 2 }} />
    <View style={{ width: size * 0.6, height: size * 0.3, borderTopWidth: 1.5, borderLeftWidth: 1.5, borderRightWidth: 1.5, borderColor: color, transform: [{ rotate: '45deg' }], position: 'absolute', bottom: -2 }} />
  </View>
);

export const VideoIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', width: size, height: size * 0.7 }}>
    <View style={{ width: size * 0.65, height: '100%', borderWidth: 1.5, borderColor: color, borderRadius: 3 }} />
    <View style={{ width: 0, height: 0, borderTopWidth: size * 0.25, borderBottomWidth: size * 0.25, borderLeftWidth: size * 0.3, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: color, marginLeft: 2 }} />
  </View>
);

export const PollIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={{ width: size, height: size, justifyContent: 'space-between', paddingVertical: 1 }}>
    <View style={{ width: '40%', height: 2, backgroundColor: color }} />
    <View style={{ width: '80%', height: 2, backgroundColor: color }} />
    <View style={{ width: '60%', height: 2, backgroundColor: color }} />
  </View>
);

export const LikeIcon = ({ color = '#8E8E9F', size = 16 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.9 }}>👍</Text>
  </View>
);

export const DislikeIcon = ({ color = '#8E8E9F', size = 16 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.9 }}>👎</Text>
  </View>
);

export const TrashIcon = ({ color = '#8E8E9F', size = 16 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.9 }}>🗑️</Text>
  </View>
);

export const HamburgerIcon = ({ color = '#1F1936', size = 20 }: IconProps) => (
  <View style={{ width: size, height: size * 0.8, justifyContent: 'space-between' }}>
    <View style={{ width: '100%', height: 2, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ width: '100%', height: 2, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ width: '100%', height: 2, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

export const ShareIcon = ({ color = '#8E8E9F', size = 16 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.85 }}>🔗</Text>
  </View>
);

export const HomeIcon = ({ color = '#1F1936', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size }}>🏠</Text>
  </View>
);

// New Screen Specific Icons
export const BellIcon = ({ color = '#1F1936', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size }}>🔔</Text>
  </View>
);

export const EditIcon = ({ color = '#1F1936', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size }}>✏️</Text>
  </View>
);

export const ChevronRightIcon = ({ color = '#8E8E9F', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size * 0.9, fontWeight: 'bold' }}>❯</Text>
  </View>
);

export const CheckCircleIcon = ({ color = '#10B981', size = 16 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size }}>✓</Text>
  </View>
);

export const SparklesIcon = ({ color = '#79247E', size = 18 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size }}>✨</Text>
  </View>
);

export const SupportIcon = ({ color = '#1F1936', size = 20 }: IconProps) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ color, fontSize: size }}>❓</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
  },
});
