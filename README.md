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

## API used

[JSONPlaceholder - Users](https://jsonplaceholder.typicode.com/users)

Each user's `name` and `email` are shown in the list.

## How to run

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Scan the QR code with the **Expo Go** app on your phone, or press:
   - `a` to open it on an Android emulator
   - `i` to open it on an iOS simulator
   - `w` to open it in the web browser

## Screenshots

| Home | Profile | API List | Details |
|------|---------|----------|---------|
| ![Home](screenshots/home.png) | ![Profile](screenshots/profile.png) | ![API List](screenshots/api-list.png) | ![Details](screenshots/details.png) |

## Author

Daniel Sama Clemente