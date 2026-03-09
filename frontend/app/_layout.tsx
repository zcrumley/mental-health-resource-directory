import { Stack } from "expo-router";
import { theme } from "../src/styles/theme";

export default function RootLayout()
{
    return (
        <Stack
            screenOptions={{
                headerTitle: "",
                headerShadowVisible: false,
                headerTransparent: true,
                headerTintColor: theme.colors.green,
            }}
        />
    );
}