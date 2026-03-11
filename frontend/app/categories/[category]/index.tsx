import { Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Screen from "../../../components/Screen";
import { theme } from "../../../src/styles/theme";
import { subcategoryMap } from "../../../src/constants/subcategories";

export default function CategoryScreen()
{
    const { category } = useLocalSearchParams<{ category?: string }>();
    const categoryKey = String(category ?? "");

    const subcategories = subcategoryMap[categoryKey] ?? [];

    if (!categoryKey)
    {
        return (
            <Screen>
                <Text style={styles.error}>Missing category in route.</Text>
            </Screen>
        );
    }

    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    {categoryKey.toUpperCase()}
                </Text>

                {subcategories.length === 0 ? (
                    <Text style={styles.error}>No subcategories found.</Text>
                ) : (
                    subcategories.map((sub) => (
                        <Link
                            key={sub.key}
                            href={`/categories/${categoryKey}/${sub.key}`}
                            asChild
                        >
                            <Pressable style={styles.card}>
                                <Text style={styles.cardLabel}>{sub.label}</Text>
                                <Text style={styles.cardHint}>Tap to Browse</Text>
                            </Pressable>
                        </Link>
                    ))
                )}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:
    {
        padding: 16,
        gap: 12,
    },

    title:
    {
        fontSize: 36,
        fontWeight: "700",
        color: theme.colors.green,
    },

    card:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: 14,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 12,
    },

    cardLabel:
    {
        fontSize: 24,
        fontWeight: "600",
        color: theme.colors.green,
    },

    cardHint:
    {
        marginTop: 4,
        color: theme.colors.muted,
        fontSize: 14,
    },

    error:
    {
        color: theme.colors.danger,
        fontSize: 14,
    },
});
