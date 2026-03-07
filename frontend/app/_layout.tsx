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
                headerBackTitleVisible: false,
                headerTintColor: theme.colors.green,
            }}
        />
    );
}