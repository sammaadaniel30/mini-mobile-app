import { Pressable, StyleSheet, Text } from 'react-native';

// "Props" describes what information the button receives from the screen that uses it
type Props = {
  title: string;                                   // Text shown on the button
  onPress: () => void;                             // Function to run when the button is tapped
  variant?: 'primary' | 'secondary' | 'danger';    // Colour style (optional, "?" means it can be left out)
};

export default function AppButton({ title, onPress, variant = 'primary' }: Props) {
  // If no variant is given, it defaults to 'primary' (blue)

  return (
    <Pressable
      onPress={onPress}
      // The style is a function so we can change the look while the button is pressed.
      style={({ pressed }) => [styles.button, styles[variant], pressed && styles.pressed]}
    >
      <Text
        // White text by default; dark text on the light grey 'secondary' button so it's readable
        style={[styles.text, variant === 'secondary' && styles.secondaryText]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

// All styles are defined once here with StyleSheet.create (better performance and cleaner code)
const styles = StyleSheet.create({
  // Base look shared by every button
  button: {
    paddingVertical: 12,     
    paddingHorizontal: 16,   
    borderRadius: 10,        
    alignItems: 'center',    
    marginTop: 10,           
  },

  // Colour variants
  primary: { backgroundColor: '#2563eb' },   // Blue: main actions (Save Profile, Try Again)
  secondary: { backgroundColor: '#e5e7eb' }, // Light grey: navigation (Open Profile, Back Home)
  danger: { backgroundColor: '#dc2626' },    // Red: destructive actions (Clear Profile)

  // Visual feedback: the button becomes slightly transparent while pressed
  pressed: { opacity: 0.7 },

  // Text styles
  text: { color: '#fff', fontSize: 16, fontWeight: '600' }, 
  secondaryText: { color: '#111827' },                     
});