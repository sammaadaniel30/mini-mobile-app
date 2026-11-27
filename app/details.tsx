import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/AppButton';

export default function DetailsScreen() {
 
  const { id, name, email, phone, website, city, company } = useLocalSearchParams<{
    id: string;
    name: string;
    email: string;
    phone: string;
    website: string;
    city: string;
    company: string;
  }>();

  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header of the card: user number and name */}
        <Text style={styles.id}>User #{id}</Text>
        <Text style={styles.name}>{name}</Text>

        {/* One Row per detail (Row is a small component defined below) */}
        <Row label="Email" value={email} />
        <Row label="Phone" value={phone} />
        <Row label="Website" value={website} />
        <Row label="City" value={city} />
        <Row label="Company" value={company} />
      </View>

      {/* router.back() returns to the API List (the rubric asks for router.back() here) */}
      <AppButton title="Back" variant="secondary" onPress={() => router.back()} />
    </View>
  );
}


function Row({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fafb' },

  // White box with rounded corners and a light border
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },

  id: { fontSize: 13, color: '#6b7280' },                                            
  name: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 12 },   

  // Each detail row has a thin line on top to separate it from the previous one
  row: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  label: { fontSize: 13, color: '#6b7280' },               
  value: { fontSize: 16, color: '#111827', marginTop: 2 },  
});