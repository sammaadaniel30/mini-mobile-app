import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/AppButton';
import { STORAGE_KEYS } from '@/constants/storage';

export default function ProfileScreen() {

  // Values read from AsyncStorage (null = nothing saved)
  const [name, setName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  // Reading is asynchronous (takes a moment), so we show a spinner meanwhile.
  const [loading, setLoading] = useState(true);

  // useEffect with an empty array [] runs ONLY ONCE, when the screen first appears.
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Read both values using the SAME keys Home used to save them
        const storedName = await AsyncStorage.getItem(STORAGE_KEYS.name);
        const storedCity = await AsyncStorage.getItem(STORAGE_KEYS.city);

        // Save them in state so they are shown on screen
        setName(storedName);
        setCity(storedCity);
      } catch (e) {
        console.warn('Could not load profile', e);
      } finally {
        // "finally" runs whether it worked or failed, so the spinner always disappears
        setLoading(false);
      }
    };

    loadProfile();
  }, []); 

  
  const clearProfile = async () => {
    try {
      // multiRemove deletes several keys in one call
      await AsyncStorage.multiRemove([STORAGE_KEYS.name, STORAGE_KEYS.city]);

      // Also clear the state, so the screen updates immediately to "No profile saved"
      setName(null);
      setCity(null);
    } catch (e) {
      console.warn('Could not clear profile', e);
    }
  };

  // If the user presses "Back Home", we want to go back if possible, or go to "/" if not.
  const goHome = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };


  // While loading, show only a spinner in the centre of the screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // true if at least one value is saved
  const hasProfile = name !== null || city !== null;

  return (
    <View style={styles.container}>
        {}
      <View style={styles.card}>
        {hasProfile ? (
          <>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name ?? '-'}</Text>

            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{city ?? '-'}</Text>
          </>
        ) : (
          <Text style={styles.value}>No profile saved</Text>
        )}
      </View>

      {/* Red button because it deletes data */}
      <AppButton title="Clear Profile" variant="danger" onPress={clearProfile} />

      {/* Grey button for navigation */}
      <AppButton title="Back Home" variant="secondary" onPress={goHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fafb' },

  // Used for the loading spinner: centres it vertically and horizontally
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // White box with rounded corners and a light border
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },

  // Small grey uppercase title ("NAME", "CITY")
  label: { fontSize: 13, color: '#6b7280', textTransform: 'uppercase', marginTop: 8 },

  // Big bold value ("Daniel", "Madrid")
  value: { fontSize: 20, fontWeight: '600', color: '#111827' },
});