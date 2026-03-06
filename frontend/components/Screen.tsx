import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../src/styles/theme";


export default function Screen({ children }: { children: React.ReactNode })
{
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: theme.colors.bg,
        padding: theme.spacing.lg
    }
});