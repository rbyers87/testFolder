import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

// Platform-specific imports for icons
let MapPin: any, Search: any, Info: any, Map: any;

if (Platform.OS === 'web') {
  // For web
  const lucide = require('lucide-react');
  MapPin = lucide.MapPin;
  Search = lucide.Search;
  Info = lucide.Info;
  Map = lucide.Map;
} else {
  // For React Native
  const lucideNative = require('lucide-react-native');
  MapPin = lucideNative.MapPin;
  Search = lucideNative.Search;
  Info = lucideNative.Info;
  Map = lucideNative.Map;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1e40af',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Current Location',
          tabBarIcon: ({ size, color }) => <MapPin size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search Address',
          tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map View',
          tabBarIcon: ({ size, color }) => <Map size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ size, color }) => <Info size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}