import { useColorScheme, StyleSheet } from "react-native";
import { Slot, Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import { UserProvider } from "./(app)/context/useContext";
import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(app)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <NativeBaseProvider>
        <PaperProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <ThemeProvider
              value={colorScheme === "light" ? DefaultTheme : DarkTheme}
            >
              <Slot />
            </ThemeProvider>
          </ApplicationProvider>
        </PaperProvider>
      </NativeBaseProvider>
    </UserProvider>
  );
}
