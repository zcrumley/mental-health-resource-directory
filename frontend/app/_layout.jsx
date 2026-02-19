import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#60ad52",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />

      <Stack.Screen
        name="Categories"
        options={{ headerShown: false }} /* ❗ hide root header here */
      />
      <Stack.Screen
        name="Resources/[id]"
        options={{ title: "Resource Details" }}
      />
    </Stack>
  );
};

export default RootLayout;
