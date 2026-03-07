import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../src/styles/theme";

type Props = {
    title: string;
    subtitle?: string;
};

export default function Header({ title, subtitle }: Props)
{
    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap:
    {
        backgroundColor: theme.colors.green,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg
    },
    title:
    {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "800"
    },
    sub:
    {
        marginTop: 6,
        color: "rgba(255,255,255,0.85)",
        fontSize: 13
    }
});