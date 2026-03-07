import { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getResourcesByCategory, type Resource } from "../../src/lib/api";
import ResourceCard from "../../components/ResourceCard";
import Screen from "../../components/Screen";
import SearchBar from "../../components/SearchBar";

// this screen shows list of resources after category was selected

export default function CategoryScreen()
{
    const { category } = useLocalSearchParams<{ category?: string }>();
    const categoryKey = String(category ?? "");

    const [resources, setResources] = useState<Resource[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() =>
    {
        if (!categoryKey)
        {
            setError("Missing category in route.");
            return;
        }

        setResources(null);
        setError(null);

        getResourcesByCategory(categoryKey)
            .then(setResources)
            .catch((e) => setError(String(e)));
    }, [categoryKey]);

    if (error)
    {
        return (
            <Screen>
                <Text style={{ color: "red" }}>{error}</Text>
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
            <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
                <Text style={{ fontSize: 50, fontWeight: "700", color: "#22C55E" }}>
                    {categoryKey.toUpperCase()}
                </Text>

                <SearchBar
                    value={query}
                    onChangeText={setQuery}
                    onClear={() => setQuery("")}
                    placeholder="Search this category..."
                />

                {filteredResources.length === 0 ? (
                    <Text>No resources found for this search.</Text>
                ) : (
                    filteredResources.map((r) => <ResourceCard key={r.id} resource={r} />)
                )}
            </ScrollView>
        </Screen>
    );
}