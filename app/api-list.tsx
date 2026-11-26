import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import AppButton from '@/components/AppButton';

// URL of the public API (kept in a constant so it's easy to find and change)
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// The API returns more fields, but we only list the ones we use.
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: { city: string };    
  company: { name: string };    
};

export default function ApiListScreen() {
  
  const [users, setUsers] = useState<User[]>([]);          
  const [loading, setLoading] = useState(true);            
  const [refreshing, setRefreshing] = useState(false);     
  const [error, setError] = useState<string | null>(null); 
  const [search, setSearch] = useState('');                

  // FETCH the users from the API
  const fetchUsers = async () => {
    try {
      setError(null); // Clear any previous error before trying again

      // fetch() sends the request; "await" waits for the answer without freezing the app
      const response = await fetch(API_URL);

      // fetch() does NOT throw on HTTP errors like 404 or 500, so we check it ourselves
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // Convert the response body from JSON text into a JavaScript array
      const data: User[] = await response.json();
      setUsers(data);
    } catch (e) {
      // We get here if there's no internet, the server fails, or the JSON is invalid
      console.warn('Fetch failed', e);
      setError('Failed to load data');
    }
  };

  // First load: runs once when the screen opens
  useEffect(() => {
    const load = async () => {
      await fetchUsers();
      setLoading(false); // Hide the spinner when finished (success or error)
    };
    load();
  }, []);

  // BONUS: pull-to-refresh (called when the user drags the list down)
  const onRefresh = async () => {
    setRefreshing(true);   // Shows the small spinner at the top of the list
    await fetchUsers();
    setRefreshing(false);
  };

  // Called by the "Try Again" button on the error screen
  const retry = async () => {
    setLoading(true);
    await fetchUsers();
    setLoading(false);
  };

  
  const openDetails = (user: User) => {
    router.push({
      pathname: '/details',
      // Params travel through the route like a URL 
      // so all values must be STRINGS. That's why the id uses String().
      params: {
        id: String(user.id),
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        city: user.address.city,
        company: user.company.name,
      },
    });
  };

  // We create a filtered copy to show.
  // toLowerCase() makes the search case-insensitive ("leanne" finds "Leanne").
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  

  // LOADING STATE: only a spinner and a message
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Loading users...</Text>
      </View>
    );
  }

  // ERROR STATE: error message + buttons to retry or go back
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.errorButtons}>
          <AppButton title="Try Again" onPress={retry} />
          <AppButton title="Back Home" variant="secondary" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  // SUCCESS STATE: search box + list + back button
  return (
    <View style={styles.container}>
      {}
      <TextInput
        style={styles.search}
        placeholder="Search by name..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredUsers}                        
        keyExtractor={(item) => String(item.id)}    
        refreshing={refreshing}                     
        onRefresh={onRefresh}                       
        contentContainerStyle={styles.list}
        // Shown when the search matches nobody
        ListEmptyComponent={<Text style={styles.muted}>No users match "{search}"</Text>}
        // How to draw ONE row. "item" is one user from the array.
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openDetails(item)}   
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <AppButton title="Back Home" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

  // Centres content on the loading and error screens
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorButtons: { width: '100%' },

  // Search box at the top
  search: {
    margin: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  
  list: { padding: 16 },

 
  item: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  itemPressed: { backgroundColor: '#eff6ff' }, 

  name: { fontSize: 16, fontWeight: '600', color: '#111827' },
  email: { fontSize: 14, color: '#2563eb', marginTop: 4 },

  muted: { color: '#6b7280', marginTop: 10, textAlign: 'center' }, 
  error: { color: '#dc2626', fontSize: 18, fontWeight: '600' },   

  footer: { paddingHorizontal: 16, paddingBottom: 24 },
});