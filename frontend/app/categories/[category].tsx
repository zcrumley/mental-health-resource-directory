import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getResourcesByCategory, type Resource } from "../../src/lib/api";
import ResourceCard from "../../components/ResourceCard";
import Screen from "../../components/Screen";

// this screen shows list of resources after category was selected


export default function CategoryScreen()
{
    const { category } = useLocalSearchParams<{ category?: string }>();
    const categoryKey = String(category ?? "");

    const [resources, setResources] = useState<Resource[] | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    return (
    <Screen>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 50, fontWeight: "700", color: "#22C55E" }}>
                {categoryKey.toUpperCase()}
            </Text>

            {resources.length === 0 ? (
                <Text>No resources found for this category.</Text>
            ) : (
                resources.map((r) => <ResourceCard key={r.id} resource={r} />)
            )}
        </ScrollView>
    </Screen>
    );
}