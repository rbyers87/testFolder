import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MapPin, RefreshCw, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LocationData } from '@/types/location';
import { JurisdictionService } from '@/services/jurisdictionService';
import { LocationCard } from '@/components/LocationCard';
import { JurisdictionCard } from '@/components/JurisdictionCard';
import { getCurrentLocation } from '@/services/locationService';
import type { LocationObject } from '@/services/locationService';

export default function CurrentLocationScreen() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      const jurisdictionData = await JurisdictionService.getJurisdictionByCoordinates(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      setLocationData(jurisdictionData);
    } catch {
      setError('Failed to get current location.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocation();
  }, []);

  return (
    <LinearGradient colors={['#1e40af', '#3b82f6']} style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Texas Law Enforcement</Text>
          <Text style={styles.subtitle}>Jurisdiction Finder</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <AlertTriangle size={20} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MapPin size={24} color="#1e40af" />
            <Text style={styles.cardTitle}>Current Location</Text>
            <TouchableOpacity onPress={loadLocation} style={styles.refreshButton} disabled={loading}>
              <RefreshCw size={20} color={loading ? "#9ca3af" : "#1e40af"} />
            </TouchableOpacity>
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1e40af" />
              <Text style={styles.loadingText}>Finding your jurisdiction...</Text>
            </View>
          )}

          {location && !loading && <LocationCard location={location} />}
          {locationData && !loading && <JurisdictionCard jurisdiction={locationData} />}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0f2fe',
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
    flex: 1,
  },
  refreshButton: {
    padding: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    color: '#6b7280',
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#dc2626',
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  instructionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  instructionText: {
    color: '#6b7280',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  emergencyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#dc2626',
  },
  emergencyText: {
    color: '#dc2626',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
