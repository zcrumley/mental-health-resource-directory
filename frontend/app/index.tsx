import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import { theme } from "../src/styles/theme";


export default function Home()
{
    return (
        <Screen>
            <Text style={styles.title}>
                Community Resource Directory
            </Text>

            <Link href="/categories" asChild>
                <Pressable style={styles.cards}>
                    <Text style={styles.text}>  Browse Resources </Text>
                    <Text style={styles.catHint}>Tap to view</Text>
                </Pressable>
            </Link>

            <Link href="/phone-numbers" asChild>
                <Pressable style={styles.cards}>
                    <Text style={styles.text}> Emergency Phone Numbers </Text>
                    <Text style={styles.catHint}>Tap to view</Text>
                </Pressable>
            </Link>

        </Screen>
        
    )
} 

const styles = StyleSheet.create({
    title:
    {
        fontSize: 36,
        fontWeight: "800",
        color: theme.colors.green,
        padding: 14

    },

    cards:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: 14,
        borderWidth: 1,
        borderColor: theme.colors.border, 
        color: theme.colors.green,
        marginBottom: 16,
    },

    text:
    {
        fontSize: 26,
        fontWeight: "600",
        color: "#E6E6E6"
    },

    catHint:
    {
        marginTop: 4,
        color: theme.colors.muted,
        fontSize: 16, 
        paddingLeft: 18
    }
});