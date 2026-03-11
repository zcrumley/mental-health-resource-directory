import { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "../../../components/Screen";
import ResourceCard from "../../../components/ResourceCard";
import SearchBar from "../../../components/SearchBar";
import { theme } from "../../../src/styles/theme";
import {
    getResourcesByCategoryAndSubcategory,
    type Resource,
} from "../../../src/lib/api";

export default function SubcategoryScreen()
{
    const { category, subcategory } = useLocalSearchParams<{
        category?: string;
        subcategory?: string;
    }>();

    const categoryKey = String(category ?? "");
    const subcategoryKey = String(subcategory ?? "");

    const [resources, setResources] = useState<Resource[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() =>
    {
        if (!categoryKey || !subcategoryKey)
        {
            setError("Missing category or subcategory in route.");
            return;
        }

        setResources(null);
        setError(null);

        getResourcesByCategoryAndSubcategory(categoryKey, subcategoryKey)
            .then(setResources)
            .catch((e) => setError(String(e)));
    }, [categoryKey, subcategoryKey]);

    if (error)
    {
        return (
            <Screen>
                <Text style={styles.error}>{error}</Text>
            </Screen>
        );
    }

    if (!resources)
    {
        return (
            <Screen>
                <ActivityIndicator />
            </Screen>
        );
    }

    const filteredResources = resources.filter((r) =>
    {
        const q = query.trim().toLowerCase();

        if (!q)
        {
            return true;
        }

        return (
            r.name.toLowerCase().includes(q) ||
            r.description?.toLowerCase().includes(q) ||
            r.address?.toLowerCase().includes(q)
        );
    });

    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    {subcategoryKey.toUpperCase()}
                </Text>

                <SearchBar
                    value={query}
                    onChangeText={setQuery}
                    onClear={() => setQuery("")}
                    placeholder="Search this subcategory..."
                />

                {filteredResources.length === 0 ? (
                    <Text style={styles.empty}>No resources found for this search.</Text>
                ) : (
                    filteredResources.map((r) => (
                        <ResourceCard key={r.id} resource={r} />
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

    empty:
    {
        color: theme.colors.muted,
        fontSize: 14,
    },

    error:
    {
        color: theme.colors.danger,
        fontSize: 14,
    },
});
