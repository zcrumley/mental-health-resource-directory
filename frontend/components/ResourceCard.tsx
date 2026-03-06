import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import type { Resource } from "../src/lib/api";
import { theme } from "../src/styles/theme";

type Props = { resource: Resource };

export default function ResourceCard({ resource }: Props)
{
    return (
        <Link
            href={{
                pathname: "/resources/[id]",
                params: { id: String(resource.id) }
            }}
            asChild
        >
            <Pressable style={styles.card}>
                <Text style={styles.title}>{resource.name}</Text>

                {resource.address ? (
                    <Text style={styles.sub}>{resource.address}</Text>
                ) : null}
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,

        borderWidth: 1,
        borderColor: theme.colors.border,

        marginBottom: theme.spacing.md,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2
    },
    title:
    {
        fontSize: 16,
        fontWeight: "800",
        color: "#E6E6E6"
    },
    sub:
    {
        marginTop: 6,
        color: theme.colors.muted
    }
    
});