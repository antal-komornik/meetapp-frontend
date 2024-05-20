import { Stack } from "expo-router";

export default function AppEntry() {
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
