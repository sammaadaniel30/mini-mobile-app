# Mini Mobile App

A small mobile app built with **React Native**, **Expo** and **Expo Router** for the semester task.

## Features

- **Home screen** (`app/(tabs)/index.tsx`): enter a name and a city, save them with AsyncStorage and see the saved profile.
- **Profile screen** (`app/profile.tsx`): loads the saved profile with `useEffect` and allows clearing it.
- **API List screen** (`app/api-list.tsx`): fetches users from a public API and shows them in a `FlatList`, with loading and error states.
- **Details screen** (`app/details.tsx`): shows the selected user using route parameters.

### Extras
- Search/filter users by name
- Pull-to-refresh on the list