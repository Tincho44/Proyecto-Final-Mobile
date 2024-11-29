import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useSegments, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/context/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const inAuthGroup = segments[0] === '(auth)';

  if (loading) {
    return null;
  }

  if (!user && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (user && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}